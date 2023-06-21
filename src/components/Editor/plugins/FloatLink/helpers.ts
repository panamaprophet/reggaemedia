import { LinkNode, $isLinkNode } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';
import { ElementNode, RangeSelection, TextNode } from 'lexical';

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

export const getLinkNode  = (node: TextNode | ElementNode): LinkNode | null => {
    if ($isLinkNode(node)) {
        return node;
    }

    if ($isLinkNode(node.getParent())) {
        return node.getParent();
    }

    return null;
}
