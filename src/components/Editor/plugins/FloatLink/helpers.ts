import { $isAtNodeEnd } from '@lexical/selection';
import { RangeSelection } from 'lexical';

export const getSelectedNode = (selection: RangeSelection) => {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
        return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
        return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
        return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
}

export const getCurrentSelectionOffset = () => {
    const offset = window.getSelection()?.getRangeAt(0)?.getClientRects()?.[0];

    if (!offset) {
        return { top: 0, left: 0 };
    }

    return {
        top: offset.top + offset.height,
        left: offset.left,
    };
};
