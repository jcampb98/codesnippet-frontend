import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";

export default function SearchBar() {
    return (
        <div className="flex items-center w-full max-w-lg">
            <input
                type="text"
                className="pl-4 w-full sm:w-3/4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Search..."
            />
            <button className="hidden sm:flex items-center ml-3 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md">
                <MagnifyingGlassCircleIcon className="w-5 h-5 mr-2" />
                Search
            </button>
        </div>
    );
}