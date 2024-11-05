import Dialog from "./Dialog";

interface Props {
    title: string;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationDialog(props: Props) {
    const { open, onClose, title, children, onConfirm } = props;

    if(!open) {
        return <></>;
    }

    return(
        <Dialog open={open} onClose={onClose}>
            <h2 className="text-xl">{title}</h2>
            <div className="py-5">{children}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <button
                        className="text-red-600 hover:text-red-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
                <div className="p-1">
                    <button
                        className="text-green-600 hover:text-red-500"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </Dialog>
    );
}