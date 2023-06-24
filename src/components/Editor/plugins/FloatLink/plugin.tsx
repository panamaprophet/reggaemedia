import { useState } from 'react';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useRegisterListener } from '../../hooks/useRegisterListener';
import { getLinkNode, getSelectedNode } from './helpers';
import { Modal } from '@/components/Modal';
import useSelectionOffset from '../../hooks/useSelectionOffset';
import LinkEditor from './component';


export const FloatLinkPlugin = () => {
    const [offset, refreshOffset] = useSelectionOffset();
    const [editor] = useLexicalComposerContext();
    const [state, setState] = useState<{ url: string, target: string } | null>(null);

    const { url = '', target = '' } = state || {};

    const onSubmit = () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, state);

    useRegisterListener('onUpdate', () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkNode = getLinkNode(node);

                if (!linkNode) {
                    setState(null);
                    return;
                }

                refreshOffset();

                setState({
                    url: linkNode.getURL(),
                    target: linkNode.getTarget() || '_blank'
                });
            }
        });
    });

    return (
        <Modal
            type="float"
            position={offset}
            isOpen={Boolean(state)}
            onClose={() => setState(null)}
        >
            <LinkEditor
                url={url}
                target={target}
                onChange={setState}
                onSubmit={onSubmit}
            />,
        </Modal>
    )
}
