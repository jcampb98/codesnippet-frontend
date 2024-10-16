import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SideBarItemProps {
    active?: boolean;
    icon: React.ReactNode;
    text: string;
    linkUrl: string;
    expanded: boolean;
    subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SideBarItemProps, 'expanded'> {
    expanded?: never;
    subMenu?: never;
}

function HoveredSubMenuItem({ icon, text, linkUrl, active }: SubMenuItemProps) {
    return (
        <Link to={linkUrl} className={`my-2 rounded-md p-2 ${active ? 'bg-gray-300' : 'hover:bg-indigo-50'}`}>
            <div className="flex items-center">
                <span className="text-primary-500 h-6 w-6">{icon}</span>
                <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
            </div>
        </Link>
    );
}

export default function SidebarItem({ 
    icon, 
    active = false, 
    text,
    linkUrl, 
    expanded = false, 
    subMenu = null,
}: SideBarItemProps) {
    const [expandSubMenu, setExpandSubMenu] = useState(false);

    useEffect(() => {
        if(!expanded) {
            setExpandSubMenu(expanded);
        }
    }, [expanded]);

    // Calculate the height of the sub-menu assuming each item is 40px tall
    const subMenuHeight = expandSubMenu ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px}` : 0;

    return (
        <>
            <li>
                <button
                    className={`
                        group relative my-1 flex w-full items-center rounded-md px-3 py-2
                        ${active && !subMenu
                            ? 'text-primary-500 bg-gradient-to-tr from-indigo-200 to-indigo-100'
                            : 'text-gray-600 hover:bg-indigo-50'}
                        ${!expanded && 'hidden sm:flex'}
                    `}
                    onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
                >
                    <span className="h-6 w-6">{icon}</span>
                    <Link
                        to={linkUrl}
                        className={`overflow-hidden text-start transition-all ${expanded ? 'ml-3 w-44' : 'w-0'}`}
                    >
                        {text}
                    </Link>
                    {subMenu && (
                        <div className={`absolute right-2 h-4 w-4 transition-all ${expandSubMenu ? 'rotate-90' : 'rotate-0'}`}>
                            <ChevronRightIcon />
                        </div>
                    )}

                    {!expanded && (
                        <div
                            className={`
                                text-primary-500 invisible absolute left-full ml-6
                                -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm
                                opacity-20 transition-all group-hover:visible group-hover:translate-x-0
                                group-hover:opacity-100
                            `}
                        >
                            {!subMenu ? text : subMenu.map((item, index) => (
                                <HoveredSubMenuItem key={index} {...item} />
                            ))}
                        </div>
                    )}
                </button>
            </li>

            <ul className="sub-menu pl-6" style={{ height: subMenuHeight }}>
                {expanded && subMenu?.map((item, index) => (
                    <SidebarItem key={index} {...item} expanded={expanded} />
                ))}
            </ul>
        </>
    );
}