import type {
    DOMExportOutput,
    EditorConfig,
    LexicalEditor,
    LexicalNode,
    SerializedEditor,
    SerializedLexicalNode,
    Spread
} from "lexical";

import { createEditor, DecoratorNode } from "lexical";
import { ImageComponent } from './Component';
import { Dimension, ImagePayload } from "./types";


const convertImageElement = (domNode: Node) => {
    if (domNode instanceof HTMLImageElement) {
        const { alt: altText, src } = domNode;

        return {
            node: new ImageNode({ altText, src })
        };
    }
    return null;
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
        type: "image";
        version: 1;
    },
    SerializedLexicalNode
>;

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

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
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

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const {
            altText,
            height,
            width,
            maxWidth,
            caption,
            src,
            showCaption
        } = serializedNode;
        const node = $createImageNode({
            altText,
            height,
            maxWidth,
            showCaption,
            src,
            width
        });
        const nestedEditor = node.__caption;
        const editorState = nestedEditor.parseEditorState(caption.editorState);
        if (!editorState.isEmpty()) {
            nestedEditor.setEditorState(editorState);
        }
        return node;
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("img");
        element.setAttribute("src", this.__src);
        element.setAttribute("alt", this.__altText);
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
        const {
            src,
            altText,
            maxWidth,
            width,
            height,
            showCaption,
            caption,
            captionsEnabled,
            key,
        } = props;

        super(key);
        this.__src = src;
        this.__altText = altText;
        this.__maxWidth = maxWidth || 500;
        this.__width = width || "inherit";
        this.__height = height || "inherit";
        this.__showCaption = showCaption || false;
        this.__caption = caption || createEditor();
        this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    }

    exportJSON(): SerializedImageNode {
        return {
            altText: this.getAltText(),
            caption: this.__caption.toJSON(),
            height: this.__height === "inherit" ? 0 : this.__height,
            maxWidth: this.__maxWidth,
            showCaption: this.__showCaption,
            src: this.getSrc(),
            type: "image",
            version: 1,
            width: this.__width === "inherit" ? 0 : this.__width
        };
    }

    setWidthAndHeight(width: Dimension, height: Dimension): void {
        const writable = this.getWritable();
        writable.__width = width;
        writable.__height = height;
    }

    setShowCaption(showCaption: boolean): void {
        const writable = this.getWritable();
        writable.__showCaption = showCaption;
    }

    // View

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement("span");
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }

    updateDOM(): false {
        return false;
    }

    getSrc(): string {
        return this.__src;
    }

    getAltText(): string {
        return this.__altText;
    }

    decorate(): JSX.Element {
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
