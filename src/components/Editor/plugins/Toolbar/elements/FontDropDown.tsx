import { useCallback, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";

import { FONT_SIZE_OPTIONS } from "@/components/Editor/settings";
import { DropDown, DropDownItem } from "@/components/Editor/elements/DropDown";
import { useSelectionChangeCommand, useMergeRegister } from "@/components/Editor/hooks/useLexicalHooks";
import { EditorEntity } from "@/components/Editor/types";


export const FontSizeDropDown = () => {
    const [editor] = useLexicalComposerContext();
    const [fontSize, setFontSize] = useState<string>('15px');
    const [isEditable, setEditable] = useState(editor.isEditable());

    const handleClick = useCallback(
        (option: string) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, {
                        'font-size': option,
                    });
                }
            });
        },
        [editor],
    );

    const $updateFontSize = useCallback(({ editorState }: EditorEntity) => {
        editorState.read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setFontSize(
                    $getSelectionStyleValueForProperty(selection, 'font-size', '16px')
                );
            }
        });

        return false;
    }, []);


    useSelectionChangeCommand($updateFontSize);
    useMergeRegister({ onEdit: setEditable, onUpdate: $updateFontSize });

    return (
        <DropDown
            disabled={!isEditable}
            buttonLabel={fontSize}
            buttonAriaLabel="Formatting options for font size"
        >
            {(FONT_SIZE_OPTIONS).map(
                ([option, text]) => (
                    <DropDownItem
                        isActive={'font-size' === option}
                        onClick={() => handleClick(option)}
                        key={option}>
                        <span className="text">{text}</span>
                    </DropDownItem>
                ),
            )}
        </DropDown>
    );
}
