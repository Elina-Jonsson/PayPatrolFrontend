import { useState, useEffect } from 'react';
import { categoryService } from '../../services/CategoryService';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';

export default function EditExpenseDialog({ open, onClose, expense, onExpenseUpdated }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (err) {
                console.error("Kunde inte hämta kategorier:", err);
            }
        }

        if (open) {
            fetchCategories();
        }
    }, [open]);

    // Populate the form with current data when an expense is provided
    useEffect(() => {
        if (expense) {
            setTitle(expense.title || expense.serviceName || '');
            setAmount(expense.amount || '');
            setCategoryId(expense.categoryId || '');
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Build the updated object
        const updatedData = {
            id: expense.id,
            title,
            amount: Number(amount),
            categoryId
        };

        await onExpenseUpdated(updatedData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Redigera utgift</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Titel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Belopp (kr)"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        required
                    />

                    <TextField
                        select
                        label="Kategori"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        fullWidth
                        required
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>

                </DialogContent>
                <DialogActions sx={{ p: 2, justifyContent: 'center', gap: 5 }}>
                    <Button onClick={onClose} sx={{ color: "inherit", bgcolor: "#dadad9" }}>
                        Avbryt
                    </Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: '#576252' }}>
                        Spara
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}