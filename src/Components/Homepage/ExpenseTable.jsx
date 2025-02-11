import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const ExpenseTable = ({ expenses }) => {
    return (
        <>
            <Typography sx={{ ml: 3, mt: 1, fontSize: 20, fontFamily: "Inter" }}>
                Recent Expenses
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: "#2e2e2e" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow" }}>Date</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow" }}>Type</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow" }}>Amount (₹)</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow" }}>Category</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow" }}>Where</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ color: "white" }}>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{expense.type}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{expense.amount}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{expense.category.title}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{expense.spentWhere}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ color: "white", textAlign: "center" }}>
                                    No expenses found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ExpenseTable;
