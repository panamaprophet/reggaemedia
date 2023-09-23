import { useState } from 'react';

import { Item } from './Item';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Modal } from '@/components/Modal';
import { Image as ImageIcon } from '@/components/Icons/Image';
import { Button } from '@/components/Button';
import { UploadFile, UploadUrl } from './Uploaders';
import { INSERT_EMBED_COMMAND } from '../../Embed';

export const Image = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputType, setInputType] = useState<'file' | 'url' | null>(null);
    const [editor] = useLexicalComposerContext();

    const closeModal = () => {
        setModalOpen(false);
        setInputType(null);
    }

    const onFileSelected = (files: File[]) => {
        files.forEach((file) => editor.dispatchCommand(INSERT_EMBED_COMMAND, { type: 'image', source: file }));
        closeModal();
    };

    const onUrlSelected = (url: string) => {
        editor.dispatchCommand(INSERT_EMBED_COMMAND, { type: 'image', source: url });
        closeModal();
    }

    return (
        <>
            <Item onClick={() => setModalOpen(true)}>
                <ImageIcon />
            </Item>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <div className="w-64 h-64 drop-shadow-lg">
                    {!inputType && (
                        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
                            <Button theme="secondary" width="full" onClick={() => setInputType('url')}>Ссылка</Button>
                            <Button theme="secondary" width="full" onClick={() => setInputType('file')}>Файл</Button>
                        </div>
                    )}
                    {inputType === 'url' && <UploadUrl onSubmit={onUrlSelected} />}
                    {inputType === 'file' && <UploadFile onSubmit={onFileSelected} />}
                </div>
            </Modal>
        </>
    );
}
