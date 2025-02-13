import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Homepage from "./Components/Homepage/Homepage";
import SignUp from "./Components/Auth/SignUp";
import SeeTransactions from "./Components/Homepage/SeeTransactions";

const Scripts = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/homepage" element={<Homepage/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/transactions" element={<SeeTransactions/>}/>
            </Routes>
        </Router>
    );
};

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<Scripts />);
