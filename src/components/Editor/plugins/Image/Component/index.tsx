import { useRef } from 'react';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { cx } from '@/helpers';

import { useResize } from '@/components/Editor/hooks/useResize';
import { RESIZE_IMAGE_COMMAND } from '../command';

interface Props {
    alt: string;
    width: number;
    height: number;
    nodeKey: NodeKey;
    resizable: boolean;
    src: string;
    content: 'instagram' | 'soundcloud' | 'youtube' | 'image',
}

export const ImageComponent = (props: Props): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const ref = useRef<HTMLImageElement | null>(null);

    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(props.nodeKey);
    const [isResizing, Markers, { width, height }] = useResize({
        allowCorners: true,
        allowWidthAndHeight: props.content === 'image',
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
        <picture className={cx('relative block', isSelected && 'outline outline-sky-600')}>
            <img
                src={props.src}
                ref={ref}
                alt={props.alt}
                style={{ width, height }}
            />
            {Markers}
        </picture>
    );
}
