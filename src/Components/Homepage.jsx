import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Card, Typography } from "@mui/material";
import darkTheme from "../util/darkTheme";

const Homepage = () => {
    const navigate = useNavigate();

    // Redirect to login if no token is found
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        navigate("/"); // Redirect to login
    };

    return (
        <Container theme={darkTheme} sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{
                backgroundColor: "black",
                width: "90%",
                height: "90%",
                marginLeft: "12%",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column"
            }}>
                <Card raised elevation={10} variant="outlined" sx={{ backgroundColor: "#1e1e1e", color: "white", width: "95%", mt: 5, height: "60%" }}>
                    <Typography sx={{ ml: 3, mt: 1, fontSize: 20, fontFamily: "Inter" }}>Recent Expenses</Typography>
                    <hr style={{ width: "98%", display: "flex", alignSelf: "center", justifySelf: "center" }}></hr>
                    <Button variant="contained" sx={{ mt: 3, backgroundColor: "#d32f2f" }} onClick={handleLogout}>
                        Logout
                    </Button>
                </Card>
            </Box>
        </Container>
    );
};

export default Homepage;
