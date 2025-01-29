import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import { AuthProvider } from "./context/AuthContext";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/expenses/:userId" element={<Homepage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

// Ensure the AppLayout is rendered
rootElement.render(<AppLayout />);
