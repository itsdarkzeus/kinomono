import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shows from './pages/Shows';
import Anime from './pages/Anime';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import Search from './pages/Search';
import ShowDetails from './pages/ShowDetails';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PageTransition from './components/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();
  const { user, loading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={!user ? (
          <PageTransition>
            <Auth />
          </PageTransition>
        ) : <Navigate to="/" replace />} />
        
        {/* Protected Routes */}
        <Route element={user ? <Layout /> : <Navigate to="/auth" replace />}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/shows" element={
            <PageTransition>
              <Shows />
            </PageTransition>
          } />
          <Route path="/anime" element={
            <PageTransition>
              <Anime />
            </PageTransition>
          } />
          <Route path="/movies" element={
            <PageTransition>
              <Movies />
            </PageTransition>
          } />
          <Route path="/my-list" element={
            <PageTransition>
              <MyList />
            </PageTransition>
          } />
          <Route path="/search" element={
            <PageTransition>
              <Search />
            </PageTransition>
          } />
          <Route path="/show/:id" element={
            <PageTransition>
              <ShowDetails />
            </PageTransition>
          } />
          <Route path="/profile" element={
            <PageTransition>
              <Profile />
            </PageTransition>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;