import { useState } from 'react';
import { $getSelection, ElementFormatType, FORMAT_ELEMENT_COMMAND, LexicalNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { AlignCenter } from '@/components/Icons/Align/AlignCenter';
import { AlignJustify } from '@/components/Icons/Align/AlignJustify';
import { AlignLeft } from '@/components/Icons/Align/AlignLeft';
import { AlignRight } from '@/components/Icons/Align/AlignRight';


const formatTypeToIconMap = {
    'left': AlignLeft,
    'center': AlignCenter,
    'right': AlignRight,
    'justify': AlignJustify,
    'start': AlignLeft,
    'end': AlignRight,
    '': AlignLeft,
};

const $getFormatType = (node?: LexicalNode) => {
    let format: ElementFormatType;

    if (!node) {
        return 'left';
    }

    if ('getFormatType' in node) {
        format = node.getFormatType();
    } else {
        format = node.getCommonAncestor(node)?.getFormatType() || 'left';
    }

    return format;
};


export const Align = () => {
    const [editor] = useLexicalComposerContext();
    const [CurrentIcon, setCurrentIcon] = useState(() => AlignLeft);

    const updateCurrentIcon = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            const node = selection?.getNodes()[0];
            const formatType = $getFormatType(node);

            setCurrentIcon(() => formatTypeToIconMap[formatType]);
        });
    };

    useRegisterListener('onUpdate', updateCurrentIcon);

    return (
        <DropDown
            disabled={!editor.isEditable()}
            ButtonIconComponent={<CurrentIcon />}
            buttonAriaLabel="Formatting options for text alignment"
        >
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}>
                <AlignLeft />
                Left Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}>
                <AlignCenter />
                Center Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}>
                <AlignRight />
                Right Align
            </DropDownItem>
            <DropDownItem onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}>
                <AlignJustify />
                Justify Align
            </DropDownItem>
        </DropDown>
    )
}
