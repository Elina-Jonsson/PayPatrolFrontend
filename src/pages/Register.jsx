import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/AuthService";
import "./Register.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();
    const [error, setError] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError({});
        let newError = {};

        // Basic validation errormassages
        if (!firstName.trim()) newError.firstName = "Förnamn krävs.";
        if (!lastName.trim()) newError.lastName = "Efternamn krävs.";
        if (!email.trim()) {
            newError.email = "E-post krävs.";
        } else if (!email.includes("@")) {
            newError.email = "Ange en giltig e-postadress.";
        }
        if (!password) newError.password = "Lösenord krävs.";

        // If validation errors occur
        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        try {
            await authService.register({ firstName, lastName, email, password });

            await login({ email, password });

            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError({ email: "E-postadressen är redan registrerad." });
            } else {
                setError({ general: "Kunde inte slutföra registreringen. Försök igen." });
            }
        }
    }

    return (
        <Box className="register-container">
            <Card elevation={0} sx={{
                p: 4,
                width: "350px",
                borderRadius: 3,
                background: 'transparent',
                backgroundImage: 'none',
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
            }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        width: '100%',
                        alignItems: "center"
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1, color: "#2e2f2a" }}>
                        Fyll i dina uppgifter
                    </Typography>

                    {error.general && (
                        <Typography color="error" variant="body2" align="center">
                            {error.general}
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        placeholder="Förnamn"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!error.firstName}
                        helperText={error.firstName}
                    />

                    <TextField
                        fullWidth
                        placeholder="Efternamn"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!error.lastName}
                        helperText={error.lastName}
                    />

                    <TextField
                        fullWidth
                        placeholder="Email@email.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error.email}
                        helperText={error.email}
                    />

                    <TextField
                        fullWidth
                        placeholder="Lösenord"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error.password}
                        helperText={error.password}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%', mt: 1 }}>
                        <Button
                            type="button"
                            onClick={() => navigate("/login")}
                            sx={{
                                color: "#576252",
                                bgcolor: "#c4c4c4",
                                flex: 1,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            Tillbaka
                        </Button>

                        <Button
                            type="submit"
                            sx={{
                                color: "#d2d2d2",
                                bgcolor: "#576252",
                                flex: 1,
                                textTransform: 'none',
                                fontSize: "1rem"
                            }}
                        >
                            Registrera
                        </Button>
                    </Box>

                </Box>
            </Card>
        </Box>
    );
}