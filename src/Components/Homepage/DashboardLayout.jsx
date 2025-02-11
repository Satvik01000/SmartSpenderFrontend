import React from "react";
import { Container, Box, Card } from "@mui/material";

const DashboardLayout = ({ children }) => {
    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "black",
                    width: "90%",
                    height: "90%",
                    marginLeft: "12%",
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                }}
            >
                <Card
                    raised
                    elevation={10}
                    variant="outlined"
                    sx={{
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        width: "95%",
                        mt: 5,
                        height: "70%",
                        overflow: "auto",
                        padding: 2,
                    }}
                >
                    {children}
                </Card>
            </Box>
        </Container>
    );
};

export default DashboardLayout;
