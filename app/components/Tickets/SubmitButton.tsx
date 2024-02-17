'use client'

import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
    text: any;
    textPending?: any;
    event?: () => void;
    disabled?: boolean;
    className?: string;
}

const SubmitButton = ({ text, textPending = 'Submitting...', event, disabled = false, className }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    const handleClick = () => {
        if (event) {
            event();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={pending || disabled}
            className={`dark:bg-zinc-800 bg-zinc-700 rounded w-fit py-1.5 px-2
            hover:bg-opacity-50
            disabled:bg-opacity-100
          disabled:text-zinc-600
           ${className}`}
        >
            {pending || disabled ? (
                <span className="flex items-center">
                    {textPending}<span className="animate-pulse">...</span>
                </span>
            ) : (
                <span className="flex items-center">{text}</span>
            )}
        </button>
    );
};

export default SubmitButton;