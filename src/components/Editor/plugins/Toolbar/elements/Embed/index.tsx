import { useState } from 'react';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Modal } from '@/components/Modal';
import { InputText } from '@/components/Input/InputText';
import { EmbedContentType, INSERT_EMBED_COMMAND } from '../../../Embed';

interface URLProps {
    onSubmit: (url: string) => void,
}

const UploadUrl = ({ onSubmit }: URLProps) => {
    const [url, setUrl] = useState('');

    return (
        <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2'>
            <InputText placeholder='Insert URL' className='w-full border rounded p-2' value={url} onChange={(data) => setUrl(data)} />
            <button disabled={!url} className='w-full cursor-pointer rounded border p-2' onClick={() => onSubmit(url)}>Submit</button>
        </div>
    )
}

export const Embed = () => {
    const [editor] = useLexicalComposerContext();
    const [type, setEmbedType] = useState<EmbedContentType>();

    const handleSumbit = (source: string) => {
        if (!type) {
            return;
        }

        editor.dispatchCommand(INSERT_EMBED_COMMAND, { type, source });
        setEmbedType(undefined);
    }

    return (
        <>
            <DropDown
                buttonLabel={'Медиа'}
                buttonAriaLabel="Formatting options for text style"
            >
                <DropDownItem onClick={() => setEmbedType('youtube')}>
                    YouTube
                </DropDownItem>
                <DropDownItem onClick={() => setEmbedType('soundcloud')}>
                    Soundcloud
                </DropDownItem>
                <DropDownItem onClick={() => setEmbedType('instagram')}>
                    Instagram
                </DropDownItem>
            </DropDown>

            <Modal isOpen={Boolean(type)} onClose={() => setEmbedType(undefined)}>
                <UploadUrl onSubmit={handleSumbit} />
            </Modal>
        </>
    );
}
