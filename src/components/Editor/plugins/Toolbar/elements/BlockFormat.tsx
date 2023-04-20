import { blockTypeToBlockName } from '@/components/Editor/settings';
import { Heading1, Heading2, Heading3, OrderList, Paragraph as ParagraphIcon, UnorderList } from '@/components/Icons/Formatting';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useState } from 'react';
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isListNode, ListNode } from '@lexical/list';
import { $getSelection, $isRangeSelection, $isRootOrShadowRoot } from 'lexical';
import {
  formatParagraph,
  formatQuote,
  formatHeading,
  formatBulletList,
  formatCheckList,
  formatNumberedList,
} from './formatters';
import { useMergeRegister, useSelectionChangeCommand } from '@/components/Editor/hooks/useLexicalHooks';
import { EditorEntity } from '@/components/Editor/types';


export const BlockFormatDropDown = () => {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setEditable] = useState(editor.isEditable());
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph');

  const $updateBlockStyle = useCallback(({ editorState }: EditorEntity) => {
    editorState.read(() => {
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
    })

    return false;
  }, [editor])

  useMergeRegister({ onEdit: setEditable, onUpdate: $updateBlockStyle });
  useSelectionChangeCommand($updateBlockStyle);

  return (
    <DropDown
      disabled={!isEditable}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style"
    >
      <DropDownItem
        isActive={blockType === 'paragraph'}
        onClick={() => formatParagraph(editor)}>
        <ParagraphIcon size={15} />
        <span className="text whitespace-nowrap">Paragraph</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h1'}
        onClick={() => formatHeading(editor, 'h1', blockType)}
      >
        <Heading1 size={15} />
        <span className="text whitespace-nowrap">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h2'}
        onClick={() => formatHeading(editor, 'h2', blockType)}
      >
        <Heading2 size={15} />
        <span className="text whitespace-nowrap">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'h3'}
        onClick={() => formatHeading(editor, 'h3', blockType)}
      >
        <Heading3 size={15} />
        <span className="text whitespace-nowrap">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'bullet'}
        onClick={() => formatBulletList(editor, blockType)}
      >
        <UnorderList size={15} />
        <span className="text whitespace-nowrap">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'number'}
        onClick={() => formatNumberedList(editor, blockType)}
      >
        <OrderList size={15} />
        <span className="text whitespace-nowrap">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'check'}
        onClick={() => formatCheckList(editor, blockType)}
      >
        <span className="text whitespace-nowrap">Check List</span>
      </DropDownItem>
      <DropDownItem
        isActive={blockType === 'quote'}
        onClick={() => formatQuote(editor, blockType)}
      >
        <span className="text whitespace-nowrap">Quote</span>
      </DropDownItem>
    </DropDown>
  );
}
