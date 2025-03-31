import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import InputField from './InputField';
import SocialLogin from './SocialLogin';
import DemoCredentials from './DemoCredentials';
import { FormData, FormErrors } from './types';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const AuthForm = ({ isLogin, onSubmit, isLoading, errors, setErrors }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-black/80 p-8 md:p-16 rounded-lg backdrop-blur-lg border border-white/10">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      {isLogin && <DemoCredentials />}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {errors.general && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {errors.general}
          </div>
        )}

        <InputField
          icon={<Mail size={20} />}
          type="email"
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />

        <InputField
          icon={<Lock size={20} />}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <SocialLogin />
    </div>
  );
};

export default AuthForm;