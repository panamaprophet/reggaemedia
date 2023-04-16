import { $isLinkNode } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_CRITICAL,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { BlockFormatDropDown } from './elements/Heading';
import { FontDropDown } from './elements/FontDropDown';
import { blockTypeToBlockName } from '../../settings';
import { UndoRedo } from './elements/UndoRedo';
import { Format } from './elements/Format';
import { Align } from './elements/Align';
import { Image } from './elements/Image';

const IS_APPLE = false;

export const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [blockType, setBlockType] =
        useState<keyof typeof blockTypeToBlockName>('paragraph');

    const [fontSize, setFontSize] = useState<string>('15px');
    const [fontFamily, setFontFamily] = useState<string>('Arial');

    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const [canUndo, setUndo] = useState(false);
    const [canRedo, setRedo] = useState(false);

    const [isEditable, setIsEditable] = useState(() => editor.isEditable());

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            // BELOW IS A NODE OBJECT, IF NOT NULL, THAT CONTAINS: TYPE, NEXT, PREV etc
            let element =
                anchorNode.getKey() === 'root'
                    ? anchorNode
                    : $findMatchingParent(anchorNode, (e) => {
                        const parent = e.getParent();
                        return parent !== null && $isRootOrShadowRoot(parent);
                    });

            if (element === null) {
                element = anchorNode.getTopLevelElementOrThrow();
            }

            // elementKey IS A HISTORY NUMBER OF OBJECT ABOVE
            const elementKey = element.getKey();
            // DOM ELEMENT OF CURRENT NODE
            const elementDOM = activeEditor.getElementByKey(elementKey);

            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));

            // Update links
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            if ($isLinkNode(parent) || $isLinkNode(node)) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }


            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType<ListNode>(
                        anchorNode,
                        ListNode,
                    );

                    const type = parentList
                        ? parentList.getListType()
                        : element.getListType();

                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    if (type in blockTypeToBlockName) {
                        setBlockType(type as keyof typeof blockTypeToBlockName);
                    }
                }
            }

            // Handle font
            setFontSize(
                $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
            );
            setFontFamily(
                $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
            );
        }
    }, [activeEditor]);

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
                $updateToolbar();
                setActiveEditor(newEditor);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor, $updateToolbar]);

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener((editable) => {
                setIsEditable(editable);
            }),
            // EMITS UPDATE ON EVERY INTERACTION WITH EDITOR INCLUDING FOCUS AND ETC
            activeEditor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
        );
    }, [$updateToolbar, activeEditor, editor]);

    return (
        <div className="flex items-center justify-between p-1 sticky">
            <UndoRedo
                editor={activeEditor}
                canUndo={canUndo}
                canRedo={canRedo}
                isEditable={isEditable}
                IS_APPLE={IS_APPLE}
                setCanUndo={() => setUndo(!canUndo)}
                setCanRedo={() => setRedo(!canRedo)}
            />
            {blockType in blockTypeToBlockName && activeEditor === editor && (
                <BlockFormatDropDown
                    disabled={!isEditable}
                    blockType={blockType}
                    editor={editor}
                />
            )}
            <FontDropDown
                disabled={!isEditable}
                style={'font-family'}
                value={fontFamily}
                editor={editor}
            />
            <FontDropDown
                disabled={!isEditable}
                style={'font-size'}
                value={fontSize}
                editor={editor}
            />
            <Format editor={editor} IS_APPLE={IS_APPLE} isEditable={isEditable} isBold={isBold} isItalic={isItalic} isUnderline={isUnderline} isLink={isLink} />
            <Align editor={activeEditor} isEditable={isEditable} />
            <Image />
        </div>
    );
};
