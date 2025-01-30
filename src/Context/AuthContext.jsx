import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Install using: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode JWT
                if (decoded.exp < Date.now()) {
                    logout(); // Token expired
                } else {
                    setUser(decoded.sub); // Store username
                    console.log(decoded.sub)
                }
            } catch (error) {
                logout(); // Invalid token
            }
        }
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.location.href = "/"; // Redirect to log in using window
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
