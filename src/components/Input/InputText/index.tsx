import { ChangeEventHandler } from 'react';

type Props = {
    value: string,
    placeholder?: string,
    onChange?: (value: string) => void,
};


export const InputText = ({ value, placeholder, onChange }: Props) => {
    const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (onChange) {
            onChange(String(event.target.value));
        }
    }

    return (
        <input
            className="outline-none"
            placeholder={placeholder}
            type="text"
            value={String(value)}
            readOnly={onChange ? false : true}
            onChange={_onChange}
        />
    );
};
