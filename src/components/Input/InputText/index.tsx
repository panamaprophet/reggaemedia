import { cx } from '@/helpers';
import { ChangeEventHandler } from 'react';

type Props = {
    value: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    className?: string,
};


export const InputText = ({ value, className = '', placeholder, onChange }: Props) => {
    const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (onChange) {
            onChange(String(event.target.value));
        }
    }

    return (
        <input
            className={cx('outline-none bg-transparent', className)}
            placeholder={placeholder}
            type="text"
            value={String(value)}
            readOnly={onChange ? false : true}
            onChange={_onChange}
        />
    );
};
