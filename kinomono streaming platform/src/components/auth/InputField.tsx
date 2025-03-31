import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  endIcon?: React.ReactNode;
}

const InputField = ({
  icon,
  type,
  name,
  label,
  value,
  onChange,
  error,
  endIcon
}: InputFieldProps) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`
            block w-full bg-zinc-800/50 rounded-lg px-10 pt-6 pb-2 
            text-white border border-white/10
            focus:outline-none focus:ring-2 focus:border-transparent
            ${error ? 'focus:ring-red-500' : 'focus:ring-netflix-red'}
            transition-all duration-200
            peer
          `}
          placeholder=" "
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
        <label className="absolute text-gray-400 text-sm left-10 top-4 transition-all duration-200 pointer-events-none
          peer-focus:-translate-y-3 peer-focus:scale-75
          peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75">
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;