import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const Heading = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
                textAlign: "center",
                marginTop: "20px",
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{
                    fontFamily: "'Diagond', sans-serif",
                    backgroundImage: "linear-gradient(90deg, #ff4e50, #fc9d9a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    padding: "10px",
                    letterSpacing: "2px",
                }}
            >
                Welcome back, {username}
            </Typography>
        </motion.div>
    );
};

export default Heading;
