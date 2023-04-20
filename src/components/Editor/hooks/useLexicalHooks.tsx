import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { Dispatch, SetStateAction, useEffect } from "react"
import { CustomUpdateListener } from "../types";


interface Props {
    onEdit: Dispatch<SetStateAction<boolean>>,
    onUpdate: CustomUpdateListener,
}

export const useMergeRegister = ({ onEdit, onUpdate }: Props) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener(onEdit),
            editor.registerUpdateListener(onUpdate),
        );
    }, [editor, onEdit, onUpdate]);
};

export const useSelectionChangeCommand = (callback: CustomUpdateListener) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            callback,
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor, callback]);
};
