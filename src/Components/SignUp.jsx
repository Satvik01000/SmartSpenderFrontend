import { Box, Button, Card, Container, TextField, ThemeProvider, Typography } from "@mui/material";
import Logo from "../util/Logo.png";
import darkTheme from "../util/darkTheme";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BaseUrl from "../util/BaseUrl";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [salary, setSalary] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            const signUpResponse = await axios.post(`${BaseUrl}/user/sign-up`, {
                name,
                username,
                email,
                password,
                salary
            });

            if (signUpResponse.status === 201) {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        minHeight: "100vh",
                    }}
                >
                    <Card
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            p: 5,
                            width: "50vw",
                            maxWidth: "50vw",
                            borderRadius: 7,
                            backgroundColor: "black",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", alignSelf: "flex-start", mb: 3 }}>
                            <img src={Logo} alt="Logo" style={{ width: 90, height: 80, marginRight: 8 }} />
                            <Typography variant="h3" sx={{ mt: 2 }}>
                                Make an account and Spend Smart
                            </Typography>
                        </Box>
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="off"
                            id="name"
                            name="name"
                            label="Name"
                            autoFocus
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mt: 3 }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="username"
                            id="username"
                            name="username"
                            label="Username"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ mt: 3 }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="off"
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3, mt: 3 }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="off"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <TextField
                            variant="outlined"
                            required
                            autoComplete="off"
                            id="salary"
                            name="salary"
                            label="Salary or Pocket Money"
                            type="salary"
                            fullWidth
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#0187e6",
                                maxWidth: "70%",
                                width: "40vh",
                                borderRadius: 3,
                                color: "white",
                            }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Already have an account?{" "}
                            <Link to="/" style={{ color: "#0187e6" }}>Log In</Link>
                        </Typography>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
