import React, { useState } from "react";
import { Box, Button, Card, Container, TextField, ThemeProvider, Typography } from "@mui/material";
import darkTheme from "../util/darkTheme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Logo from "../util/Logo.png";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/user/login", { username, password });
            const token = response.data; // Backend returns plain JWT token

            if (token) {
                login(token); // Store token globally
                navigate(`/expenses/${username}`); // Redirect to expenses page
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            alert("Login failed! Check your credentials.");
            console.error("Login error:", error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minHeight: "100vh" }}>
                    <Card sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", p: 5, width: "50vw", maxWidth: "50vw", borderRadius: 7, backgroundColor: "black" }}>
                        <Box sx={{ display: "flex", alignItems: "center", alignSelf: "flex-start", mb: 3 }}>
                            <img src={Logo} alt="Logo" style={{ width: 70, height: 80, marginRight: 8 }} />
                            <Typography variant="h3" sx={{ mt: 3 }}>Login and Spend Smart</Typography>
                        </Box>
                        <TextField
                            variant="outlined" required autoComplete="username" id="username" name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus fullWidth sx={{ mb: 3, mt: 3, borderRadius: 3 }} />
                        <TextField variant="outlined" required autoComplete="password" id="password" name="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mb: 3 }} />
                        <Button variant="contained" sx={{ backgroundColor: "#0187e6", maxWidth: "70%", width: "40vh", borderRadius: 3 }} onClick={handleLogin}>
                            Sign In
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Don't have an account? <a href="./SignUp.jsx" style={{ color: '#0187e6' }}>Sign Up</a>
                        </Typography>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
