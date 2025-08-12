import { create } from 'zustand';

export const AUTH_BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin-auth`;

const authStore = create((set) => ({
    isInstituteRegistered: "",
    isAuthenticated: true,
    isLoading: false,
    isCheckingAuth: false,
    institute: null,
    registerInstitute: async (data) => {
        try {
            const response = await fetch(`${AUTH_BACKEND_URL}/registerInstitute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            set({ isInstituteRegistered: result.message });

        } catch (error) {
            console.error('Error registering institute:', error);
        }
    },
    login: async (data) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${AUTH_BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify(data)
            });
            const result = await response.json();
            set({
                institute: result.institute,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error) {
            console.error('Error logging in', error);
            set({ isLoading: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, isLoading: true });
        try {
            const response = await fetch(`${AUTH_BACKEND_URL}/check-auth`, {
                method: 'GET',
                credentials: "include"
            });
            const result = await response.json();
            if (result?.message==='Authentication Successful') { 
                set({
                    institute: result.institute,
                    isAuthenticated: true,
                    isCheckingAuth: false,
                    isLoading: false
                });
            } else {
                set({
                    institute: null,
                    isAuthenticated: false,
                    isCheckingAuth: false,
                    isLoading: false
                });
            }
        } catch (error) {
            console.error('Error checking auth in', error);
            set({ isCheckingAuth: false, isLoading: false });
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${AUTH_BACKEND_URL}/logout`, {
                method: 'POST',
                credentials: "include"
            });
            set({ isAuthenticated: false, institute: null, isLoading: false, isCheckingAuth:false });
        } catch (error) {
            console.error('Error logging out', error.message);
            set({ isAuthenticated: false, institute: null, isLoading: false, isCheckingAuth:false });
        }
    }
}));

export default authStore;