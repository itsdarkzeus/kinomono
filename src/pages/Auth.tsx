import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/auth/AuthForm';
import { FormData, FormErrors } from '../components/auth/types';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = (data: FormData): boolean => {
    const newErrors: FormErrors = {};
    
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (data: FormData) => {
    if (!validateForm(data)) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
        navigate('/');
      } else {
        await signUp(data.email, data.password);
        navigate('/');
      }
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#141414]">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#141414]" />
      </div>

      {/* Header */}
      <header className="px-4 md:px-12 py-6">
        <h1 className="text-netflix-red text-4xl md:text-5xl font-bold">KINOMONO</h1>
      </header>

      {/* Auth Form */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-0">
        <div className="w-full max-w-md mx-auto">
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            errors={errors}
            setErrors={setErrors}
          />

          <p className="text-center mt-6 text-gray-400">
            {isLogin ? "New to Kinomono? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:text-netflix-red transition-colors"
            >
              {isLogin ? 'Sign up now' : 'Sign in now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;