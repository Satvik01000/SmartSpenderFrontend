import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Autocomplete,
    ThemeProvider
} from "@mui/material";
import axios from "axios";
import BaseUrl from "../../util/BaseUrl";
import { jwtDecode } from "jwt-decode";
import darkTheme from "../../util/darkTheme"; // Import your dark theme

const AddExpense = ({ open, setOpen, updateBalance }) => {
    const [expenseData, setExpenseData] = useState({
        amount: "",
        spentWhere: "",
        category: "",
        description: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/category`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data) {
                    setCategories(response.data.map(cat => cat.title));
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmitClick = () => {
        setConfirmModal(true);
    };

    const handleConfirmExpense = async (selectedType) => {
        try {
            const token = localStorage.getItem("token");
            const username = jwtDecode(token).sub;
            const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userId = userIdResponse.data;

            if (!categories.includes(expenseData.category)) {
                await axios.post(`${BaseUrl}/category`, { title: expenseData.category }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCategories(prev => [...prev, expenseData.category]);
            }

            await axios.post(
                `${BaseUrl}/expenses`,
                {
                    amount: expenseData.amount,
                    spentWhere: expenseData.spentWhere,
                    type: selectedType,
                    category: { title: expenseData.category },
                    user: { id: userId },
                    description: expenseData.description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setExpenseData({ amount: "", spentWhere: "", category: "", description: "" });
            setConfirmModal(false);
            setOpen(false);

            updateBalance(); // Update balance after adding expense
        } catch (error) {
            console.error("Error adding expense", error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 420,
                        bgcolor: "background.default",
                        color: "text.primary",
                        boxShadow: 3,
                        p: 4,
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        Add New Expense
                    </Typography>

                    <TextField
                        label="Amount"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={expenseData.amount}
                        onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                    />
                    <TextField
                        label="Spent Where"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={expenseData.spentWhere}
                        onChange={(e) => setExpenseData({ ...expenseData, spentWhere: e.target.value })}
                    />

                    <Autocomplete
                        freeSolo
                        options={categories}
                        loading={loading}
                        value={expenseData.category}
                        onChange={(event, newValue) => {
                            setExpenseData({ ...expenseData, category: newValue });
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" variant="outlined" />
                        )}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={expenseData.description}
                        onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                    />

                    <Box display="flex" justifyContent="space-between" mt={3}>
                        <Button
                            variant="contained"
                            sx={{ flex: 1, borderRadius: 2, mr: 1.5, backgroundColor:"#3675ff"}}
                            onClick={handleSubmitClick}
                        >
                            Next
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ flex: 1, borderRadius: 2 }}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 350,
                        bgcolor: "background.default",
                        color: "text.primary",
                        boxShadow: 3,
                        p: 4,
                        borderRadius: 3,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Is this expense Debited or Credited?
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                            variant="contained"
                            onClick={() => handleConfirmExpense("debited")}
                            sx={{ backgroundColor: "#ec2d2d", borderRadius: 3, justifySelf:"flex-end", alignSelf:"flex-end" }}
                        >
                            Debited
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleConfirmExpense("credited")}
                            sx={{ backgroundColor: "#00b34f", borderRadius: 3, justifySelf:"flex-end", alignSelf:"flex-end" }}
                        >
                            Credited
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default AddExpense;
