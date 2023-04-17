import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_IMAGE_COMMAND } from '../../Image';
import { Item } from './Item';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { InputFile } from '@/components/Input/InputFile';


export const Image = () => {
    const [editor] = useLexicalComposerContext();
    const [isModalOpen, setModalOpen] = useState(false);

    const dispatchImage = (payload: { altText: string, src: string }) => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    };

    const handleInputData = (data: File | File[]) => {
        if (Array.isArray(data)) {
            data.forEach(item => dispatchImage({ altText: item.name, src: window.URL.createObjectURL(item) }));

            return;
        }

        dispatchImage({ altText: data.name, src: window.URL.createObjectURL(data) });
    }

    return (
        <>
            <Item onClick={() => setModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Image
            </Item>

            <Modal
                className="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div className='flex flex-col'>
                    <div>
                        <p>Write down an URL and press Enter</p>
                        <input
                            type='text'
                            onChange={(event) => {
                                dispatchImage({ altText: event.target.value, src: event.target.value });
                                setModalOpen(false);
                            }}
                        />
                    </div>
                    <p>OR</p>
                    <InputFile onChange={(data) => handleInputData(data)} />
                </div>
            </Modal>
        </>
    );
}
