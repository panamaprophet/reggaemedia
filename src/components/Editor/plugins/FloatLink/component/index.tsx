import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { getSelectedNode } from '@/helpers';
import { sanitizeUrl } from '@/helpers/url';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { LexicalEditor, RangeSelection, GridSelection, NodeSelection, $getSelection, $isRangeSelection, KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { Dispatch, useRef, useState, useCallback } from 'react';

interface Props {
    editor: LexicalEditor;
    isLink: boolean;
    setIsLink: Dispatch<boolean>;
}

const FloatingLinkEditor = ({ editor, isLink, setIsLink }: Props) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState('');
    const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
  >(null);
    const [{ bottom, left }, setSelectedNode] = useState({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

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

        const editorElem = editorRef.current;
        const nativeSelection = window.getSelection();

        if (editorElem === null) {
            return;
        }

        const domRect: DOMRect | undefined = nativeSelection?.anchorNode?.parentElement?.getBoundingClientRect();

        setSelectedNode({
            top: domRect?.top || 0,
            right: domRect?.right || 0,
            bottom: domRect?.bottom || 0,
            left: domRect?.left || 0,
        });

        setLastSelection(selection);

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

    useRegisterListener('onUpdate', editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
            updateLinkEditor();
        });
    }))

    const monitorInputInteraction = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLinkSubmission();
        }
    };

    const handleLinkSubmission = () => {
        if (lastSelection !== null) {
            if (linkUrl !== '') {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl));
            }
        }
    };

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
            style={{ top: bottom, left }}
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
