import { Link } from "react-router-dom";

export default function FormRedirect() {
    return(
        <div className="flex items-center justify-between">
            <div className="text-sm">
                <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                    Back to Home Page
                </Link>
            </div>
        </div>
    );
}