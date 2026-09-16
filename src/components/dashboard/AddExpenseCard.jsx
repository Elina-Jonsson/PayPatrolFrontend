import { useState } from 'react';
import {
    Card,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    Button
} from '@mui/material';

export default function AddExpenseCard({ onExpenseAdded }) {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddExpense = (e) => {
        e.preventDefault();
        console.log({ category, title, amount });

        // Reset form fields after submit
        setCategory('');
        setTitle('');
        setAmount('');

        // Notify parent component to refresh data
        if (onExpenseAdded) {
            onExpenseAdded();
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                p: 4,
                width: '500px',
                borderRadius: 3,
                background: 'transparent',
                backgroundImage: 'none',
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, color: '#2e2f2a' }}>
                Lägg till en utgift
            </Typography>

            <Box
                component="form"
                onSubmit={handleAddExpense}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                {/* Dropdown for Category */}
                <FormControl fullWidth size="small">
                    <InputLabel id="category-label">Kategori</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        label="Kategori"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Streaming">Streaming</MenuItem>
                        <MenuItem value="Träning">Träning</MenuItem>
                        <MenuItem value="Övrigt">Övrigt</MenuItem>
                        <MenuItem value="Data">Data</MenuItem>
                    </Select>
                </FormControl>

                {/* Field for name/description */}
                <TextField
                    fullWidth
                    size="small"
                    label="Namn på utgift"
                    placeholder="t.ex. Netflix, Gymkort"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Field for amount */}
                <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Pris"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kr</InputAdornment>,
                    }}
                    sx={{
                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                        },
                        '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                        },
                    }}
                />

                <Button
                    type="submit"
                    sx={{
                        mt: 2,
                        alignSelf: 'center',
                        width: '300px',
                        color: '#d2d2d2',
                        bgcolor: '#576252',
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': { bgcolor: '#434c3f' },
                    }}
                >
                    Spara utgift
                </Button>
            </Box>
        </Card>
    );
}