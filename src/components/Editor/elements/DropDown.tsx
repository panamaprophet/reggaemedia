import {
    ReactNode,
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Chevron } from '@/components/Icons/Chevron';

type DropDownContextType = {
    registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

const DropDownContext = createContext<DropDownContextType | null>(null);

export function DropDownItem({
    children,
    className,
    onClick,
    title,
}: {
    children: React.ReactNode;
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    return (
        <button
            className={'flex items-center gap-2 p-1 rounded hover:bg-slate-200 ' + className}
            onClick={onClick}
            ref={ref}
            title={title}
            type="button"
        >
            {children}
        </button>
    );
}

function DropDownItems({
    children,
    dropDownRef,
    onClose,
}: {
    children: React.ReactNode;
    dropDownRef: React.Ref<HTMLDivElement>;
    onClose: () => void;
}) {
    const [items, setItems] = useState<React.RefObject<HTMLButtonElement>[]>();
    const [highlightedItem, setHighlightedItem] =
        useState<React.RefObject<HTMLButtonElement>>();

    const registerItem = useCallback(
        (itemRef: React.RefObject<HTMLButtonElement>) => {
            setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]));
        },
        [setItems],
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!items) return;

        const key = event.key;

        if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
            event.preventDefault();
        }

        if (key === 'Escape' || key === 'Tab') {
            onClose();
        } else if (key === 'ArrowUp') {
            setHighlightedItem((prev) => {
                if (!prev) return items[0];
                const index = items.indexOf(prev) - 1;
                return items[index === -1 ? items.length - 1 : index];
            });
        } else if (key === 'ArrowDown') {
            setHighlightedItem((prev) => {
                if (!prev) return items[0];
                return items[items.indexOf(prev) + 1];
            });
        }
    };

    const contextValue = useMemo(
        () => ({
            registerItem,
        }),
        [registerItem],
    );

    useEffect(() => {
        if (items && !highlightedItem) {
            setHighlightedItem(items[0]);
        }

        if (highlightedItem && highlightedItem.current) {
            highlightedItem.current.focus();
        }
    }, [items, highlightedItem]);

    return (
        <DropDownContext.Provider value={contextValue}>
            <div
                className="bg-white absolute rounded border flex flex-col gap-1 p-2"
                ref={dropDownRef}
                onKeyDown={handleKeyDown}
            >
                {children}
            </div>
        </DropDownContext.Provider>
    );
}

export default function DropDown({
    disabled = false,
    buttonLabel,
    buttonAriaLabel,
    ButtonIconComponent,
    children,
    stopCloseOnClickSelf,
}: {
    disabled?: boolean;
    buttonAriaLabel?: string;
    ButtonIconComponent?: ReactNode | null;
    buttonLabel?: string;
    children: ReactNode;
    stopCloseOnClickSelf?: boolean;
}): JSX.Element {
    const dropDownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [showDropDown, setShowDropDown] = useState(false);

    const handleClose = () => {
        setShowDropDown(false);
        if (buttonRef && buttonRef.current) {
            buttonRef.current.focus();
        }
    };

    useEffect(() => {
        const button = buttonRef.current;
        const dropDown = dropDownRef.current;

        if (showDropDown && button !== null && dropDown !== null) {
            const { top, left } = button.getBoundingClientRect();
            dropDown.style.top = `${top + 40}px`;
            dropDown.style.left = `${Math.min(
                left,
                window.innerWidth - dropDown.offsetWidth - 20,
            )}px`;
        }
    }, [dropDownRef, buttonRef, showDropDown]);

    useEffect(() => {
        const button = buttonRef.current;

        if (button !== null && showDropDown) {
            const handle = (event: MouseEvent) => {
                const target = event.target;
                if (stopCloseOnClickSelf) {
                    if (
                        dropDownRef.current &&
                        dropDownRef.current.contains(target as Node)
                    )
                        return;
                }
                if (!button.contains(target as Node)) {
                    setShowDropDown(false);
                }
            };
            document.addEventListener('click', handle);

            return () => {
                document.removeEventListener('click', handle);
            };
        }
    }, [dropDownRef, buttonRef, showDropDown, stopCloseOnClickSelf]);

    return (
        <>
            <button
                disabled={disabled}
                aria-label={buttonAriaLabel || buttonLabel}
                className={'flex items-center justify-center gap-1 p-1'}
                onClick={() => setShowDropDown(!showDropDown)}
                ref={buttonRef}
            >
                {ButtonIconComponent && ButtonIconComponent}
                {buttonLabel && (
                    <span className="text dropdown-button-text">{buttonLabel}</span>
                )}
                <Chevron size={16} />
            </button>

            {showDropDown &&
                <DropDownItems dropDownRef={dropDownRef} onClose={handleClose}>
                    {children}
                </DropDownItems>
            }
        </>
    );
}
