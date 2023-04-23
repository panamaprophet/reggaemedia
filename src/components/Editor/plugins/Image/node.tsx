import type {
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    SerializedEditor,
    SerializedLexicalNode,
    Spread,
    NodeKey
} from 'lexical';

import { createEditor, DecoratorNode } from 'lexical';
import { ImageComponent } from './Component';

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    altText: string;
    src: string;
    key?: NodeKey;
    width?: Dimension;
    height?: Dimension;
    maxWidth?: number;
    showCaption?: boolean;
    caption?: LexicalEditor;
    captionsEnabled?: boolean;
}

type SerializedImageNode = Spread<
    {
        altText: string;
        caption: SerializedEditor;
        height?: number;
        maxWidth: number;
        showCaption: boolean;
        src: string;
        width?: number;
        type: 'image';
        version: 1;
    },
    SerializedLexicalNode
>;


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt: altText, src } = domNode;

        return {
            node: new ImageNode({ altText, src })
        };
    }
    return null;
}

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __altText: string;
    __width: Dimension;
    __height: Dimension;
    __maxWidth: number;
    __showCaption: boolean;
    __caption: LexicalEditor;
    // Captions cannot yet be used within editor cells
    __captionsEnabled: boolean;

    static getType() {
        return 'image';
    }

    static clone(node: ImageNode) {
        return new ImageNode({
            src: node.__src,
            altText: node.__altText,
            maxWidth: node.__maxWidth,
            width: node.__width || 'inherit',
            height: node.__height || 'inherit',
            showCaption: node.__showCaption,
            caption: node.__caption,
            captionsEnabled: node.__captionsEnabled,
            key: node.__key
        });
    }

    static importJSON(serializedNode: SerializedImageNode) {
        const node = $createImageNode({
            altText: serializedNode.altText,
            height: serializedNode.height,
            maxWidth: serializedNode.maxWidth,
            showCaption: serializedNode.showCaption,
            src: serializedNode.src,
            width: serializedNode.width
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(serializedNode.caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }

    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('src', this.__src);
        element.setAttribute('alt', this.__altText);
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
        this.__src = props.src;
        this.__altText = props.altText;
        this.__maxWidth = props.maxWidth || 500;
        this.__width = props.width || 'inherit';
        this.__height = props.height || 'inherit';
        this.__showCaption = props.showCaption || false;
        this.__caption = props.caption || createEditor();
        this.__captionsEnabled = props.captionsEnabled || props.captionsEnabled === undefined;
    }

    exportJSON() {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === 'inherit' ? 0 : this.__height,
            maxWidth: this.__maxWidth,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: 'image',
            version: 1,
            width: this.__width === 'inherit' ? 0 : this.__width
        };
    }

    setWidthAndHeight(width: Dimension, height: Dimension) {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }

    setShowCaption(showCaption: boolean) {
        const writable = this.getWritable();
        writable.__showCaption = showCaption;
    }

    // View

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

    getSrc() {
        return this.__src;
    }

    getAltText() {
        return this.__altText;
    }

    decorate() {
        return (
            <ImageComponent
                src={this.__src}
                altText={this.__altText}
                width={this.__width}
                height={this.__height}
                maxWidth={this.__maxWidth}
                nodeKey={this.getKey()}
                showCaption={this.__showCaption}
                caption={this.__caption}
                captionsEnabled={this.__captionsEnabled}
                resizable={true}
            />
        );
    }
}

export const $createImageNode = ({ ...props }: ImagePayload) => new ImageNode(props);

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode => node instanceof ImageNode;
