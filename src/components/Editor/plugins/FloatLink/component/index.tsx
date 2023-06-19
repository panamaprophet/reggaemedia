import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getSelection, $isRangeSelection, KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_HIGH, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_LOW } from 'lexical';
import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { getSelectedNode } from '../helpers';
import { InputText } from '@/components/Input/InputText';
import { Button } from '@/components/Button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


const FloatingLinkEditor = () => {
    const [editor] = useLexicalComposerContext();
    const [linkUrl, setLinkUrl] = useState('');
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updateLinkEditor = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const parent = node.getParent();
                if ($isLinkNode(parent)) {
                    setLinkUrl(parent.getURL());
                } else if ($isLinkNode(node)) {
                    setLinkUrl(node.getURL());
                } else {
                    setLinkUrl('');
                }
            }

            const nativeSelection = window.getSelection();

            if (!nativeSelection) {
                return;
            }

            const selectionOffset = window.getSelection()?.getRangeAt(0)?.getClientRects()?.[0];
 
            if (!selectionOffset) {
                return;
            }
            const top = selectionOffset.top + selectionOffset.height;
            const left = selectionOffset.left;

            setPosition({ top, left });
        });
    
        return true;
    }, [editor]);

    useRegisterCommand(KEY_ESCAPE_COMMAND, () => true, COMMAND_PRIORITY_HIGH);

    useRegisterCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
            updateLinkEditor();

            return false;
        },
        COMMAND_PRIORITY_LOW,
    );

    useEffect(() => {
        window.addEventListener('resize', updateLinkEditor);
        window.addEventListener('scroll', updateLinkEditor);
    
        return () => {
            window.removeEventListener('resize', updateLinkEditor);
            window.removeEventListener('scroll', updateLinkEditor);
        };
    }, [updateLinkEditor]);

    useRegisterListener('onUpdate', updateLinkEditor);
    
    useLayoutEffect(() => { updateLinkEditor() }, [updateLinkEditor]);

    const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            handleLinkSubmission();
        }
    };

    const handleLinkSubmission = () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);

    return (
        <div
            className="
                flex
                fixed
                py-2
                px-2
                items-center
                justify-center
                gap-2
                border
                rounded
                bg-white
            "
            style={position}
        >
            <InputText
                className="p-2 border rounded"
                value={linkUrl}
                onChange={setLinkUrl}
                onKeyDown={onKeydown}
            />
            <Button
                type="secondary"
                onClick={handleLinkSubmission}
            >
                Сохранить
            </Button>
        </div>
    );
}

export default FloatingLinkEditor;
