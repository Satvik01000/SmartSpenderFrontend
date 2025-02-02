import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Card, Container, TextField, ThemeProvider, Typography } from "@mui/material";
import darkTheme from "../util/darkTheme";
import Logo from "../util/Logo.png";
import BaseUrl from "../util/BaseUrl";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(BaseUrl + "/user/login", {
                username,
                password,
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("token", data); // Store token
                navigate("/homepage"); // Redirect to homepage
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
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
                            variant="outlined"
                            required
                            autoComplete="username"
                            id="username"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                            fullWidth
                            sx={{ mb: 3, mt: 3, borderRadius: 3 }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="password"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#0187e6", maxWidth: "70%", width: "40vh", borderRadius: 3, color:"white" }}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2}}>
                            Don't have an account? <Link to="/sign-up" style={{ color: '#0187e6' }}>Sign Up</Link>
                        </Typography>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;