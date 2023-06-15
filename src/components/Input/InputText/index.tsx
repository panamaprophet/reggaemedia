import { cx } from '@/helpers';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

type Props = {
    value: string,
    placeholder?: string,
    type?: HTMLInputTypeAttribute,
    onChange?: (value: string) => void,
    className?: string,
};


export const InputText = ({ value, type, className = '', placeholder, onChange }: Props) => {
    const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (onChange) {
            onChange(String(event.target.value));
        }
    }

    return (
        <input
            className={cx('outline-none bg-transparent', className)}
            placeholder={placeholder}
            type={type}
            value={String(value)}
            readOnly={onChange ? false : true}
            onChange={_onChange}
        />
    );
};
