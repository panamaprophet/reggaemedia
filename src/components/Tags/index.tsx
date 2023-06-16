import { useState } from 'react';
import { Close } from '../Icons/Close'
import { Button } from '../Button';


const Input = ({
    value = '',
    placeholder = '',
    onChange,
    onKeyDown,
}: {
    value?: string,
    placeholder?: string,
    onChange: (value: string) => void,
    onKeyDown?: (code: string, value: string) => void,
}) => {
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


export const Tags = ({ value = [], onChange }: { value: string[], onChange: (value: string[]) => void }) => {
    const onKeyDown = (code: string, currentValue: string) => {
        if (code === 'Backspace' && !currentValue) {
            onChange([...value].slice(0, -1));
        }
    }

    return (
        <div className="flex items-center gap-2 p-4">
            {value.map((tag) => (
                <Button key={tag} style="secondary" size="small">
                    <div className="flex items-center">
                        <Input
                            value={tag}
                            onChange={(changedTag) => onChange(value.map(item => item === tag ? changedTag : item))}
                        />

                        <div onClick={() => onChange(value.filter(item => tag !== item))}>
                            <Close size="xs" />
                        </div>
                    </div>
                </Button>
            ))}
            <Input onChange={(newTag) => onChange([...value, newTag])} onKeyDown={onKeyDown} placeholder="Тег" />
        </div>
    )
};
