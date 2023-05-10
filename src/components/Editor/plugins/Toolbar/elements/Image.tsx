import { useState } from 'react';

import { Item } from './Item';
import { Modal } from '@/components/Modal';
import { Image as ImageIcon } from '@/components/Icons/Image';
import { UploadFile, UploadUrl } from './Uploaders';


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
                            <div className='w-full text-center bg-gray-200 rounded cursor-pointer p-2' onClick={() => setInputType('url')}>URL</div>
                            <div className='w-full text-center bg-gray-200 rounded cursor-pointer p-2' onClick={() => setInputType('file')}>File</div>
                        </div>
                    )}
                    {inputType === 'url' && <UploadUrl onSubmit={handleModalClose} />}
                    {inputType === 'file' && <UploadFile onSubmit={handleModalClose} />}
                </div>
            </Modal>
        </>
    );
}
