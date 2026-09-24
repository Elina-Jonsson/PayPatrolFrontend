import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from "../services/AuthService";

// Create context for sharing auth state globally
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verify user session on initial app load
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

    // Authenticate user and store user profile in state
    const login = async (credentials) => {
        await authService.login(credentials);
        const userData = await authService.getCurrentUser();
        setUser(userData);
    };

    // End session and clear local user state
    const logout = async () => {
        try {
            await authService.logout();
        } catch (err) {
            console.error("Logout failed on server:", err);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
};

// Custom hook to easily consume AuthContext in any component
export const useAuth = () => useContext(AuthContext);