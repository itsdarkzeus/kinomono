import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;