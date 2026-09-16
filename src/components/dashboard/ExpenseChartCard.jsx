import { useState } from 'react';
import { PieChart } from '@mui/x-charts';
import { Card, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';

export default function ExpenseChartCard({ expenses = [] }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const CATEGORY_COLORS = {
        Streaming: '#2596be',
        Träning: '#bea925',
        Övrigt: '#be4d25',
        Data: '#145369',
    };

    // Group expenses per category for chart
    const categoryTotals = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        acc[category] = (acc[category] || 0) + Number(amount);
        return acc;
    }, {});

    // Convert to format that MUI chart demands
    const chartData = Object.keys(categoryTotals).map((catName, index) => ({
        id: index,
        value: categoryTotals[catName],
        label: catName,
        color: CATEGORY_COLORS[catName] || '#576252', // Fallback color
    }));

    // Filter expenes for choosen category (detail list)
    const filteredExpenses = selectedCategory
        ? expenses.filter((item) => item.category === selectedCategory)
        : [];

    // Manage click on pie chart
    const handleItemClick = (event, d) => {
        const clickedCategory = chartData[d.dataIndex]?.label;
        setSelectedCategory(clickedCategory);
    };

    return (
        <Card
            elevation={0}
            sx={{
                p: 3,
                width: '500px',
                borderRadius: 3,
                background: 'transparent',
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6" sx={{ mb: 1, color: '#2e2f2a' }}>
                Utgifter per kategori
            </Typography>

            {/* Pie chart */}
            {chartData.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: chartData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                        },
                    ]}
                    width={400}
                    height={200}
                    onItemClick={handleItemClick}
                />
            ) : (
                <Typography variant="body2" sx={{ my: 4, color: 'gray' }}>
                    Inga utgifter registrerade ännu.
                </Typography>
            )}

            {/* Detail view for category */}
            {selectedCategory && (
                <Box sx={{ width: '100%', mt: 2, pt: 2, borderTop: '1px dashed #ccc' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {selectedCategory}
                        </Typography>
                        <Button size="small" onClick={() => setSelectedCategory(null)}>
                            Visa alla
                        </Button>
                    </Box>

                    <List dense>
                        {filteredExpenses.map((exp, i) => (
                            <ListItem key={i} disablePadding>
                                <ListItemText primary={exp.title} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {exp.amount} kr
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Card>
    );
}