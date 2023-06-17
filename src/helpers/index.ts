import { Article } from '@/types';
import { $isAtNodeEnd } from '@lexical/selection';
import { RangeSelection } from 'lexical';


export const cx = (...classes: unknown[]) =>
    classes
        .filter(Boolean)
        .filter(value => typeof value !== 'object')
        .join(' ');

export const getCurrentYear = () => new Date().getFullYear();

export const sortByDate = (a: Article, b: Article) => (b.updatedOn || b.createdOn) - (a.updatedOn || a.createdOn);

export const removeByIndex = <T,>(index: number, items: T[]) => items.filter((_, itemIndex) => itemIndex !== index);

export const setByIndex = <T,>(index: number, value: T, items: T[]) => items.map((item, itemIndex) => itemIndex === index ? value : item);

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
