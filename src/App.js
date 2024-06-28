import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './common/Navbar';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import User from './user/User';
import UserAdd from './user/UserAdd';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <CustomNavbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<User />} />
        <Route path="/users/add" element={<UserAdd />} />

      </Routes>
    </Router>
  );
};

export default App;
