import type { LexicalEditor, NodeKey } from "lexical";
import { useRef } from "react";


interface Props {
    altText: string;
    caption: LexicalEditor;
    height: 'inherit' | number;
    maxWidth: number;
    nodeKey: NodeKey;
    resizable: boolean;
    showCaption: boolean;
    src: string;
    width: 'inherit' | number;
    captionsEnabled: boolean;
}

export const ImageComponent = (props: Props): JSX.Element => {
    const { src, altText, width, height, maxWidth } = props;
    const imageRef = useRef<null | HTMLImageElement>(null);

    return (
        <picture>
            <img
                src={src}
                alt={altText}
                ref={imageRef}
                style={{
                    height,
                    maxWidth,
                    width
                }}
            />
        </picture>
    );
}
