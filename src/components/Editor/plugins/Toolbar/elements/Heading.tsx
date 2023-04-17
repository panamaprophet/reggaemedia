import { blockTypeToBlockName, dropDownActiveClass } from '@/components/Editor/settings';
import { Heading1 } from '@/components/Icons/Formatting/Heading1';
import { Heading2 } from '@/components/Icons/Formatting/Heading2';
import { Heading3 } from '@/components/Icons/Formatting/Heading3';
import { OrderList } from '@/components/Icons/Formatting/OrderList';
import { Paragraph } from '@/components/Icons/Formatting/Paragraph';
import { UnorderList } from '@/components/Icons/Formatting/UnorderList';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';

export const BlockFormatDropDown = ({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
}) => {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
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

  return (
    <DropDown
      disabled={disabled}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style">
      <DropDownItem
        isActive={blockType === 'paragraph'}
        onClick={formatParagraph}>
        <Paragraph size={15} />
        <span className="text whitespace-nowrap">Normal</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h1'}
        onClick={() => formatHeading('h1')}
      >
        <Heading1 size={15} />
        <span className="text whitespace-nowrap">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h2'}
        onClick={() => formatHeading('h2')}
      >
        <Heading2 size={15} />
        <span className="text whitespace-nowrap">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h3'}
        onClick={() => formatHeading('h3')}
      >
        <Heading3 size={15} />
        <span className="text whitespace-nowrap">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'bullet'}
        onClick={formatBulletList}
      >
        <UnorderList size={15} />
        <span className="text whitespace-nowrap">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'number'}
        onClick={formatNumberedList}
      >
        <OrderList size={15} />
        <span className="text whitespace-nowrap">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'check'}
        onClick={formatCheckList}
      >
        <span className="text whitespace-nowrap">Check List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'quote'}
        onClick={formatQuote}
      >
        <span className="text whitespace-nowrap">Quote</span>
      </DropDownItem>
    </DropDown>
  );
}
