import {
    HomeIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    CodeBracketIcon,
    CogIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import SideBarItem from "./SideBarItem";
import axios, { AxiosError} from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SideBarProps {
    user: {
        name: string;
        email: string;
    }
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
}

interface ApiResponseError {
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

export default function SideBar({ user, expanded, setExpanded }: SideBarProps) {
    const initials = user?.name?.split(" ").map(x => x[0]).join(""); // Get initials for the avatar
    const[showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();

    const toggleLogoutPopover = () => {
        setShowPopover(!showPopover);
    };

    const logoutAccount = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {},    
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            if(response.status === 200) {
                toast.success(response.data.message);
                localStorage.removeItem('token');
                navigate("/login");
            }
        }
        catch (error: unknown) {
            const axiosError = error as AxiosError<ApiResponseError>;
            if(axiosError.response && axiosError.response.data && axiosError.response.data.errors) {
                toast.error("Failed to log out. Please try again.");
            }
        }
    }

    return(
        <div className="relative">
            <div
                className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`}
            />
            <aside
                className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-72' : 'w-0 sm:w-20'}`}
            >
                <nav className="flex h-full flex-col border-r bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 pb-2">
                        <img
                            src="./codesnippet-logo.svg"
                            className={`overflow-hidden transition-all ${
                            expanded ? 'w-32' : 'w-0'
                            }`}
                            alt=""
                        />
                        <div className={`${expanded ? '' : 'hidden sm:block'}`}>
                        <button
                            onClick={() => setExpanded((curr: boolean) => !curr)}
                            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
                        >
                            {expanded ? (
                            <ArrowLeftIcon className="h-6 w-6" />
                            ) : (
                            <ArrowRightIcon className="h-6 w-6" />
                            )}
                        </button>
                        </div>
                    </div>
                    
                    <ul className="flex-1 px-3">
                        <SideBarItem
                            icon={<HomeIcon className="h-6 w-6 text-primary-500" />}
                            text="Dashboard"
                            linkUrl="/dashboard"
                            expanded={expanded}
                        />
                        <SideBarItem
                            icon={<CodeBracketIcon className="h-6 w-6 text-primary-500" />}
                            text="Code Snippets"
                            linkUrl="/code-snippets"
                            expanded={expanded}
                        />
                        <SideBarItem
                            icon={<CogIcon className="h-6 w-6 text-primary-500" />}
                            text="Account Settings"
                            linkUrl="/account-settings"
                            expanded={expanded}
                        />
                    </ul>
                    
                    <div className="flex border-t p-2">
                        <img
                            src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${initials}`}
                            alt={`${user.name}'s avatar`}
                            className="h-10 w-10 rounded-md"
                        />
                        <div className={`flex items-center justify-between overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">{user.name}</h4>
                                <span className="text-xs text-gray-600">{user.email}</span>
                            </div>
                            <EllipsisVerticalIcon 
                                className="h-6 w-6 cursor-pointer"
                                onClick={toggleLogoutPopover}
                            />
                            {showPopover && (
                                <div className="absolute mb-16 ml-20 left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg z-10">
                                    <span className="block px-4 py-2 text-gray-700 cursor-pointer" onClick={logoutAccount}>
                                        Logout
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    );
}