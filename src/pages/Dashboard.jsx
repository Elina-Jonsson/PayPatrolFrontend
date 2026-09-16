import { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ExpenseChartCard from "../components/dashboard/ExpenseChartCard";
import AddExpenseCard from '../components/dashboard/AddExpenseCard';
import ExpenseSummaryCard from '../components/dashboard/ExpenseSummaryCard';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({});


    const fetchDashboardData = async () => {
        // method to get all data
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ bgcolor: "#576252" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
                    <Button color="inherit">Logga ut</Button>
                </Toolbar>
            </AppBar>

            {/* Layout for cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3, alignItems: 'center' }}>

                {/* Top row */}
                <ExpenseSummaryCard summary={summary} />

                {/* Mid row */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, justifyContent: 'center', width: '100%' }}>
                    <ExpenseChartCard expenses={expenses} />
                    <AddExpenseCard onExpenseAdded={fetchDashboardData} />
                </Box>

            </Box>
        </Box>
    );
}