import { Card, Typography, List, ListItem, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ExpenseListCard({ expenses = [], onEdit, onDelete }) {

    // Sort expenses on category first  (a-ö), then title/name (a-ö)
    const sortedExpenses = [...expenses].sort((a, b) => {
        const categoryA = (a.categoryName || a.category || 'Övrigt').toLowerCase();
        const categoryB = (b.categoryName || b.category || 'Övrigt').toLowerCase();

        // Compare categorys in alphabetic order
        const categoryComparison = categoryA.localeCompare(categoryB, 'sv');
        if (categoryComparison !== 0) {
            return categoryComparison;
        }

        // If category name is the same, sort on serviceName (a-ö)
        const nameA = (a.title || a.serviceName || a.name || '').toLowerCase();
        const nameB = (b.title || b.serviceName || b.name || '').toLowerCase();
        return nameA.localeCompare(nameB, 'sv');
    });

    return (
        <Card
            elevation={0}
            sx={{
                p: 3,
                width: '100%',
                maxWidth: '1024px',
                borderRadius: 3,
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, color: '#2e2f2a', fontWeight: 'bold' }}>
                Alla utgifter
            </Typography>

            <List disablePadding sx={{ maxHeight: 320, overflowY: 'auto', pr: 1 }}>
                {sortedExpenses.length > 0 ? (
                    sortedExpenses.map((exp, index) => (
                        <Box key={exp.id || index}>
                            <ListItem
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    py: 1.5,
                                    px: 1
                                }}
                            >
                                {/* Left side: Name and Category */}
                                <ListItemText
                                    primary={exp.title || exp.serviceName || exp.name || 'Utgift'}
                                    secondary={exp.categoryName || exp.category || 'Övrigt'}
                                    primaryTypographyProps={{ fontWeight: 600, fontSize: '1.05rem' }}
                                />

                                {/* Rigth side: Price and delete/edit icons */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>
                                        {exp.amount || exp.price || exp.cost} kr
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            aria-label="edit"
                                            onClick={() => onEdit(exp)}
                                            sx={{ color: '#576252' }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            aria-label="delete"
                                            onClick={() => onDelete(exp)}
                                            sx={{ color: '#be4d25' }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                            {index < sortedExpenses.length - 1 && <Divider />}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                        Inga utgifter registrerade ännu.
                    </Typography>
                )}
            </List>
        </Card>
    );
}