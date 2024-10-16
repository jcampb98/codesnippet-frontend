import { Oval } from "react-loader-spinner";

interface LoadingSpinnerProps {
    text: string;
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Oval
                color="#011f4b"
                secondaryColor="#D3D3D3"
                height={100}
                width={100}
                visible={true}
            />
            <p className='mt-5 text-center text-lg text-gray-500'>
                { text }
            </p>
        </div>
    );
}