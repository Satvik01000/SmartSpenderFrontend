import React from "react";
import ReactDOM from "react-dom/client";
import SaveIcon from "@mui/icons-material/Save"; // Import SaveIcon
import { Box, Button, Card, Container, Typography } from "@mui/material";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Body from "./Components/Body"

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
    return (
        <Login/>
        // <SignUp/>
        // <Body/>
    );
};

rootElement.render(<AppLayout />);
