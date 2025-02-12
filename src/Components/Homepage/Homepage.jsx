import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BaseUrl from "../../util/BaseUrl";
import DashboardLayout from "./DashboardLayout";
import ExpenseTable from "./ExpenseTable";
import "../../index.css";
import Heading from "./Heading";
import UserBalanceMostExpensiveGrid from "./UserBalanceMostExpensiveGrid/UserBalanceMostExpensiveGrid";
import SeeTransactions from "./SeeTransactions";
import AddExpense from "./AddExpense";
import { Box, Button } from "@mui/material";

const Homepage = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

    useEffect(() => {
        const validateTokenAndFetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }

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

                if (!validateResponse.data) {
                    throw new Error("Invalid Token");
                }

                const username = jwtDecode(token).sub;

                const userResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const userId = userResponse.data;

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

                const fetchedExpenses = expenseResponse.data?.content;
                if (Array.isArray(fetchedExpenses)) {
                    setExpenses(fetchedExpenses);
                } else {
                    setExpenses([]);
                }
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        validateTokenAndFetchData();
    }, [navigate]);

    return (
        <DashboardLayout>
            {showAllTransactions ? (
                <SeeTransactions />
            ) : (
                <>
                    <Heading />
                    <UserBalanceMostExpensiveGrid />
                    <ExpenseTable expenses={expenses} />
                </>
            )}
            <Box sx={{display:"flex", flexDirection:"row", alignContent:"center", justifyContent:"center"}}>
                <Button
                    variant="contained"
                    onClick={() => setShowAllTransactions((prev) => !prev)}
                    sx={{
                        mt: 3,
                        mr: 15,
                        ml:15,
                        display: "flex",
                        justifySelf: "flex-end",
                        borderRadius: 2,
                    }}
                >
                    {showAllTransactions ? "Show Recent Expenses" : "See All Transactions"}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setShowAddExpenseModal(true)}
                    sx={{
                        mt: 3,
                        mr: 15,
                        display: "flex",
                        justifySelf: "flex-end",
                        borderRadius: 2,
                    }}
                >
                    Add Expense
                </Button>
            </Box>
            <AddExpense open={showAddExpenseModal} setOpen={setShowAddExpenseModal} />
        </DashboardLayout>
    );
};

export default Homepage;