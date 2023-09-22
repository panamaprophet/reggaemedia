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
    label: ReactNode;
    children: ReactNode;
    disabled?: boolean;
}

export const DropDown = ({ children, label, disabled = false }: Props): JSX.Element => {
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
                onClick={() => setShowDropDown(!showDropDown)}
            >
                <div className="flex items-center gap-2">
                    <span className="text dropdown-button-text">{label}</span>
                    <Chevron />
                </div>
            </Button>

            {showDropDown && (
                <div className='absolute border rounded bg-white p-3' onClick={() => setShowDropDown(false)}>
                    {children}
                </div>
            )}
        </div>
    )
}
