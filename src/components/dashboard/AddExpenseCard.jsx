import { useState, useEffect } from 'react';
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
import { categoryService } from "../../services/CategoryService"
import { subscriptionService } from "../../services/SubscriptionService"

export default function AddExpenseCard({ onExpenseAdded }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [title, setTitle] = useState("");
    const [error, setError] = useState({});

    const [amount, setAmount] = useState('');
    const [nextPaymentDate, setNextPaymentDate] = useState('');
    const [interval, setInterval] = useState(1);

    // Get all categories
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (err) {
                console.error("Kunde inte hämta kategorier:", err);
            }
        };
        loadCategories();
    }, []);

    // Create new expense
    const handleAddExpense = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!selectedCategory) {
            newErrors.category = 'Välj en kategori';
        }
        if (!title.trim()) {
            newErrors.title = 'Ange ett namn på utgiften';
        }
        if (!amount || parseFloat(amount) <= 0) {
            newErrors.amount = 'Ange ett giltigt belopp över 0 kr';
        }
        if (!nextPaymentDate) {
            newErrors.nextPaymentDate = 'Välj nästa betalningsdatum';
        }

        if (Object.keys(newErrors).length > 0) {
            newErrors.general = 'Alla obligatoriska fält måste fyllas i.';
            setError(newErrors);
            return;
        }

        setError({});

        const payload = {
            amount: parseFloat(amount),
            nextPaymentDate: new Date(nextPaymentDate).toISOString(),
            interval: parseInt(interval, 10),
            categoryId: parseInt(selectedCategory, 10),
            title: title
        };

        try {
            await subscriptionService.create(payload);

            setSelectedCategory('');
            setAmount('');
            setNextPaymentDate('');
            setInterval(1);

            if (onExpenseAdded) {
                onExpenseAdded();
            }
        } catch (err) {
            console.error("Fel vid skapande av utgift:", err);
            setError({ general: "Kunde inte spara utgiften, försök igen senare." });
        }
    };


    return (
        <Card
            elevation={0}
            sx={{
                p: 4,
                width: '500px',
                borderRadius: 3,
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
                display: "flex",
                flexDirection: "column"
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
                    <InputLabel id="category-label">Kategorier</InputLabel>
                    <Select
                        labelId="category-label"
                        value={selectedCategory}
                        label="Kategori"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>

                {/* Field for name/description */}
                <TextField
                    fullWidth
                    required
                    size="small"
                    label="Namn på utgift "
                    placeholder="t.ex. Netflix, Viaplay"
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

                {/* Interval*/}
                <FormControl fullWidth size="small" required>
                    <InputLabel id="interval-label">Intervall</InputLabel>
                    <Select
                        labelId="interval-label"
                        value={interval}
                        label="Intervall"
                        onChange={(e) => setInterval(e.target.value)}
                    >
                        <MenuItem value={0}>Veckovis</MenuItem>
                        <MenuItem value={1}>Månadsvis</MenuItem>
                        <MenuItem value={2}>Årsvis</MenuItem>
                    </Select>
                </FormControl>

                {/* Date */}
                <TextField
                    fullWidth
                    required
                    size="small"
                    type="date"
                    label="Nästa betalningsdatum"
                    value={nextPaymentDate}
                    onChange={(e) => setNextPaymentDate(e.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true }
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