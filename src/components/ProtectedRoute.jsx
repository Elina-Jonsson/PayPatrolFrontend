import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress sx={{ color: '#576252' }} />
            </Box>
        );
    }

    // Not logged in, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in, render children component (dashboard)
    return children;
}