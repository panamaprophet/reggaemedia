import { KeyboardEvent } from 'react';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';


interface Props {
    url: string,
    isBlank: boolean,
    onChange: (link: string, target: boolean) => void,
    onSubmit: () => void,
}


const LinkEditor = ({ url, isBlank, onChange, onSubmit }: Props) => {
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            onSubmit();
        }
    };

    return (
        <div className="flex flex-col gap-2 border p-2 order rounded bg-white shadow-md">
            <div className="flex gap-2">
                <InputText value={url} onChange={(value) => onChange(value, isBlank)} onKeyDown={onKeyDown} />
                <Button type="secondary" onClick={onSubmit}>
                    Сохранить
                </Button>
            </div>
            <label className="flex items-center justify-start gap-2">
                <input
                    type="checkbox"
                    checked={isBlank}
                    onChange={(event) => onChange(url, event.target.checked)}
                />
                Открывать в новой вкладке
            </label>
        </div>
    );
}

export default LinkEditor;
