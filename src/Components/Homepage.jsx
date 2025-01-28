import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Box } from "@mui/material";
import axios from "axios";

const Homepage = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [expenses, setExpenses] = useState([]); // Store expenses data
  const [totalExpenses, setTotalExpenses] = useState(0); // Total number of expenses
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [error, setError] = useState(null); // To handle API errors

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/expenses/${userId}`, {
          params: { offset: 0, pageSize: 5, field: "amount" },
        });

        console.log("API Response:", response.data); // Debug: Log the response

        // Update state based on the API response
        setExpenses(response.data.content || []); // `content` contains the expense list
        setTotalExpenses(response.data.totalElements || 0); // Total number of expenses
        setTotalPages(response.data.totalPages || 0); // Total pages available
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        setError("Unable to fetch expenses. Please try again later.");
      }
    };

    fetchExpenses();
  }, [userId]); // Re-run if `userId` changes

  return (
      <Card sx={{ padding: 3, margin: 3 }}>
        <Typography variant="h4" gutterBottom>
          Expenses
        </Typography>

        {error ? (
            <Typography color="error">{error}</Typography>
        ) : expenses.length > 0 ? (
            <Box>
              {expenses.map((expense) => (
                  <Box key={expense.id} sx={{ marginBottom: 2 }}>
                    <Typography variant="body1">
                      <strong>Spent:</strong> {expense.spentWhere} | <strong>Amount:</strong> ₹{expense.amount}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Category:</strong> {expense.category.title} | <strong>Date:</strong>{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </Typography>
                  </Box>
              ))}
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Total Expenses: {totalExpenses} | Total Pages: {totalPages}
              </Typography>
            </Box>
        ) : (
            <Typography>No expenses found for this user.</Typography>
        )}
      </Card>
  );
};

export default Homepage;
