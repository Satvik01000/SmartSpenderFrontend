import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import "../../index.css"

const ExpenseTable = ({ expenses }) => {
    return (
        <>
            <Typography sx={{ ml: 3, mt: 1, fontSize: 24, fontFamily: "Diagond" }}>
                Recent Expenses
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: "#2e2e2e" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow", fontFamily: "Diagond", fontSize:23 }}>Date</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow", fontFamily: "Diagond", fontSize:23 }}>Amount (₹)</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow", fontFamily: "Diagond", fontSize:23 }}>Category</TableCell>
                            <TableCell sx={{ color: "black", backgroundColor: "yellow", fontFamily: "Diagond", fontSize:23 }}>Where</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.length > 0 ? (
                            expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ fontSize:16, color: "white", fontFamily: "Diagond" }}>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                    <TableCell sx={{ fontSize:16, color: expense.type === "debited" ? "#ff5d5d" : "green", fontFamily: "Diagond" }}>{expense.amount}</TableCell>
                                    <TableCell sx={{ fontSize:16, color: "white", fontFamily: "Diagond" }}>{expense.category.title}</TableCell>
                                    <TableCell sx={{ fontSize:16, color: "white", fontFamily: "Diagond" }}>{expense.spentWhere}</TableCell>
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
