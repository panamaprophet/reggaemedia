import { cx } from '@/helpers';
import { ChangeEventHandler, HTMLInputTypeAttribute, KeyboardEventHandler } from 'react';

type Props = {
    value: string,
    placeholder?: string,
    type?: HTMLInputTypeAttribute,
    onChange?: (value: string) => void,
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>,
    className?: string,
};


export const InputText = ({ value, type, className = '', placeholder, onChange, onKeyDown }: Props) => {
    const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (onChange) {
            onChange(String(event.target.value));
        }
    }

    return (
        <input
            className={cx('w-full p-2 border rounded-md outline-none bg-transparent', className)}
            placeholder={placeholder}
            type={type}
            value={String(value)}
            readOnly={onChange ? false : true}
            onChange={_onChange}
            onKeyDown={onKeyDown}
        />
    );
};
