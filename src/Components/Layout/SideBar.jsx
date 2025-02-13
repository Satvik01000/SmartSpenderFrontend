import React from "react";
import {Box, List, ListItem, ListItemText, Avatar, Typography, Button} from "@mui/material";
import LogoutButton from "../Auth/LogoutButton";

const SideBar = () => {
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
                Name
            </Typography>
            <List sx={{ width: "100%" }}>
                <ListItem><Button variant="text" sx={{width:"100%", height:50}}> Home </Button></ListItem>
            </List>
            <Box sx={{ marginTop: "auto", width: "100%" }}>
                <ListItem>
                    <LogoutButton></LogoutButton>
                </ListItem>
            </Box>
        </Box>
    );
};

export default SideBar;
