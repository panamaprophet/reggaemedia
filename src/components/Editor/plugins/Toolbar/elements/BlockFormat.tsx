import { blockTypeToBlockName } from '@/components/Editor/settings';
import { Heading1 } from '@/components/Icons/Heading1';
import { Heading2 } from '@/components/Icons/Heading2';
import { Heading3 } from '@/components/Icons/Heading3';
import { OrderList } from '@/components/Icons/OrderList';
import { UnorderedList } from '@/components/Icons/UnorderedList';
import { Paragraph as ParagraphIcon } from '@/components/Icons/Paragraph';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useState } from 'react';
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isListNode, ListNode } from '@lexical/list';
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot, SELECTION_CHANGE_COMMAND } from 'lexical';
import {
    formatParagraph,
    formatQuote,
    formatHeading,
    formatBulletList,
    formatCheckList,
    formatNumberedList,
} from './formatters';
import { useRegisterCommandCritical } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';


export const BlockFormatDropDown = () => {
    const [editor] = useLexicalComposerContext();
    const [isEditable, setEditable] = useState(editor.isEditable());
    const [blockType, setBlockType] =
        useState<keyof typeof blockTypeToBlockName>('paragraph');

    const $updateBlockStyle = useCallback(() =>
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const anchorNode = selection.anchor.getNode();
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

                const elementKey = element.getKey();
                const elementDOM = editor.getElementByKey(elementKey);

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
            }

            return false;
        }), [editor]);

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateBlockStyle);
    useRegisterCommandCritical(SELECTION_CHANGE_COMMAND, $updateBlockStyle);

    return (
        <DropDown
            disabled={!isEditable}
            buttonLabel={blockTypeToBlockName[blockType]}
            buttonAriaLabel="Formatting options for text style"
        >
            <DropDownItem
                isActive={blockType === 'paragraph'}
                onClick={() => formatParagraph(editor)}>
                <ParagraphIcon />
                Paragraph
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'h1'}
                onClick={() => formatHeading(editor, 'h1', blockType)}
            >
                <Heading1 />
                Heading 1
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'h2'}
                onClick={() => formatHeading(editor, 'h2', blockType)}
            >
                <Heading2 />
                Heading 2
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'h3'}
                onClick={() => formatHeading(editor, 'h3', blockType)}
            >
                <Heading3 />
                Heading 3
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'bullet'}
                onClick={() => formatBulletList(editor, blockType)}
            >
                <UnorderedList />
                Bullet List
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'number'}
                onClick={() => formatNumberedList(editor, blockType)}
            >
                <OrderList />
                Numbered List
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'check'}
                onClick={() => formatCheckList(editor, blockType)}
            >
                Check List
            </DropDownItem>
            <DropDownItem
                isActive={blockType === 'quote'}
                onClick={() => formatQuote(editor, blockType)}
            >
                Quote
            </DropDownItem>
        </DropDown>
    );
}
