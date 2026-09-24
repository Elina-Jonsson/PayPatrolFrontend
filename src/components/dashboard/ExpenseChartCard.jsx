import { useState } from 'react';
import { PieChart } from '@mui/x-charts';
import { Card, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';

export default function ExpenseChartCard({ categoryCost = [], expenses = [] }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const CATEGORY_COLORS = {
        streaming: '#2596be',
        träning: '#bea925',
        'mjukvara & verktyg': '#145369',
        musik: '#9c27b0',
        övrigt: '#be4d25',
    };

    // Check if there is chart data available
    const hasExpenses = Array.isArray(categoryCost) && categoryCost.length > 0;

    // Format raw backend summary into the shape required by MUI PieChart
    const chartData = hasExpenses
        ? categoryCost.map((item, index) => {
            // Normalize key string to match CATEGORY_COLORS dictionary
            const lookupKey = item.categoryName ? item.categoryName.trim().toLowerCase() : 'övrigt';
            return {
                id: index,
                value: item.monthlyCost,
                label: item.categoryName,
                color: CATEGORY_COLORS[lookupKey] || '#576252',
            };
        })
        : [];

    // Extract colors for the pie chart slices
    const chartColors = chartData.map((d) => d.color);

    const emptyChartData = [{ id: 0, value: 1, label: 'Inga utgifter', color: '#4a4a4a' }];

    // Filter expenses matching the currently selected categor
    const filteredExpenses = selectedCategory
        ? expenses.filter((exp) => {
            const cat = exp.categoryName || exp.category || exp.category?.name;
            return cat === selectedCategory;
        })
        : [];

    // Handle pie slice click to update category filter
    const handleItemClick = (event, d) => {
        if (!hasExpenses || d.dataIndex === undefined) return;
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
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h6" sx={{ mb: 0.5, color: '#2e2f2a' }}>
                Utgifter per kategori
            </Typography>

            <PieChart
                colors={hasExpenses ? chartColors : ['#4a4a4a']}
                series={[
                    {
                        data: hasExpenses ? chartData : emptyChartData,
                        highlightScope: hasExpenses ? { faded: 'global', highlighted: 'item' } : {},
                    },
                ]}
                width={400}
                height={200}
                onItemClick={hasExpenses ? handleItemClick : undefined}
            />

            {!hasExpenses && (
                <Typography variant="caption" sx={{ mt: 1, color: 'gray' }}>
                    Lägg till din första utgift för att se fördelningen
                </Typography>
            )}

            {/* Render detailed list when a category slice is selected */}
            {selectedCategory && (
                <Box sx={{ width: '100%', mt: 2, pt: 2, borderTop: '1px dashed #ccc' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {selectedCategory}
                        </Typography>
                        <Button size="small" onClick={() => setSelectedCategory(null)}>
                            Rensa filter
                        </Button>
                    </Box>

                    <List dense disablePadding>
                        {filteredExpenses.length > 0 ? (
                            filteredExpenses.map((exp, i) => (
                                <ListItem key={exp.id || i} disablePadding sx={{ py: 0.5 }}>
                                    <ListItemText primary={exp.serviceName || exp.title || exp.name || 'Utgift'} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {exp.amount || exp.price || exp.cost} kr
                                    </Typography>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Inga enskilda utgifter hittades för kategorin.
                            </Typography>
                        )}
                    </List>
                </Box>
            )}
        </Card>
    )
}