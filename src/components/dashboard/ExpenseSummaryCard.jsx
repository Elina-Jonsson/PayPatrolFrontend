import { Card, Box, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';

export default function ExpenseSummaryCard({ summary = {}, expenses = [] }) {
    const monthlyTotal = summary.totalMonthlyCost ?? summary.monthlyTotal ?? 0;
    const yearlyTotal = summary.totalYearlyCost ?? summary.yearlyTotal ?? 0;

    const nextExpense = expenses
        .filter(e => e.nextPaymentDate)
        .sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate))[0];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                width: '100%',
                maxWidth: '1024px',
                justifyContent: 'space-between',
            }}
        >
            {/* Monthly cost */}
            <Card
                elevation={0}
                sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(220, 220, 220, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#eef2ed',
                        color: '#576252',
                        p: 1.5,
                        borderRadius: 2,
                        display: 'flex',

                    }}
                >
                    <AccountBalanceWalletIcon fontSize="medium" />
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Totalt / Månad
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e2f2a' }}>
                        {monthlyTotal.toLocaleString('sv-SE')} kr
                    </Typography>
                </Box>
            </Card>

            {/* Yearly cost */}
            <Card
                elevation={0}
                sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(220, 220, 220, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#eef2ed',
                        color: '#576252',
                        p: 1.5,
                        borderRadius: 2,
                        display: 'flex',
                    }}
                >
                    <CalendarMonthIcon fontSize="medium" />
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Beräknat / År
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e2f2a' }}>
                        {yearlyTotal.toLocaleString('sv-SE')} kr
                    </Typography>
                </Box>
            </Card>

            {/* Next payment */}
            <Card
                elevation={0}
                sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(220, 220, 220, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#eef2ed',
                        color: '#576252',
                        p: 1.5,
                        borderRadius: 2,
                        display: 'flex',
                    }}
                >
                    <EventIcon fontSize="medium" />
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Nästa dragning {nextExpense ? `(${nextExpense.title || nextExpense.name})` : ''}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e2f2a' }}>
                        {nextExpense?.nextPaymentDate
                            ? new Date(nextExpense.nextPaymentDate).toLocaleDateString('sv-SE')
                            : 'Inga datum'}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}