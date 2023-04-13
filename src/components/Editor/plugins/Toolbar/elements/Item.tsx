import { LexicalEditor } from "lexical";
import { MutableRefObject, ReactNode } from "react";

interface Props {
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    onClick: () => void,
    title?: string,
    ariaLabel?: string,
    ref?: MutableRefObject<HTMLButtonElement>
}

export const Item = ({
    children,
    title = '',
    ariaLabel = '',
    disabled = false,
    className = '',
    onClick,
    ref
}: Props) => (
    <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={'w-8 h-8 p-1 flex items-center justify-center ' + className}
        title={title}
        aria-label={ariaLabel}
        ref={ref}
    >
        {children}
    </button>
)
