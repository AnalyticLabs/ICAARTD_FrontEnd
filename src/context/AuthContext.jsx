import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../utils/appwrite';
import { ID } from 'appwrite';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // REGISTER
  // const register = async ({
  //   username,
  //   email,
  //   password,
  //   confirmPassword,
  //   role,
  // }) => {
  //   if (password !== confirmPassword) {
  //     throw { message: 'Passwords do not match!' };
  //   }

  //   try {
  //     // 1. Call your backend function instead of account.create
  //     const response = await fetch(import.meta.env.VITE_APPWRITE_BACKEND_URL, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         action: 'register',
  //         username,
  //         email,
  //         password,
  //         cpassword: confirmPassword,
  //         role,
  //       }),
  //     });

  //     const result = await response.json();

  //     if (!response.ok || !result.success) {
  //       throw { message: result.message || 'Registration failed' };
  //     }

  //     // 2. After successful backend registration, log the user in
  //     await account.createEmailPasswordSession(email, password);

  //     // 3. Fetch user & update state
  //     const currentUser = await account.get();
  //     setUser(currentUser);

  //     return currentUser;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  const register = async ({
    username,
    email,
    password,
    confirmPassword,
    role,
  }) => {
    if (password !== confirmPassword) {
      throw { message: 'Passwords do not match!' };
    }

    try {
      const response = await fetch(import.meta.env.VITE_APPWRITE_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          username,
          email,
          password,
          cpassword: confirmPassword,
          role,
        }),
      });

      // Only parse JSON if the response has content
      let result = {};
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        result = await response.json();
      }

      if (!response.ok || !result.success) {
        throw { message: result.message || 'Registration failed' };
      }

      // Login after successful backend registration
      await account.createEmailPasswordSession(email, password);

      const currentUser = await account.get();
      setUser(currentUser);

      return currentUser;
    } catch (err) {
      throw err;
    }
  };

  // LOGIN
  const login = async ({ email, password, role }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();

      const storedRole = currentUser.prefs?.role;
      if (storedRole !== role) {
        await account.deleteSession('current');
        throw { message: `You are registered as ${storedRole}, not ${role}` };
      }

      setUser(currentUser);
      return currentUser;
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (err) {
      toast.error('Logout failed!');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
