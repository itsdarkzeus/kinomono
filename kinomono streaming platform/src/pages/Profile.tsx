import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Settings, User, Clock, List, Bell, Shield, Monitor, Film } from 'lucide-react';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Dropdown from '../components/ui/Dropdown';

const Profile = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [autoplay, setAutoplay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [videoQuality, setVideoQuality] = useState('Auto');

  const languages = ['English', 'Spanish', 'French', 'Japanese', 'Korean'];
  const videoQualities = ['Auto', '4K', '1080p', '720p', '480p'];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-16">
          <div className="relative group">
            <img
              src={user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-netflix-red"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Film className="w-8 h-8 text-white" />
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{user?.email}</h1>
            <p className="text-netflix-gray text-lg">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Settings */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <User className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">Account</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-netflix-gray mb-2">Email</label>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm text-netflix-gray mb-2">Subscription Plan</label>
                <p className="text-lg">Premium</p>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSignOut}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Settings className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">Preferences</h2>
            </div>
            <div className="space-y-6">
              <Dropdown
                label="Language"
                options={languages}
                value={language}
                onChange={setLanguage}
              />
              <Dropdown
                label="Video Quality"
                options={videoQualities}
                value={videoQuality}
                onChange={setVideoQuality}
              />
              <Toggle
                checked={autoplay}
                onChange={setAutoplay}
                label="Autoplay next episode"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Bell className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-6">
              <Toggle
                checked={notifications}
                onChange={setNotifications}
                label="Email notifications"
              />
              <Toggle
                checked={notifications}
                onChange={setNotifications}
                label="Push notifications"
              />
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Shield className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">Privacy & Security</h2>
            </div>
            <div className="space-y-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                Two-Factor Authentication
              </Button>
            </div>
          </div>

          {/* Watch History */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Clock className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">Watch History</h2>
            </div>
            <div className="space-y-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate('/my-list')}
              >
                View Watch History
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                Clear Watch History
              </Button>
            </div>
          </div>

          {/* My Lists */}
          <div className="bg-netflix-dark rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <List className="text-netflix-red w-6 h-6" />
              <h2 className="text-2xl font-semibold">My Lists</h2>
            </div>
            <div className="space-y-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate('/my-list')}
              >
                View My List
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                Create New List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;