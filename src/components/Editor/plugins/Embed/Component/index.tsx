import { useRef } from 'react';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, ElementFormatType, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';

import { useResize } from '@/components/Editor/hooks/useResize';
import { RESIZE_IMAGE_COMMAND } from '../command';
import Image from 'next/image';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

interface Props {
    alt: string;
    width: number;
    height: number;
    nodeKey: NodeKey;
    format: ElementFormatType,
    resizable: boolean;
    src: string;
    contentType: 'instagram' | 'soundcloud' | 'youtube' | 'image',
}

export const EmbedComponent = (props: Props): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const ref = useRef<HTMLImageElement | null>(null);

    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(props.nodeKey);
    const [isResizing, Markers, { width, height }] = useResize({
        allowCorners: true,
        allowWidthAndHeight: props.contentType === 'image',
        isSelected,
        width: props.width,
        height: props.height,
        nodeKey: props.nodeKey,
        callback: (width: number, height: number) => editor.dispatchCommand(RESIZE_IMAGE_COMMAND, { width, height, key: props.nodeKey }),
    });


    const handleMouseClick = (event: MouseEvent) => {
        if (isResizing) {
            return true;
        }

        if (event.target === ref.current) {
            clearSelection();
            setSelected(true);

            return true;
        }

        return false;
    }

    useRegisterCommand(CLICK_COMMAND, handleMouseClick, COMMAND_PRIORITY_LOW)

    return (
        <BlockWithAlignableContents
            format={props.format}
            nodeKey={props.nodeKey}
            className={{
                base: '',
                focus: '',
            }}
        >
            <div className="relative" style={{ width, height }}>
                <Image
                    fill
                    src={props.src}
                    ref={ref}
                    alt={props.alt}
                />
                {Markers}
            </div>
        </BlockWithAlignableContents>
    );
}
