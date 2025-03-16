import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

export const useTransactionStore = create((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    

    fetchTransactions: async () => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.get('/transactions/user');
            
            if (response.data.success) {
                set({ 
                    transactions: response.data.transactions,
                    isLoading: false 
                });
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error('Failed to load transactions');
            set({ 
                error: error.message, 
                isLoading: false,
                transactions: []
            });
        }
    },

    createTransaction: async (transactionData) => {
        try {
            const response = await axiosInstance.post('/transactions/create', transactionData);
            
            if (response.data.success) {
                toast.success('Transaction completed successfully');
                return response.data.transaction;
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error(error.response?.data?.message || 'Transaction failed');
            throw error;
        }
    }
}));