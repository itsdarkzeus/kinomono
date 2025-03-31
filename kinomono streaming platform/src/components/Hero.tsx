import React, { useState, useEffect } from 'react';
import { Play, Info, Star, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="relative h-[90vh] w-full overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[40vmax] h-[40vmax] rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#E50914', '#141414', '#808080'][i % 3],
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="absolute inset-0"
        style={{
          scale,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <div className="relative h-full">
          <video
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-desert-landscape-aerial-view-4K-1216-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-netflix-black/20" />
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-32 px-4 md:px-[4%]">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-6"
          >
            <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
              Desert Storm
            </h1>
            <motion.div
              className="absolute -right-4 top-0 flex items-center gap-2 bg-netflix-red/10 px-4 py-2 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-5 h-5 text-netflix-red" fill="currentColor" />
              <span className="font-medium">4.8</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center gap-4 text-sm text-netflix-light">
              <span className="px-2 py-1 bg-netflix-red/10 rounded">2024</span>
              <span className="px-2 py-1 bg-netflix-red/10 rounded">2h 15m</span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            <p className="text-lg text-netflix-light leading-relaxed">
              In the unforgiving desert, a team of elite warriors must face not only the harsh environment
              but also their own demons as they embark on a mission that will test their limits.
            </p>

            <div className="flex items-center gap-4">
              <Link 
                to="/show/5" 
                className="group relative px-8 py-3 bg-white text-black rounded-lg font-medium overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Play className="mr-2 fill-black" size={24} />
                  Play
                </span>
                <motion.div
                  className="absolute inset-0 bg-netflix-red"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween" }}
                />
              </Link>
              <button className="group px-8 py-3 bg-white/20 rounded-lg font-medium backdrop-blur-sm border border-white/10 hover:bg-white/30 transition-colors">
                <span className="flex items-center">
                  <Info className="mr-2 group-hover:rotate-12 transition-transform" size={24} />
                  More Info
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Genre Pills */}
      <div className="absolute bottom-8 right-4 md:right-[4%] flex gap-2">
        {['Action', 'Drama', 'Thriller'].map((genre, index) => (
          <motion.button
            key={genre}
            className="relative px-4 py-2 rounded-full text-sm font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-netflix-red/20 to-white/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            />
            <span className="relative">{genre}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Hero;