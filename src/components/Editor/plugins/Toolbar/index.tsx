import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import { BlockFormatDropDown } from './elements/BlockFormat';
import { FontDropDown } from './elements/FontDropDown';
import { UndoRedo } from './elements/UndoRedo';
import { Align } from './elements/Align';
import { Image } from './elements/Image';
import { Bold, Italic, Link, Underline } from './elements/Formatting';


export const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [fontSize, setFontSize] = useState<string>('15px');
    const [fontFamily, setFontFamily] = useState<string>('Arial');
    const [isEditable, setIsEditable] = useState(() => editor.isEditable());


    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setFontSize(
                $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
            );
            setFontFamily(
                $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
            );
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener((editable) => {
                setIsEditable(editable);
            }),
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
        );
    }, [$updateToolbar, editor]);

    return (
        <div className="flex items-center justify-between p-1 sticky">
            <UndoRedo />
            <BlockFormatDropDown />
            <FontDropDown
                disabled={!isEditable}
                style={'font-family'}
                value={fontFamily}
                editor={editor}
            />
            <FontDropDown
                disabled={!isEditable}
                style={'font-size'}
                value={fontSize}
                editor={editor}
            />
            <Bold />
            <Italic />
            <Underline />
            <Link />
            <Align />
            {/* eslint-disable-next-line */}
            <Image />
        </div>
    );
};
