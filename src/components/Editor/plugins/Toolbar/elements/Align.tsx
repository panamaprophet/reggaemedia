import { AlignCenter } from "@/components/Icons/Align/AlignCenter";
import { AlignJustify } from "@/components/Icons/Align/AlignJustify";
import { AlignLeft } from "@/components/Icons/Align/AlignLeft";
import { AlignRight } from "@/components/Icons/Align/AlignRight";
import { DropDown, DropDownItem } from "@/components/Editor/elements/DropDown";
import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


export const Align = () => {
    const [editor] = useLexicalComposerContext();
    const isEditable = editor.isEditable();

    return (
        <DropDown
            disabled={!isEditable}
            ButtonIconComponent={<AlignLeft size={15} />}
            buttonAriaLabel="Formatting options for text alignment"
        >
            <DropDownItem
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'left',
                    );
                }}
            >
                <AlignLeft size={15} />
                <span>Left Align</span>
            </DropDownItem>
            <DropDownItem
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'center',
                    );
                }}>
                <AlignCenter size={15} />
                <span>Center Align</span>
            </DropDownItem>
            <DropDownItem
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'right',
                    );
                }}
            >
                <AlignRight size={15} />
                <span>Right Align</span>
            </DropDownItem>
            <DropDownItem
                onClick={() => {
                    editor.dispatchCommand(
                        FORMAT_ELEMENT_COMMAND,
                        'justify',
                    );
                }}
            >
                <AlignJustify size={15} />
                <span>Justify Align</span>
            </DropDownItem>
        </DropDown>
    )
}
