import { Card, Box, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export default function ExpenseSummaryCard({ summary = {} }) {
    // Default value if backend data doesnt show
    const monthlyTotal = summary.monthlyTotal ?? 0;
    const yearlyTotal = summary.yearlyTotal ?? 0;
    const totalCount = summary.totalCount ?? 0;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
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

            {/* Expense summary */}
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
                    <FormatListNumberedIcon fontSize="medium" />
                </Box>
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Aktiva utgifter
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e2f2a' }}>
                        {totalCount} st
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}