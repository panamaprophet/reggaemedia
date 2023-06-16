import { useState } from 'react';


interface Props {
    value?: string,
    placeholder?: string,
    onChange: (value: string) => void,
    onKeyDown?: (code: string, value: string) => void,
}

export const Input = ({ value = '', placeholder = '', onChange, onKeyDown }: Props) => {
    const [state, setState] = useState(value);

    return (
        <div className="relative">
            {/* the span is used to dynamically change the width of input according to it's value */}
            <span className="whitespace-nowrap opacity-0 height-0 px-1">{state || placeholder}</span>

            <input
                value={state}
                size={state.length}
                onKeyDown={event => {
                    if (event.code === 'Enter') {
                        onChange(state.trim());
                        setState('');
                    }

                    if (onKeyDown) {
                        onKeyDown(event.code, state);
                    }
                }}
                onChange={event => setState(event.target.value)}
                placeholder={placeholder}
                className="focus:outline-none w-full h-full text-xs font-bold absolute top-0 left-0 min-w-[0.5rem]"
            />
        </div>
    );
}
