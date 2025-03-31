import React from 'react';
import { Info } from 'lucide-react';

const DemoCredentials = () => {
  return (
    <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Info size={16} className="text-netflix-red" />
        <div>
          <span className="font-medium text-white">Demo Account:</span>
          {" "}demo@kinomono.com / demo123
        </div>
      </div>
    </div>
  );
};

export default DemoCredentials;