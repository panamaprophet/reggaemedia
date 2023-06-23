import { KeyboardEvent } from 'react';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';


interface Props {
    url: string,
    target: string,
    onChange: ({ url, target }: { url: string, target: string }) => void,
    onSubmit: () => void,
}


const LinkEditor = ({ url, target, onChange, onSubmit }: Props) => {
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="flex flex-col gap-2 border p-2 order rounded bg-white shadow-md">
            <div className="flex gap-2">
                <InputText
                    value={url}
                    onChange={(value) => onChange({ url: value, target })}
                    onKeyDown={onKeyDown}
                />

                <Button type="secondary" onClick={onSubmit}>
                    Сохранить
                </Button>
            </div>

            <Checkbox
                label="Открывать в новой вкладке"
                isChecked={target === '_blank'}
                onChange={(isChecked) => onChange({ url, target: isChecked ? '_blank' : '_self' })}
            />
        </div>
    );
}

export default LinkEditor;
