"use client"

import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { authAPI, User } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: () => { },
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { user } = await authAPI.getProfile();
                setUser(user);
            } catch (err) {
                localStorage.removeItem('token');
                toast({
                    title: 'Session expired',
                    description: 'Please sign in again',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [toast]);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const { token, user } = await authAPI.signin(email, password);
            localStorage.setItem('token', token);
            setUser(user);
            toast({
                title: 'Welcome back!',
                description: 'You have successfully signed in',
            });
            router.push('/');
        } catch (err: any) {
            toast({
                title: 'Error',
                description: err.message || 'Failed to sign in',
                variant: 'destructive',
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            const { token, user } = await authAPI.signup(name, email, password);
            localStorage.setItem('token', token);
            setUser(user);
            toast({
                title: 'Account created!',
                description: 'You have successfully signed up',
            });
            router.push('/');
        } catch (err: any) {
            toast({
                title: 'Error',
                description: err.message || 'Failed to create account',
                variant: 'destructive',
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast({
            title: 'Signed out',
            description: 'You have been signed out successfully',
        });
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
