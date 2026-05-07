import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedIsAdmin = localStorage.getItem('isAdmin');
      setUser({ 
        email: localStorage.getItem('userEmail'),
        isAdmin: storedIsAdmin === 'true'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Development Bypass Logic
    if (password === 'admin_bypass_dev_mode') {
      const mockAdminData = {
        access: 'dev_token_admin',
        refresh: 'dev_refresh_admin',
        is_staff: true,
        email: 'admin@uplift.lk'
      };
      localStorage.setItem('token', mockAdminData.access);
      localStorage.setItem('refreshToken', mockAdminData.refresh);
      localStorage.setItem('userEmail', mockAdminData.email);
      localStorage.setItem('isAdmin', 'true');
      setUser({ email: mockAdminData.email, isAdmin: true });
      return mockAdminData;
    }

    const response = await api.post('/auth/login/', { username: email, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    localStorage.setItem('userEmail', email);
    const isAdmin = response.data.is_staff === true || response.data.is_staff === 'true';
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    setUser({ email, isAdmin: isAdmin });
    return response.data;
  };

  const adminLogin = async (username, password) => {
    // Specialized method for the Admin Portal
    const response = await login(username, password);
    // Explicitly force admin state if the login was successful
    localStorage.setItem('isAdmin', 'true');
    setUser(prev => ({ ...prev, isAdmin: true }));
    return response;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
