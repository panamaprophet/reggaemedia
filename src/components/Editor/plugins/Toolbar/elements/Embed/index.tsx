import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { Modal } from '@/components/Modal';
import { EmbedContentType, INSERT_EMBED_COMMAND } from '../../../Embed';
import { UploadUrl } from '../Uploaders';

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
            <DropDown label="Медиа">
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
