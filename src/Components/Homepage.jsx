import { Button, Container, Box, Card, Typography } from "@mui/material";
import darkTheme from "../util/darkTheme";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Homepage = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/"); // Redirect to login if not authenticated
        }
    }, [token, navigate]);

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
                    <Button onClick={logout} variant="contained" sx={{ mt: 3, backgroundColor: "#d32f2f" }}>
                        Logout
                    </Button>
                </Card>
            </Box>
        </Container>
    );
};

export default Homepage;
