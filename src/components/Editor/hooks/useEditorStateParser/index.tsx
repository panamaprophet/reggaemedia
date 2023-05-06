import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import Image from 'next/image';
import { cx } from '@/helpers';
import {
    getAlign,
    getTagByType,
    getTextStyle,
    isElementNode,
    isHeading,
    isImage,
    isLink,
    isText,
} from './helpers';


const getClassName = (node: SerializedLexicalNode, theme: EditorThemeClasses) => {
    const align = isElementNode(node) && getAlign(node.format);
    const style = isText(node) && getTextStyle(node.format);
    const className = cx(align, style, isHeading(node) ? theme.heading?.[node.tag] : theme[node.type]);

    return className;
};


export const useEditorStateParser = (
    { root }: SerializedEditorState,
    { theme }: { theme: EditorThemeClasses },
) => {
    let key = 0;

    const convertToHtml = (node: SerializedLexicalNode) => {
        const props = {
            key: key++,
            className: getClassName(node, theme),
            children: isElementNode(node) ? node.children.map(convertToHtml) : null,
        };

        const Tag = isHeading(node) ? node.tag : getTagByType(node.type);

        if (isLink(node)) {
            Object.assign(props, { href: node.url });
        }

        if (isText(node) && !props.className) {
            return node.text;
        }

        if (isImage(node)) {
            const { alt, ...rest } = node;

            return <Image alt={alt} {...props} {...rest} />;
        }

        return <Tag {...props} />;
    };

    return convertToHtml(root);
};
