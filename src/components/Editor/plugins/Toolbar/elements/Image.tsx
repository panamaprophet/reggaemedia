import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_IMAGE_COMMAND } from '../../Image';
import { Item } from './Item';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { InputFile } from '@/components/Input/InputFile';
import { Image as ImageIcon } from '@/components/Icons/Image';


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
                <ImageIcon size={20} />
                Image
            </Item>

            <Modal
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
