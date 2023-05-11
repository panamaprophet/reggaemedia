import type { ElementFormatType, LexicalEditor, NodeKey, Spread } from 'lexical';

import { YouTubeComponent } from './Component';
import { DecoratorBlockNode, SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

export interface YouTubePayload {
    width?: number,
    height?: number,
    format?: ElementFormatType | null,
    videoID: string,
    nodeKey: NodeKey,
}

export type SerializedYouTubeNode = Spread<
    {
        width: number,
        height: number,
        videoID: string,
        nodeKey: NodeKey,
        format: ElementFormatType,
    },
    SerializedDecoratorBlockNode
>;

export class YouTubeNode extends DecoratorBlockNode {
    props: Required<YouTubePayload>;

    static getType() {
        return 'youtube';
    }

    static clone(node: YouTubeNode) {
        return new YouTubeNode(node.props);
    }

    static importJSON(serializedNode: SerializedYouTubeNode) {
        const { type, version, ...rest } = serializedNode;

        return new YouTubeNode(rest);
    }

    exportJSON(): SerializedYouTubeNode {
        return {
            ...this.props,
            type: 'youtube',
            format: this.__format,
            version: 1,
        };
    }

    constructor(props: any, format?: ElementFormatType, key?: NodeKey) {
        super(format, key);

        this.props = {
            ...props,
            width: props.width || 300,
            height: props.height || 300,
        };
    }

    setWidthAndHeight(width: number, height: number) {
        const writable = this.getWritable();
        writable.props.width = width;
        writable.props.height = height;
    }

    updateDOM(): false {
        return false;
    }

    decorate(_editor: LexicalEditor): JSX.Element {
        return (
            <BlockWithAlignableContents
                nodeKey={this.getKey()}
                format={this.__format}
                className={{
                    base: 'select-none',
                    focus: 'outline-sky-500'
                }}
            >
                <YouTubeComponent
                    videoID={this.props.videoID}
                    width={this.props.width}
                    format={this.__format}
                    height={this.props.height}
                    nodeKey={this.getKey()}
                />
            </BlockWithAlignableContents>
        );
    }

}

export function $isYouTubeNode(
    node: any
): node is YouTubeNode {
    return node instanceof YouTubeNode;
}
