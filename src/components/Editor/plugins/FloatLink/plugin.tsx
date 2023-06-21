import { useState } from 'react';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';

import { useRegisterListener } from '../../hooks/useRegisterListener';
import { getLinkNode, getSelectedNode } from './helpers';
import { Modal } from '@/components/Modal';
import useSelectionOffset from '../../hooks/useOffset';
import LinkEditor from './component';


export const FloatLinkPlugin = () => {
    const [offset, refreshOffset] = useSelectionOffset();
    const [editor] = useLexicalComposerContext();
    const [state, setState] = useState({ url: '', target: '_blank' });
    const [isOpen, setOpen] = useState(false);

    useRegisterListener('onUpdate', () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkNode = getLinkNode(node);

                if (!linkNode) {
                    setOpen(false);

                    return;
                }

                refreshOffset();

                setState({ url: linkNode.getURL(), target: linkNode.getTarget() || '_blank' })

                setOpen(true);
            }
        });
    });

    const handleChange = (link: string, target: boolean) => 
        setState({ url: link, target: target ? '_blank' : '_self' });

    const submit = () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, state);

    return (
        <Modal isOpen={isOpen} onClose={() => setOpen(false)} type="float" position={offset}>
            <LinkEditor
                isBlank={state.target  === '_blank'}
                url={state.url}
                onChange={handleChange}
                onSubmit={submit}
            />,
        </Modal>
    )
}
