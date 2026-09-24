import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function Login() {
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
            await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 400 || err.response.status === 409)) {
                setError({ general: "Felaktig e-post eller lösenord." });
            } else {
                setError({ general: "Kunde inte ansluta till servern. Försök igen." });
            }
        }

    }

    return (

        <Box className="login-container">
            <Card elevation={0} sx={{
                p: 4,
                width: "350px",
                borderRadius: 3,
                background: 'transparent',
                backgroundImage: 'none',
                boxShadow: '0px 10px 35px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 220, 220, 0.3)',
                alignItems: "center"

            }}>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        alignItems: "center"
                    }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                        Få bitarna på plats med <br /> <span style={{ color: "#576252 ", fontWeight: 700, paddingLeft: 60 }}>PayPatrol</span>
                    </Typography>

                    {error.general && (
                        <Typography color="error" variant="body2" align="center">
                            {error.general}
                        </Typography>
                    )}

                    <TextField sx={{ mb: 1 }}
                        variant="outlined"
                        placeholder="Email@email.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error.email}
                        helperText={error.email}
                    />
                    <TextField sx={{ mb: 1 }}
                        variant="outlined"
                        placeholder="Lösenord"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error.password}
                        helperText={error.password}
                    />

                    <Button
                        type="submit"
                        sx={{
                            color: "#d2d2d2",
                            bgcolor: "#576252",
                            width: "140px",
                            marginBottom: 0.5
                        }}>
                        Logga in
                    </Button>

                    <Typography variant="body2">
                        Har du inget konto? <br />
                        Registrera dig{" "}
                        <span
                            onClick={() => navigate("/register")}
                            style={{
                                fontWeight: 700,
                                color: "#576252",
                                cursor: "pointer",
                            }}
                        >
                            här
                        </span>
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}