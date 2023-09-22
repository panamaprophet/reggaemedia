import { ReactNode, useEffect, useRef, useState } from 'react';
import { Chevron } from '@/components/Icons/Chevron';
import { Button } from '@/components/Button';
import { cx } from '@/helpers';


interface ItemProps {
    isActive?: boolean,
    onClick: () => void,
    children: ReactNode,
}

export const DropDownItem = ({ isActive = false, onClick, children }: ItemProps) => {
    return (
        <div
            className={cx(
                'flex flex-row gap-3 items-center px-2 py-1 w-full hover:bg-sky-100 [&>svg]:flex-shrink-0 flex-nowrap whitespace-nowrap',
                isActive && 'bg-slate-200'
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

interface Props {
    children: ReactNode;
    disabled?: boolean;
    buttonLabel?: string;
    buttonAriaLabel?: string;
    stopCloseOnClickSelf?: boolean;
    ButtonIconComponent?: ReactNode | null;
}

export const DropDown = ({ children, buttonLabel, buttonAriaLabel, disabled = false, ButtonIconComponent }: Props): JSX.Element => {
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
        <div className="relative cursor-pointer" ref={ref}>
            <Button
                disabled={disabled}
                // aria-label={buttonAriaLabel || buttonLabel}
                // className="flex items-center justify-center gap-2 p-2"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                <div className="flex items-center gap-2">
                    {ButtonIconComponent}
                    {buttonLabel && <span className="text dropdown-button-text">{buttonLabel}</span>}
                    <Chevron />
                </div>
            </Button>

            {showDropDown && (
                <div className='absolute border rounded bg-white p-3f' onClick={() => setShowDropDown(false)}>
                    {children}
                </div>
            )}
        </div>
    )
}
