import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function DeleteExpense({ open, onClose, expense, onConfirmDelete }) {
    const expenseTitle =
        expense?.title ||
        expense?.Title ||
        expense?.serviceName ||
        expense?.ServiceName ||
        expense?.name ||
        expense?.Name ||
        'denna utgift';

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Radera utgift</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Är du säker på att du vill radera <strong>{expenseTitle}</strong>? <br />
                    Åtgärden går inte att ångra.
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: 'center', gap: 5 }}>
                <Button onClick={onClose} sx={{ bgcolor: "#dadad9", color: "inherit" }}>
                    Avbryt
                </Button>
                <Button
                    onClick={() => onConfirmDelete(expense?.id || expense?.Id)}
                    variant="contained"
                    sx={{ bgcolor: '#be4d25', '&:hover': { bgcolor: '#a33f1d' } }}
                >
                    Radera
                </Button>
            </DialogActions>
        </Dialog>
    );
}