import { useState } from 'react';
import { InputFile } from '@/components/Input/InputFile';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    INSERT_IMAGE_URL_COMMAND,
    INSERT_IMAGE_FILE_COMMAND,
} from '../../Image';
import { InputText } from '@/components/Input/InputText';


interface Props {
    onSubmit: () => void;
}

export const UploadFile = ({ onSubmit }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [images, setImages] = useState<File[]>([]);

    const handleSumbit = () => {
        images.forEach((file) => editor.dispatchCommand(INSERT_IMAGE_FILE_COMMAND, file));

        onSubmit();
    };

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputFile multiple onChange={(data) => Array.isArray(data) ? setImages(data) : setImages([data])} />
            <button disabled={images.length === 0} className='w-full cursor-pointer border p-2' onClick={handleSumbit}>Загрузить</button>
        </div>
    )
}

export const UploadUrl = ({ onSubmit }: Props) => {
    const [editor] = useLexicalComposerContext();
    const [url, setUrl] = useState<string>('');

    const handleSumbit = () => {
        editor.dispatchCommand(INSERT_IMAGE_URL_COMMAND, url);

        onSubmit();
    };

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputText placeholder='Insert URL' className='w-full border rounded p-2' value={url} onChange={(data) => setUrl(data)} />
            <button disabled={!url} className='w-full cursor-pointer rounded border p-2' onClick={handleSumbit}>Submit</button>
        </div>
    )
}
