import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import useOffset from '@/components/Editor/hooks/useOffset';


interface Props {
    link: string,
    onChange: (link: string) => void,
    onSubmit: () => void,
}


const FloatingLinkEditor = ({ link, onChange, onSubmit }: Props) => {
    const offset = useOffset();

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            onSubmit()
        }
    };

    return (
        <div
            className="flex fixed p-2 gap-2 border rounded bg-white"
            style={offset}
        >
            <InputText value={link} onChange={onChange} onKeyDown={onKeyDown} />
            <Button type="secondary" onClick={onSubmit}>
                Сохранить
            </Button>
        </div>
    );
}

export default FloatingLinkEditor;
