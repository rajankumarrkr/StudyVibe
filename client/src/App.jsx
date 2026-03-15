import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import Feed from './pages/Feed';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import Navbar from './components/Navbar';

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem('onboarded');
    if (isAuthenticated && !onboarded) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-surface text-white">
        {isAuthenticated && !showOnboarding && <Navbar />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <AuthPage type="login" /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <AuthPage type="register" /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            isAuthenticated 
              ? (showOnboarding ? <Navigate to="/onboarding" /> : <Feed />) 
              : <Navigate to="/login" />
          } />
          
          <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/upload" element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" />} />
          <Route path="/bookmarks" element={isAuthenticated ? <div className="p-10">Bookmarks Coming Soon</div> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <div className="p-10">Profile Coming Soon</div> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
