import React, { useEffect, useState } from "react";
import { Box, List, ListItem, Avatar, Typography, Button } from "@mui/material";
import LogoutButton from "../Auth/LogoutButton";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";

const SideBar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("Name");

    useEffect(() => {
        const handleGetName = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const decodedToken = jwtDecode(token);
                const username = decodedToken.sub;

                const nameResponse = await axios.get(`${BaseUrl}/user/name/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setName(nameResponse.data);
            } catch (error) {
                console.error("Error fetching name:", error);
            }
        };

        handleGetName();
    }, []);

    return (
        <Box
            sx={{
                width: "20vw",
                height: "100vh",
                backgroundColor: "#1e1e1e",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 2,
            }}
        >
            <Avatar sx={{ width: 80, height: 80, bgcolor: "gray", mb: 2 }}>P</Avatar>
            <Typography variant="h6" sx={{ mb: 3 }}>
                {name}
            </Typography>
            <List sx={{ width: "100%" }}>
                <ListItem>
                    <Button variant="text" sx={{ width: "100%", height: 50, color: "#80CBC4", borderRadius: 4 }} onClick={() => navigate("/homepage")}>
                        Home
                    </Button>
                </ListItem>
                <ListItem>
                    <Button variant="text" sx={{ width: "100%", height: 50, color: "#80CBC4", borderRadius: 4 }} onClick={() => navigate("/homepage")}>
                        Monthly Analysis
                    </Button>
                </ListItem>
                <ListItem>
                    <Button variant="text" sx={{ width: "100%", height: 50, color: "#80CBC4", borderRadius: 4 }} onClick={() => navigate("/homepage")}>
                        Settings
                    </Button>
                </ListItem>
            </List>
            <Box sx={{ marginTop: "auto", width: "100%" }}>
                <ListItem>
                    <LogoutButton />
                </ListItem>
            </Box>
        </Box>
    );
};

export default SideBar;
