import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css"
import { Box, AppBar, Toolbar, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpenseChartCard from "../components/dashboard/ExpenseChartCard";
import AddExpenseCard from '../components/dashboard/AddExpenseCard';
import ExpenseSummaryCard from '../components/dashboard/ExpenseSummaryCard';
import ExpenseListCard from '../components/dashboard/ExpenseListCard';
import { subscriptionService } from "../services/SubscriptionService"
import EditExpenseDialog from "../components/dashboard/EditExpense";
import DeleteExpenseDialog from '../components/dashboard/DeleteExpense';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedExpenseForDelete, setSelectedExpenseForDelete] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleOpenDeleteDialog = (expense) => {
        setSelectedExpenseForDelete(expense);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedExpenseForDelete(null);
        setIsDeleteDialogOpen(false);
    };

    const handleOpenEditDialog = (expense) => {
        setSelectedExpense(expense);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedExpense(null);
        setIsEditDialogOpen(false);
    };

    // Fetches all dashboard-related data concurrently (subscriptions and summary)
    const fetchDashboardData = async () => {
        try {
            // Run both API calls in parallel
            const [subscriptionData, summaryData] = await Promise.all([
                subscriptionService.getAll(),
                subscriptionService.getSummary()
            ]);

            setExpenses(subscriptionData);
            setSummary(summaryData);
        } catch (err) {
            console.error("Fel vid hämtning av dashboard data:", err);
            setError("Kunde inte hämta din översikt. Kontrollera din anslutning.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch initial data when the dashboard mounts
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Update expense
    const handleUpdateExpense = async (updatedData) => {
        try {
            await subscriptionService.update(updatedData.id, updatedData);

            await fetchDashboardData();
        } catch (err) {
            console.error("Kunde inte uppdatera utgiften:", err);
            setError("Kunde inte uppdatera utgiften. Försök igen.");
        }
    };

    // Delete expense
    const handleConfirmDelete = async (id) => {
        try {
            await subscriptionService.delete(id);
            handleCloseDeleteDialog();
            await fetchDashboardData();
        } catch (err) {
            console.error("Kunde inte radera utgiften:", err);
            setError("Kunde inte radera utgiften. Försök igen.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress sx={{ color: '#576252' }} />
            </Box>
        );
    }

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Fel vid utloggning:", err);
        } finally {
            navigate("/login")
        }
    }

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', }}>
            <AppBar position="static" sx={{ bgcolor: "#576252" }}>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        Välkommen {user?.firstName || 'Användare'}!
                    </Typography>

                    <Button
                        color="inherit"
                        onClick={handleLogOut}
                        startIcon={<LogoutIcon />}
                    >
                        Logga ut
                    </Button>

                </Toolbar>
            </AppBar>

            {/* Layout for cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3, alignItems: 'center' }}>

                {/* Top row */}
                <ExpenseSummaryCard
                    summary={summary}
                    expenses={expenses}
                />

                {/* Mid row */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center', width: '100%' }}>
                    <ExpenseChartCard
                        categoryCost={summary?.costsByCategory}
                        expenses={expenses}
                    />
                    <AddExpenseCard onExpenseAdded={fetchDashboardData} />
                </Box>

                {/* Last row */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', width: '100%' }}>
                    <ExpenseListCard
                        expenses={expenses}
                        onDelete={handleOpenDeleteDialog}
                        onEdit={handleOpenEditDialog}
                    />
                </Box>

                {/* Delete and Edit dialogs */}
                <EditExpenseDialog
                    open={isEditDialogOpen}
                    onClose={handleCloseEditDialog}
                    expense={selectedExpense}
                    onExpenseUpdated={handleUpdateExpense}
                />

                <DeleteExpenseDialog
                    open={isDeleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    expense={selectedExpenseForDelete}
                    onConfirmDelete={handleConfirmDelete}
                />

                {/* Pop-up for error message */}
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setError(null)} severity="error" variant="filled" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>

            </Box>
        </Box>
    );
}