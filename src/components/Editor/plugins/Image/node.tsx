import type { EditorConfig, LexicalNode, NodeKey } from 'lexical';

import { DecoratorNode } from 'lexical';
import { ImageComponent } from './Component';

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    alt: string;
    id: string;
    src: string;
    key?: NodeKey;
    width?: number;
    height?: number;
}

export type SerializedImageNode = {
    version: 1;
    type: 'image';
    id: string;
    src: string;
    alt: string;
    height: number;
    width: number;
};


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt, src, id } = domNode;

        return {
            node: new ImageNode({ alt, src, id })
        };
    }
    return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    props: Required<Omit<ImagePayload, 'key'>>;

    static getType() {
        return 'image';
    }

    static clone(node: ImageNode) {
        return new ImageNode(node.props);
    }

    static importJSON(serializedNode: SerializedImageNode) {
        return new ImageNode(serializedNode);
    }

    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.props.src);
        element.setAttribute('alt', this.props.alt);
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
        this.props = {
            ...props,
            width: props.width || 300,
            height: props.height || 300,
        };
    }

    exportJSON() {
        return {
            ...this.props,
            version: 1,
            type: 'image',
        };
    }

    setWidthAndHeight(width: number, height: number) {
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
                alt={this.props.alt}
                width={this.props.width}
                height={this.props.height}
                nodeKey={this.getKey()}
                resizable={true}
            />
        );
    }
}

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => node instanceof ImageNode;
