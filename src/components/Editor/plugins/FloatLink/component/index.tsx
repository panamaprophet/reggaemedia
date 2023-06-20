import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import useSelectionOffset from '@/components/Editor/hooks/useOffset';
import { useEffect, useState } from 'react';


interface Props {
    url: string,
    onChange: (url: string) => void,
    onSubmit: (target: string) => void,
    isBlank: boolean,
}


const FloatingLinkEditor = ({ url, isBlank, onChange, onSubmit }: Props) => {
    const [checked, setChecked] = useState(isBlank);
    const target = checked ? '_blank' : '_self';
    const offset = useSelectionOffset();

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            onSubmit(target);
        }
    };

    useEffect(() => {
        onSubmit(target);
    }, [checked])

    return (
        <div className="flex flex-col gap-2 fixed border p-2 order rounded bg-white" style={offset}>
            <div className="flex gap-2">
                <InputText value={url} onChange={onChange} onKeyDown={onKeyDown} />
                <Button type="secondary" onClick={() => onSubmit(target)}>
                    Сохранить
                </Button>
            </div>
            <label className="flex p-1 justify-between items-center">
                Открывать ссылку в новой вкладке
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                />
            </label>
        </div>
    );
}

export default FloatingLinkEditor;
