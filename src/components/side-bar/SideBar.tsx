import {
    HomeIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    CodeBracketIcon,
    CogIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import SideBarItem from "./SideBarItem";

interface SideBarProps {
    user: {
        name: string;
        email: string;
    }
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({ user, expanded, setExpanded }: SideBarProps) {
    const initials = user?.name?.split(" ").map(x => x[0]).join(""); // Get initials for the avatar

    return(
        <div className="relative">
            <div
                className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`}
            />
            <aside
                className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-64' : 'w-0 sm:w-20'}`}
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
                            linkUrl="/user-settings"
                            expanded={expanded}
                        />
                    </ul>
                    
                    <div className="flex border-t p-3">
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
                            <EllipsisVerticalIcon className="h-6 w-6" />
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    );
}