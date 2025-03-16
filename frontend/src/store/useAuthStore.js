import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  isError: false,
  userStocks:null,
  error: null,

  // Signup Function
  signup: async (data) => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.post('/auth/register', data);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, isLoading: false, isError: false });

    

      return user;
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'Signup failed. Please try again.';
      
      set({ isError: true, error: errorMessage, isLoading: false });

      toast.error(errorMessage);
      throw error;
    }
  },
  login: async (data) => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.post('/auth/login', data);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, isLoading: false, isError: false });

      toast.success(`Welcome back, ${user.fullName.firstName}! 🚀`);

      return user;
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'Login failed. Check your credentials.';

      set({ isError: true, error: errorMessage, isLoading: false });

      toast.error(errorMessage);
      throw error;
    }
  },

  // Logout Function
  logout: async () => {
    try {
      set({ isLoading: true });

      await axiosInstance.post('/auth/logout');  // Optional, depends on backend

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      set({ user: null, isLoading: false, isError: false });

      toast.success('Logged out successfully. See you soon! 👋');
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'Logout failed. Try again.';
      
      set({ isError: true, error: errorMessage, isLoading: false });

      toast.error(errorMessage);
      throw error;
    }
  },
  getUserStocks : async () => {
    try {
      set({ isLoading: true });
      
      const response = await axiosInstance.get('/stocks/get-user-stocks');
      const { data } = response;
      
      set({ userStocks: data, isLoading: false, isError: false });
      
      return data;
      
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'Failed to fetch user stocks.';
      
      set({ isError: true, error: errorMessage, isLoading: false });
      
    }
  }
}));
