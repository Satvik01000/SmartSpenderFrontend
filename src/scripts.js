import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Routes and Route
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/expenses/:userId" element={<Homepage />} /> {/* Route for Homepage */}
            </Routes>
        </BrowserRouter>
    );
};

rootElement.render(<AppLayout />);
