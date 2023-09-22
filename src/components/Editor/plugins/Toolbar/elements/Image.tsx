import { useState } from 'react';

import { Item } from './Item';
import { Modal } from '@/components/Modal';
import { Image as ImageIcon } from '@/components/Icons/Image';
import { UploadFile, UploadUrl } from './Uploaders';
import { Button } from '@/components/Button';


export const Image = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputType, setInputType] = useState<'file' | 'url' | null>(null);

    const handleModalClose = () => {
        setModalOpen(false);
        setInputType(null);
    }

    return (
        <>
            <Item onClick={() => setModalOpen(true)}>
                <ImageIcon />
            </Item>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            >
                <div className="w-64 h-64 drop-shadow-lg">
                    {!inputType && (
                        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
                            <Button theme="secondary" width="full" onClick={() => setInputType('url')}>Ссылка</Button>
                            <Button theme="secondary" width="full" onClick={() => setInputType('file')}>Файл</Button>
                        </div>
                    )}
                    {inputType === 'url' && <UploadUrl onSubmit={handleModalClose} />}
                    {inputType === 'file' && <UploadFile onSubmit={handleModalClose} />}
                </div>
            </Modal>
        </>
    );
}
