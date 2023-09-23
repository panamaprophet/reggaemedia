import { useState } from 'react';
import { InputFile } from '@/components/Input/InputFile';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';

export const UploadFile = ({ onSubmit }: { onSubmit: (items: File[]) => void }) => {
    const [images, setImages] = useState<File[]>([]);
    const isDisabled = images.length === 0;

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputFile multiple onChange={(files) => setImages(files as File[])} />
            <Button theme="secondary" width="full" disabled={isDisabled} onClick={() => onSubmit(images)}>Загрузить</Button>
        </div>
    );
};

export const UploadUrl = ({ onSubmit }: { onSubmit: (url: string) => void }) => {
    const [url, setUrl] = useState<string>('');

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputText placeholder="Сссылка" className="w-full border rounded p-2" value={url} onChange={setUrl} />
            <Button theme="secondary" width="full" disabled={!url} onClick={() => onSubmit(url)}>Загрузить</Button>
        </div>
    );
};
