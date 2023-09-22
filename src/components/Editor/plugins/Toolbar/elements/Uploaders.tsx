import { useState } from 'react';
import { InputFile } from '@/components/Input/InputFile';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_EMBED_COMMAND } from '../../Embed';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';


interface Props {
    onSubmit: () => void;
}

export const UploadFile = ({ onSubmit }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [images, setImages] = useState<File[]>([]);

    const handleSumbit = () => {
        images.forEach((file) => editor.dispatchCommand(INSERT_EMBED_COMMAND, { type: 'image', source: file }));

        onSubmit();
    };

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputFile multiple onChange={(data) => Array.isArray(data) ? setImages(data) : setImages([data])} />
            <Button theme="secondary" width="full" disabled={images.length === 0} onClick={handleSumbit}>Загрузить</Button>
        </div>
    )
}

export const UploadUrl = ({ onSubmit }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [url, setUrl] = useState<string>('');

    const handleSumbit = () => {
        editor.dispatchCommand(INSERT_EMBED_COMMAND, { type: 'image', source: url });

        onSubmit();
    };

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputText placeholder="Сссылка" className="w-full border rounded p-2" value={url} onChange={(data) => setUrl(data)} />
            <Button theme="secondary" width="full" disabled={!url} onClick={handleSumbit}>Загрузить</Button>
        </div>
    )
}
