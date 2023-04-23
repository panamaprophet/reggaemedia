import type { NodeKey } from 'lexical';
import { useRef } from 'react';


interface Props {
    altText: string;
    height: 'inherit' | number;
    maxWidth: number;
    nodeKey: NodeKey;
    resizable: boolean;
    src: string;
    width: 'inherit' | number;
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
