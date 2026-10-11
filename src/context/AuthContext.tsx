'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (name: string) => boolean;
  socialLogin: (provider: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bazardor_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const defaultUser: User = {
        name: 'mahadi xion',
        email: 'mahadixion0011@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mahadi'
      };
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.email === 'rezwan@bazardor.com') {
          setUser(defaultUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
        } else {
          setUser(parsed);
        }
      } else {
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error('Failed to load user state from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = (email: string, pass: string): boolean => {
    if (!email || !pass) {
      toast.error('ইমেইল এবং পাসওয়ার্ড প্রয়োজন');
      return false;
    }
    const nameFromEmail = email.split('@')[0];
    const newUser: User = {
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    saveUser(newUser);
    toast.success('সফলভাবে সাইন ইন করেছেন!');
    return true;
  };

  const signup = (name: string, email: string, pass: string): boolean => {
    if (!name || !email || !pass) {
      toast.error('সকল তথ্য প্রদান করুন');
      return false;
    }
    const newUser: User = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    saveUser(newUser);
    toast.success('রেজিস্ট্রেশন সফল হয়েছে!');
    return true;
  };

  const logout = () => {
    saveUser(null);
    toast.success('সাইন আউট করা হয়েছে');
  };

  const updateProfile = (name: string): boolean => {
    if (!name || !name.trim()) {
      toast.error('নাম ফাঁকা রাখা যাবে না');
      return false;
    }
    if (!user) {
      toast.error('আপনি সাইন ইন করেননি');
      return false;
    }
    const updatedUser: User = {
      ...user,
      name: name.trim()
    };
    saveUser(updatedUser);
    toast.success('প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!');
    return true;
  };

  const socialLogin = (provider: string) => {
    const socialUser: User = {
      name: `${provider} ইউজার`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`
    };
    saveUser(socialUser);
    toast.success(`${provider} দিয়ে সফলভাবে সাইন ইন করা হয়েছে!`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        socialLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
