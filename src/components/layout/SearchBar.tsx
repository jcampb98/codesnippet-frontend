interface SearchBarProps {
    value: string;
    onChange: (e: { target: { value: string; }; }) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="flex items-center w-full max-w-lg">
            <input
                type="text"
                className="pl-4 w-full sm:w-3/4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Search By Title..."
                value={value}
                onChange={onChange}
            />
        </div>
    );
}