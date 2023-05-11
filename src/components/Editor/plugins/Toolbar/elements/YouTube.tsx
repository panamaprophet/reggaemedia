import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection } from 'lexical';

import { useState } from 'react';
import { YouTube as YouTubeIcon } from '@/components/Icons/YouTube';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { Modal } from '@/components/Modal';
import { InputText } from '@/components/Input/InputText';
import { INSERT_YOUTUBE_COMMAND } from '../../YouTube/command';
import { Item } from './Item';
import { $isYouTubeNode } from '../../YouTube/node';


export const YouTube = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());
    const [url, setUrl] = useState('')

    const $updateActive = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isYouTubeNode(selection)) {
                setActive(true);
            } else {
                setActive(false);
            }
        })

        return false;
    };

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateActive);

    const handleSumbit = () => {
        editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, url);

        setOpen(false);
    }

    return (
        <>
            <Item
                disabled={!isEditable}
                onClick={() => setOpen(true)}
                className={isActive ? 'border rounded bg-slate-100' : ''}
                title="Italic"
                aria-label="Format text as italic."
            >
                <YouTubeIcon size="sm" />
            </Item>

            <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
                <div className='flex flex-col gap-2 bg-white rounded border items-center justify-center p-2 z-50'>
                    <InputText placeholder='Insert URL' className='w-full border rounded p-2' value={url} onChange={(data) => setUrl(data)} />
                    <button disabled={!url} className='w-full cursor-pointer border p-2' onClick={handleSumbit}>Вставить</button>
                </div>
            </Modal>
        </>
    )
}
