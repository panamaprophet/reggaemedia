import { ReactNode, useEffect, useRef, useState } from 'react';
import { Chevron } from '@/components/Icons/Chevron';


interface IDropDown {
    children: ReactNode;
    disabled?: boolean;
    buttonLabel?: string;
    buttonAriaLabel?: string;
    stopCloseOnClickSelf?: boolean;
    ButtonIconComponent?: ReactNode | null;
}

interface IDropDownItems {
    isActive?: boolean,
    onClick: () => void,
    children: ReactNode,
}

export const DropDownItem = ({ isActive = false, onClick, children }: IDropDownItems) => {
    return (
        <div
            className={`
                flex
                flex-row
                gap-1
                items-center
                p-1
                w-full
                rounded
                hover:bg-sky-100
                cursor-pointer
                ${isActive && 'bg-slate-200'}
            `}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export const DropDown = ({ children, buttonLabel, buttonAriaLabel, disabled = false, ButtonIconComponent }: IDropDown): JSX.Element => {
    const [showDropDown, setShowDropDown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (!event.target) {
                return;
            }

            if (!ref.current?.contains(event.target as HTMLDivElement)) {
                setShowDropDown(false)
            }

            if (ref.current === event.target) {
                setShowDropDown(false)
            }
        };

        document.addEventListener('mousedown', handleMouseDown)

        return () => document.removeEventListener('mousedown', handleMouseDown)
    })

    return (
        <div className='relative' ref={ref}>
            <button
                disabled={disabled}
                aria-label={buttonAriaLabel || buttonLabel}
                className={'flex items-center justify-center gap-1 p-1'}
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {ButtonIconComponent}
                {buttonLabel && <span className="text dropdown-button-text">{buttonLabel}</span>}
                <Chevron size={16} />
            </button>

            {showDropDown && (
                <div className='absolute border rounded bg-white p-3' onClick={() => setShowDropDown(false)}>
                    {children}
                </div>
            )}
        </div>
    )
}
