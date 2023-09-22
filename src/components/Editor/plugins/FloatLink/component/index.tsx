import { FormEvent } from 'react';
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
    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <form
            className="flex flex-col gap-2 border p-2 order rounded bg-white shadow-md"
            onSubmit={onFormSubmit}
        >
            <div className="flex gap-2">
                <InputText
                    value={url}
                    onChange={(value) => onChange({ url: value, target })}
                />

                <Button theme="secondary" type="submit">
                    Сохранить
                </Button>
            </div>

            <Checkbox
                label="Открывать в новой вкладке"
                isChecked={target === '_blank'}
                onChange={(isChecked) => onChange({ url, target: isChecked ? '_blank' : '_self' })}
            />
        </form>
    );
}

export default LinkEditor;
