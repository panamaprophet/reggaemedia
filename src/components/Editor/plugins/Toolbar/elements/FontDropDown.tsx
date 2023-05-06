import { useCallback, useState } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';

import { FONT_SIZE_OPTIONS } from '@/components/Editor/settings';
import { DropDown, DropDownItem } from '@/components/Editor/elements/DropDown';
import { useRegisterCommandCritical } from '@/components/Editor/hooks/useRegisterCommand';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';


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

    const $updateFontSize = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setFontSize(
                    $getSelectionStyleValueForProperty(selection, 'font-size', '16px')
                );
            }
        });

        return false;
    }, [editor]);


    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateFontSize);
    useRegisterCommandCritical(SELECTION_CHANGE_COMMAND, $updateFontSize);

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
