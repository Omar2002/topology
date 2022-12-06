import * as React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
    enabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {
        title,
        enabled = true,
        onClick,
    } = props;

    return (
        <button
            title={title}
            onClick={onClick}
            disabled={!enabled}
        >
            {title}
        </button>
    );
}
