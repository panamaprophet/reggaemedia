import type { EditorConfig, LexicalNode, SerializedLexicalNode, Spread, NodeKey } from 'lexical';

import { DecoratorNode } from 'lexical';
import { ImageComponent } from './Component';

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    altText: string;
    id: string;
    src: string;
    key?: NodeKey;
    width?: Dimension;
    height?: Dimension;
    maxWidth?: number;
}

type SerializedImageNode = Spread<
    {
        version: 1;
        type: 'image';
        id: string;
        src: string;
        altText: string;
        maxWidth: number;
        height?: number;
        width?: number;
    },
    SerializedLexicalNode
>;


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt: altText, src, id } = domNode;

        return {
            node: new ImageNode({ altText, src, id })
        };
    }
    return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    props: ImagePayload;

    static getType() {
        return 'image';
    }

    static clone(node: ImageNode) {
        return new ImageNode({
            ...node.props,
            width: node.props.width || 'inherit',
            height: node.props.height || 'inherit',
        });
    }

    static importJSON(serializedNode: SerializedImageNode) {
        return new ImageNode({
            id: serializedNode.id,
            altText: serializedNode.altText,
            height: serializedNode.height,
            maxWidth: serializedNode.maxWidth,
            src: serializedNode.src,
            width: serializedNode.width
        });
    }

    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.props.src);
        element.setAttribute('alt', this.props.altText);
        return { element };
    }

    static importDOM() {
        return {
            img: () => ({
                conversion: convertImageElement,
                priority: 0
            })
        };
    }

    constructor(props: ImagePayload) {
        super(props.key);
        this.props = props;
    }

    exportJSON() {
        return {
            ...this.props,
            version: 1,
            type: 'image',
            width: this.props.width === 'inherit' ? 0 : this.props.width,
            height: this.props.height === 'inherit' ? 0 : this.props.height,
        };
    }

    setWidthAndHeight(width: Dimension, height: Dimension) {
        const writable = this.getWritable();
        writable.props.width = width;
        writable.props.height = height;
    }

    createDOM(config: EditorConfig) {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }

    updateDOM() {
        return false;
    }

    decorate() {
        return (
            <ImageComponent
                src={this.props.src}
                altText={this.props.altText}
                width={this.props.width || 'inherit'}
                height={this.props.height || 'inherit'}
                maxWidth={this.props.maxWidth || 500}
                nodeKey={this.getKey()}
                resizable={true}
            />
        );
    }
}

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => node instanceof ImageNode;
