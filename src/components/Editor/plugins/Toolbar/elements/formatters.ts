import { INSERT_CHECK_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { blockTypeToBlockName } from '@/components/Editor/settings';

type BlockTypeKey = keyof typeof blockTypeToBlockName;

export const formatParagraph = (editor: LexicalEditor) => {
    editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
        }
    });
};

export const formatQuote = (editor: LexicalEditor, blockType: BlockTypeKey) => {
    if (blockType !== 'quote') {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createQuoteNode());
                console.log('should create Quote node')
            }
        });
    }
};

export const formatHeading = (editor: LexicalEditor, headingSize: HeadingTagType, blockType: BlockTypeKey) => {
    if (blockType !== headingSize) {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(headingSize));
            }
        });
    }
};

export const formatBulletList = (editor: LexicalEditor, blockType: BlockTypeKey) => {
    if (blockType !== 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
};

export const formatCheckList = (editor: LexicalEditor, blockType: BlockTypeKey) => {
    if (blockType !== 'check') {
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
};

export const formatNumberedList = (editor: LexicalEditor, blockType: BlockTypeKey) => {
    if (blockType !== 'number') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
};
