import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>();

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if(response.status === 200) {
                    // Token is valid, allows access
                    setIsAuthenticated(true);
                    return;
                }
                else {
                    // Token is invalid or expired, redirects to login page
                    setIsAuthenticated(false);
                    return;
                }
            }
            catch(error) {
                console.error("Error validating token", error);
                setIsAuthenticated(false);
            }
        }

        validateToken();
    }, []);

    if(isAuthenticated === null) {
        return <div>Loading...</div>; // Shows a loading state
    }

    if(isAuthenticated === false) {
        return <Navigate to="/login" />; // redirect to login page if not authenticated
    }

    return children; // if authenticated, renders the child components
};

export default ProtectedRoute;