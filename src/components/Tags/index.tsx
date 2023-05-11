import { useState } from 'react';
import { Close } from '../Icons/Close'
import { Button } from '../Button';


const Input = ({
    value = '',
    onChange,
    onKeyDown,
}: {
    value?: string,
    onChange: (value: string) => void,
    onKeyDown?: (code: string, value: string) => void,
}) => {
    const [state, setState] = useState(value);

    return (
        <input
            value={state}
            size={value.length - 1}
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
            placeholder="Теги"
            className="focus:outline-none text-normal p-4"
        />
    );
}


export const Tags = ({ value = [], onChange }: { value: string[], onChange: (value: string[]) => void }) => {
    const onKeyDown = (code: string, currentValue: string) => {
        if (code === 'Backspace' && !currentValue) {
            onChange([...value].slice(0, -1));
        }
    }

    return (
        <div className="flex gap-4">
            {value.map((tag) => (
                <Button key={tag}>
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
            <Input onChange={(newTag) => onChange([...value, newTag])} onKeyDown={onKeyDown} />
        </div>
    )
};
