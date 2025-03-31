import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Checkbox = ({ checked, onChange, label, className = '' }: CheckboxProps) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-5 h-5 border-2 rounded transition-colors ${
          checked 
            ? 'bg-netflix-red border-netflix-red' 
            : 'border-netflix-gray/40 hover:border-netflix-gray'
        }`}>
          <Check 
            className={`w-4 h-4 text-white transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              checked ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        </div>
      </div>
      {label && (
        <span className="ml-2 text-netflix-light">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;