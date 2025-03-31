import React from 'react';
import { Github, Twitter } from 'lucide-react';
import Button from '../ui/Button';

const SocialLogin = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-black text-gray-400">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          size="lg"
          icon={<Github size={20} />}
          className="w-full bg-white/5 hover:bg-white/10 border-white/10"
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={<Twitter size={20} />}
          className="w-full bg-white/5 hover:bg-white/10 border-white/10"
        >
          Twitter
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;