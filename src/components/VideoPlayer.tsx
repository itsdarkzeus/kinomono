import React, { useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Rewind, FastForward } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onProgress?: (progress: number) => void;
}

const VideoPlayer = ({ src, poster, onProgress }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const controlsTimeoutRef = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', timeUpdate);
    video.addEventListener('loadedmetadata', () => setDuration(video.duration));

    return () => {
      video.removeEventListener('timeupdate', timeUpdate);
    };
  }, [onProgress]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const seek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 3000);
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div 
      className="relative group bg-black rounded-lg overflow-hidden shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video cursor-pointer"
        poster={poster}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Center Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        playing && !showControls ? 'opacity-0' : 'opacity-100'
      }`}>
        <button 
          onClick={togglePlay}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all transform hover:scale-110"
        >
          {playing ? 
            <Pause className="w-10 h-10 text-white" /> : 
            <Play className="w-10 h-10 text-white ml-1" />
          }
        </button>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pt-20 pb-4 transition-all duration-300 ${
        showControls ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-full'
      }`}>
        {/* Progress Bar */}
        <div className="relative w-full h-1 mb-4 group/progress">
          <div className="absolute inset-0 bg-white/30 rounded-full">
            <div 
              className="h-full bg-netflix-red rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-netflix-red rounded-full scale-0 group-hover/progress:scale-100 transition-transform" />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:text-netflix-red transition">
              {playing ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={() => seek(-10)} className="text-white hover:text-netflix-red transition">
              <Rewind size={24} />
            </button>
            <button onClick={() => seek(10)} className="text-white hover:text-netflix-red transition">
              <FastForward size={24} />
            </button>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white hover:text-netflix-red transition">
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <div className="group/volume relative">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-20 transition-all opacity-0 group-hover/volume:opacity-100"
                />
              </div>
            </div>
          </div>

          {/* Center - Time */}
          <div className="flex-1 text-center">
            <span className="text-sm text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <button 
            onClick={toggleFullscreen}
            className="text-white hover:text-netflix-red transition"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      {/* Video Title Overlay */}
      <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <h2 className="text-white text-lg font-medium">Now Playing</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;