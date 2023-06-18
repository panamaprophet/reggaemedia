import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { getSelectedNode } from '@/helpers';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { LexicalEditor, $getSelection, $isRangeSelection, KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_HIGH, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_LOW } from 'lexical';
import { Dispatch, useRef, useState, useCallback, useEffect } from 'react';

interface Props {
    editor: LexicalEditor;
    isLink: boolean;
    setIsLink: Dispatch<boolean>;
}

const FloatingLinkEditor = ({ editor, isLink, setIsLink }: Props) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState('');
    const [{ top, left, height }, setSelectedNode] = useState({
        top: 0,
        left: 0,
        height: 0,
    });
    const { x = 0, y = 0 } = editor.getRootElement()?.getBoundingClientRect() || {};


    const updateLinkEditor = useCallback(() => {
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

        const domRect = nativeSelection.focusNode?.parentElement?.getBoundingClientRect();

        if (!domRect) {
            return;
        }

        setSelectedNode({
            top: domRect.top,
            left: domRect.left,
            height: domRect.height,
        });

        return true;
    }, []);

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

    useRegisterCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
            updateLinkEditor();

            return false;
        },
        COMMAND_PRIORITY_LOW,
    );

    useEffect(() => {
        const update = () => {
            editor.getEditorState().read(() => {
                updateLinkEditor();
            });
        };
    
        window.addEventListener('resize', update);
    
        return () => {
            window.removeEventListener('resize', update);
        };
    }, [editor, updateLinkEditor]);

    useRegisterListener('onUpdate', editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
            updateLinkEditor();
        });
    }));

    const monitorInputInteraction = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
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
            style={{ top: top - y + height, left: left - x }}
        >
            <input
                ref={inputRef}
                className="p-2 border rounded"
                value={linkUrl}
                onChange={(event) => {
                    setLinkUrl(event.target.value);
                }}
                onKeyDown={(event) => {
                    monitorInputInteraction(event);
                }}
            />
            <button className="p-2 border rounded" onClick={handleLinkSubmission}>
                        Сохранить
            </button>
        </div>
    ) : null;
}

export default FloatingLinkEditor;
