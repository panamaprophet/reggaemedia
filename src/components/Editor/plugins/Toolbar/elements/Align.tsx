import { AlignCenter } from '@/components/Icons/Align/AlignCenter';
import { AlignJustify } from '@/components/Icons/Align/AlignJustify';
import { AlignLeft } from '@/components/Icons/Align/AlignLeft';
import { AlignRight } from '@/components/Icons/Align/AlignRight';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';


export const Align = () => {
    const [editor] = useLexicalComposerContext();
    const isEditable = editor.isEditable();

    return (
        <DropDown
            disabled={!isEditable}
            ButtonIconComponent={<AlignLeft />}
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
