import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  isError: false,
  error: null,


  signup: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post('/auth/register', data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({
        isLoading: false,
        isError: false,
        user
      });
      toast.success('User registered successfully');

      return user;

    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
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
      set({
        isLoading: false,
        isError: false,
        user
      });
      toast.success('User logged in successfully');
      return user;
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || error.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true })
      const response = await axiosInstance.get('/auth/logout');
      const { user, token } = response.data;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({
        isLoading: false,
        isError: false,
        user: null
      })
      toast.success('User logged out successfully');
      return user;
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

}))