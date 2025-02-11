import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BaseUrl from "../../util/BaseUrl";
import DashboardLayout from "./DashboardLayout";
import ExpenseTable from "./ExpenseTable";
import LogoutButton from "./LogoutButton";

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
                const userId = userResponse.data; // Ensure this is the actual user ID

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
                    setExpenses(fetchedExpenses);
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

    return (
        <DashboardLayout>
            <ExpenseTable expenses={expenses} />
            <LogoutButton />
        </DashboardLayout>
    );
};

export default Homepage;
