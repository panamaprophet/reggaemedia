import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { LexicalEditor, $getSelection, $isRangeSelection, KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { Dispatch, useRef, useState, useCallback, useEffect } from 'react';
import { getSelectedNode } from '../helpers';

interface Props {
    editor: LexicalEditor;
    isLink: boolean;
    setIsLink: Dispatch<boolean>;
}

const FloatingLinkEditor = ({ editor, isLink, setIsLink }: Props) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState('');
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

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

            const selectionOffset = nativeSelection?.anchorNode?.parentElement?.getBoundingClientRect();
            const editorOffset = editor.getRootElement()?.parentElement?.getBoundingClientRect();
            if (!selectionOffset || !editorOffset) {
                return;
            }

            const top = selectionOffset.top - editorOffset.top + selectionOffset.height;
            const left = selectionOffset.left - editorOffset.left;

            setPosition({ top, left });

        });
    
        return true;
    }, [editor]);

    useRegisterCommand(
        KEY_ESCAPE_COMMAND,
        () => {
            if (isLink) {
                setIsLink(false);
                return true;
            }
            return false;
        },
        COMMAND_PRIORITY_HIGH,
    );

    useEffect(() => {
        window.addEventListener('resize', updateLinkEditor);
    
        return () => window.removeEventListener('resize', updateLinkEditor);
    }, [updateLinkEditor]);

    useRegisterListener('onUpdate', updateLinkEditor);

    const onKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            handleLinkSubmission();
        }
    };

    const handleLinkSubmission = () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);

    return isLink ? (
        <div
            ref={editorRef} 
            className="
                    flex
                    absolute
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
            <input
                ref={inputRef}
                className="p-2 border rounded"
                value={linkUrl}
                onChange={(event) => {
                    setLinkUrl(event.target.value);
                }}
                onKeyDown={onKeydown}
            />
            <button className="p-2 border rounded" onClick={handleLinkSubmission}>
                        Сохранить
            </button>
        </div>
    ) : null;
}

export default FloatingLinkEditor;
