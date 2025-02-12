import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BaseUrl from "../../util/BaseUrl";
import DashboardLayout from "./DashboardLayout";
import ExpenseTable from "./ExpenseTable";
import LogoutButton from "./LogoutButton";
import "../../index.css";
import Heading from "./Heading";
import UserBalanceMostExpensiveGrid from "./UserBalanceMostExpensiveGrid/UserBalanceMostExpensiveGrid";

const Homepage = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

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
            <Heading />
            <UserBalanceMostExpensiveGrid/>
            <ExpenseTable expenses={expenses} />
            <LogoutButton />
        </DashboardLayout>
    );
};

export default Homepage;