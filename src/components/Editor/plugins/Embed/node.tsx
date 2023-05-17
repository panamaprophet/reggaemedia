import type { ElementFormatType, LexicalNode, NodeKey } from 'lexical';

import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { EmbedComponent } from './Component';

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    alt: string;
    thumbnail: string;
    embedUrl?: string;
    key?: NodeKey;
    width: number;
    height: number;
    contentType: 'instagram' | 'soundcloud' | 'youtube' | 'image',
}

export type SerializedImageNode = {
    version: 1;
    type: 'embed';
    format: ElementFormatType,
    thumbnail: string;
    alt: string;
    contentType: 'instagram' | 'soundcloud' | 'youtube' | 'image',
    height: number;
    width: number;
};


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt, src, width, height } = domNode;

        return {
            node: new EmbedNode({ alt, thumbnail: src, width, height, contentType: 'image' })
        };
    }
    return null;
}

export class EmbedNode extends DecoratorBlockNode {
    props: Required<Omit<ImagePayload, 'key'>>;

    static getType() {
        return 'embed';
    }

    static clone(node: EmbedNode) {
        return new EmbedNode(node.props);
    }

    static importJSON(serializedNode: SerializedImageNode) {
        return new EmbedNode(serializedNode);
    }

    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.props.thumbnail);
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

    constructor(props: ImagePayload, format?: ElementFormatType, key?: NodeKey) {
        super(format, key);
        this.props = {
            ...props,
            embedUrl: props.embedUrl || '',
        };
    }

    exportJSON() {
        return {
            ...this.props,
            version: 1,
            type: 'embed',
            format: this.__format
        };
    }

    setWidthAndHeight(width: number, height: number) {
        const writable = this.getWritable();
        writable.props.width = width;
        writable.props.height = height;
    }

    setSrc(src: string) {
        const writable = this.getWritable();
        writable.props.thumbnail = src;
    }

    setEmbedUrl(url: string) {
        const writable = this.getWritable();
        writable.props.embedUrl = url;
    }

    updateDOM(): false {
        return false;
    }

    decorate() {
        return (
            <EmbedComponent
                src={this.props.thumbnail}
                alt={this.props.alt}
                width={this.props.width}
                height={this.props.height}
                format={this.__format}
                contentType={this.props.contentType}
                nodeKey={this.getKey()}
                resizable={true}
            />
        );
    }
}

export const $isEmbedNode = (node: LexicalNode | null | undefined): node is EmbedNode => node instanceof EmbedNode;
