import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Toggle = ({ checked, onChange, label, className = '' }: ToggleProps) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-10 h-6 rounded-full transition-colors ${
          checked ? 'bg-netflix-red' : 'bg-netflix-gray/30'
        }`}>
          <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`} />
        </div>
      </div>
      {label && (
        <span className="ml-2 text-netflix-light">{label}</span>
      )}
    </label>
  );
};

export default Toggle;