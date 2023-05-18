import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { Modal } from '@/components/Modal';
import { InputText } from '@/components/Input/InputText';
import { EmbedContentType, INSERT_EMBED_COMMAND } from '../../../Embed';

interface URLProps {
    type: EmbedContentType | '',
    onSubmit: (type: EmbedContentType | '', url: string) => void,
}

const UploadUrl = ({ type, onSubmit }: URLProps) => {
    const [url, setUrl] = useState<string>('');

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputText placeholder='Insert URL' className='w-full border rounded p-2' value={url} onChange={(data) => setUrl(data)} />
            <button disabled={!url} className='w-full cursor-pointer rounded border p-2' onClick={() => onSubmit(type, url)}>Submit</button>
        </div>
    )
}

export const Embed = () => {
    const [editor] = useLexicalComposerContext();
    const [isOpen, setOpen] = useState(false);
    const [urlType, setUrlType] = useState<EmbedContentType | ''>('');
    const [isEditable, setEditable] = useState(editor.isEditable());

    useRegisterListener('onEdit', setEditable);

    const handleSumbit = (type: EmbedContentType | '', source: string) => {
        editor.dispatchCommand(INSERT_EMBED_COMMAND, { type, source });

        handleClose();
    }

    const handleModal = (type: EmbedContentType) => {
        setUrlType(type);
        setOpen(true);
    }

    const handleClose = () => {
        setUrlType('');
        setOpen(false);
    }

    useRegisterListener('onEdit', setEditable);

    return (
        <>
            <DropDown
                disabled={!isEditable}
                buttonLabel={'Медиа'}
                buttonAriaLabel="Formatting options for text style"
            >
                <DropDownItem onClick={() => handleModal('youtube')}>
                    YouTube
                </DropDownItem>
                <DropDownItem onClick={() => handleModal('soundcloud')}>
                    Soundcloud
                </DropDownItem>
                <DropDownItem onClick={() => handleModal('instagram')}>
                    Instagram
                </DropDownItem>
            </DropDown>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="w-64 h-64 drop-shadow-lg">
                    <UploadUrl type={urlType} onSubmit={handleSumbit} />
                </div>
            </Modal>
        </>
    );
}
