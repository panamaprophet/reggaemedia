import type { EditorConfig, LexicalNode, NodeKey } from 'lexical';

import { DecoratorNode } from 'lexical';
import { ImageComponent } from './Component';

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    alt: string;
    src: string;
    embedUrl?: string;
    key?: NodeKey;
    width: number;
    height: number;
    content: 'instagram' | 'soundcloud' | 'youtube' | 'image',
}

export type SerializedImageNode = {
    version: 1;
    type: 'image';
    src: string;
    alt: string;
    content: 'instagram' | 'soundcloud' | 'youtube' | 'image',
    height: number;
    width: number;
};


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt, src, width, height } = domNode;

        return {
            node: new ImageNode({ alt, src, width, height, content: 'image' })
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
        const { key, ...rest } = props;

        super(key);
        this.props = {
            ...rest,
            embedUrl: rest.embedUrl || '',
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

    setSrc(src: string) {
        const writable = this.getWritable();
        writable.props.src = src;
    }

    setEmbedUrl(url: string) {
        const writable = this.getWritable();
        writable.props.embedUrl = url;
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
                content={this.props.content}
                nodeKey={this.getKey()}
                resizable={true}
            />
        );
    }
}

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => node instanceof ImageNode;
