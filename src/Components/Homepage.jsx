import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, Card, Typography } from "@mui/material";
import axios from "axios";
import BaseUrl from "../util/BaseUrl";
import { jwtDecode } from "jwt-decode";

const Homepage = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const validateTokenAndFetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, redirecting to login.");
                    navigate("/");
                    return;
                }

                console.log("Stored Token:", token);

                // Validate token
                const validateResponse = await axios.post(
                    `${BaseUrl}/user/validate-token`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("Token validation response:", validateResponse.data);

                if (!validateResponse.data) {
                    throw new Error("Invalid Token");
                }

                // Decode token
                const username = jwtDecode(token).sub;
                console.log("Extracted Username:", username);

                // Fetch user ID
                const userResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log("User API Response:", userResponse.data);

                const userId = userResponse.data; // Make sure this is the actual user ID

                // Fetch expenses
                const expenseResponse = await axios.get(`${BaseUrl}/expenses/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    params: {
                        offset: 0,
                        pageSize: 5,
                        field: "date",
                    },
                });

                console.log("Expenses API Response:", expenseResponse.data);

                const fetchedExpenses = expenseResponse.data?.content;

                if (Array.isArray(fetchedExpenses)) {
                    setExpenses(
                        fetchedExpenses.map((expense) => ({
                            amount: expense.amount,
                            spentWhere: expense.spentWhere,
                            type: expense.type,
                            date: expense.date,
                        }))
                    );
                } else {
                    console.error("Fetched expenses is not an array:", fetchedExpenses);
                    setExpenses([]);
                }
            } catch (error) {
                console.error("Error during token validation or fetching expenses:", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        validateTokenAndFetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

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
                        height: "60%",
                    }}
                >
                    <Typography sx={{ ml: 3, mt: 1, fontSize: 20, fontFamily: "Inter" }}>
                        Recent Expenses
                    </Typography>
                    <hr style={{ width: "98%", alignSelf: "center" }} />
                    <Box sx={{ ml: 3, mt: 2 }}>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <Typography key={index} sx={{ fontSize: 16 }}>
                                    {expense.spentWhere} ({expense.type}): ${expense.amount} on{" "}
                                    {new Date(expense.date).toLocaleDateString()}
                                </Typography>
                            ))
                        ) : (
                            <Typography sx={{ fontSize: 16, fontStyle: "italic" }}>
                                No expenses found.
                            </Typography>
                        )}
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, backgroundColor: "#d32f2f" }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Card>
            </Box>
        </Container>
    );
};

export default Homepage;
