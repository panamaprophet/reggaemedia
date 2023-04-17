import { FONT_FAMILY_OPTIONS, FONT_SIZE_OPTIONS } from "@/components/Editor/settings";
import { Font } from "@/components/Icons/Font";
import { DropDown, DropDownItem } from "@/components/Editor/elements/DropDown";
import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useCallback } from "react";

export const FontDropDown = ({
    editor,
    value,
    style,
    disabled = false,
}: {
    editor: LexicalEditor;
    value: string;
    style: string;
    disabled?: boolean;
}) => {
    const isFontFamily = style === 'font-family'

    const handleClick = useCallback(
        (option: string) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, {
                        [style]: option,
                    });
                }
            });
        },
        [editor, style],
    );

    const buttonAriaLabel =
        isFontFamily
            ? 'Formatting options for font family'
            : 'Formatting options for font size';

    return (
        <DropDown
            disabled={disabled}
            buttonLabel={value}
            ButtonIconComponent={isFontFamily ? <Font size={15} /> : null}
            buttonAriaLabel={isFontFamily ? '' : buttonAriaLabel}>
            {(isFontFamily ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
                ([option, text]) => (
                    <DropDownItem
                        isActive={value === option}
                        onClick={() => handleClick(option)}
                        key={option}>
                        <span className="text">{text}</span>
                    </DropDownItem>
                ),
            )}
        </DropDown>
    );
}
