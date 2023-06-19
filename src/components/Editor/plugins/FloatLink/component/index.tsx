import { useState, useEffect } from 'react';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';


const getCurrentSelectionOffset = () => {
    const offset = window.getSelection()?.getRangeAt(0)?.getClientRects()?.[0];

    if (!offset) {
        return { top: 0, left: 0 };
    }

    return {
        top: offset.top + offset.height,
        left: offset.left,
    };
};

interface Props {
    link: string,
    onChange: (link: string) => void,
    onSubmit: () => void,
}


const FloatingLinkEditor = ({ link, onChange, onSubmit }: Props) => {
    const [offset, setOffset] = useState(getCurrentSelectionOffset());

    useEffect(() => {
        const updateOffset = () => setOffset(getCurrentSelectionOffset());

        window.addEventListener('resize', updateOffset);
        window.addEventListener('scroll', updateOffset);
        window.addEventListener('mouseup', updateOffset);

        return () => {
            window.removeEventListener('resize', updateOffset);
            window.removeEventListener('scroll', updateOffset);
            window.removeEventListener('mouseup', updateOffset);
        };
    }, []);

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
