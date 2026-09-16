import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState("");

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        await authService.login(credentials);
        const userData = await authService.getCurrentUser();
        setUser(userData);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);