import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import SideBar from "../../components/side-bar/SideBar";
import AccountSettings from "../../components/account-settings/AccountSettings";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import "../../styles/account-settings/AccountSettings.css";

interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiResponseError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

export default function AccountSettingsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            toast.error("Invalid Token: Redirecting to login page.");
            navigate("/login");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                if(response.status == 200) {
                    setUser(response.data.user);
                }
            } 
            catch(error: unknown) {
                const axiosError = error as AxiosError<ApiResponseError>;
                if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                    toast.error("Error: Signing in failed");
                    localStorage.removeItem('token');
                    navigate("/login");
                }
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, [navigate]);

    const deleteAccount = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/deleteAccount`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });

            if(response.status === 200) {
                toast.success("Account deleted successfully");
                localStorage.removeItem('token');
                navigate("/login");
            }
        } 
        catch (error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;
            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Error: Deleting Account failed");
                localStorage.removeItem('token');
                navigate("/login");
            }
        }
    };

    if(!user && isLoading) {
        return <LoadingSpinner text="Loading Account Settings..." />;
    }

    return (
        <div className="container">
            {
                user &&
                <>
                    <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />
                    <div className="account-settings-container">
                        <h3 className="account-settings-title">Account Settings</h3>
                        <AccountSettings user={user} />
                        <br />
                        <button type="button" onClick={deleteAccount} className="delete-account-btn">Delete Account</button>
                    </div>
                </> 
            }
        </div>
    );
}