import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

const Slider = ({ min, max, value, onChange, label, className = '' }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-netflix-gray mb-1">{label}</label>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 bg-netflix-gray/30 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #E50914 0%, #E50914 ${percentage}%, rgba(128, 128, 128, 0.3) ${percentage}%, rgba(128, 128, 128, 0.3) 100%)`
          }}
        />
        <div 
          className="absolute w-4 h-4 bg-netflix-red rounded-full shadow-lg -mt-1.5 transform -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #E50914;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.15s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Slider;