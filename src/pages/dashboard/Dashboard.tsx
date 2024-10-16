import { useEffect, useState } from "react";
import SideBar from "../../components/side-bar/SideBar";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
       const token = localStorage.getItem("token");

       if(token) {
            axios.get(`${import.meta.env.VITE_API_URL}/validate-token`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                console.log(response.data);

                if(response.status === 200) {
                    setUser(response.data.user);
                }
            })
            .catch(() => {
                localStorage.removeItem('user');
                navigate("/login");
            });
       }
       else {
            navigate("/login");
       }
    }, [navigate]);

    if(!user) {
        return <LoadingSpinner text="Loading Dashboard..." />;
    }

    return (
        <div className="dashboard-container">
            <SideBar user={user} expanded={expanded} setExpanded={setExpanded} />
        </div>
    );
}