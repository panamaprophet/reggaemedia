import { useEffect, useState, MouseEvent as SyntheticMouseEvent, useCallback, useRef } from 'react';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRegisterCommand } from '@/components/Editor/hooks/useLexicalHooks';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';

import { RESIZE_IMAGE_COMMAND } from '../command';

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
    const [editor] = useLexicalComposerContext();

    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(props.nodeKey);
    const [{ width, height }, setSize] = useState({ width: 500, height: 300 });
    const [isResizing, setResizing] = useState(false);
    const [dimension, setDimension] = useState<string | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const key = props.nodeKey;
    const ref = useRef<HTMLImageElement | null>(null);

    // mouse down
    const onResizeStart = (value: string) => (event: SyntheticMouseEvent) => {
        setResizing(true);
        setDimension(value);
        setStartPoint({ x: event.clientX, y: event.clientY });
    };

    // mouse move
    const onResize = useCallback((event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;
        const currentWidth = width + (x - startPoint.x);
        const currentHeight = height + (y - startPoint.y);

        if (dimension === 'height') {
            setSize({
                width,
                height: currentHeight,
            });
        }

        if (dimension === 'width') {
            setSize({
                width: currentWidth,
                height,
            });
        }

        if (dimension === 'corner') {
            const ratio = width / height;

            if (currentWidth / ratio < currentHeight) {
                setSize({
                    width: currentWidth,
                    height: currentWidth / ratio,
                });
            } else {
                setSize({
                    width: currentHeight * ratio,
                    height: currentHeight,
                });
            }

        }

        setStartPoint({ x, y });
    }, [startPoint, dimension, height, width]);

    // mouse up
    const onResizeEnd = useCallback(() => {
        setResizing(false);

        editor.dispatchCommand(RESIZE_IMAGE_COMMAND, { width, height, key });
    }, [editor, height, key, width]);

    useEffect(() => {
        if (!isResizing) {
            return;
        }

        document.addEventListener('mousemove', onResize);
        document.addEventListener('mouseup', onResizeEnd);

        return () => {
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', onResizeEnd);
        }
    }, [isResizing, onResizeEnd, onResize]);

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
        <picture className='relative block select-none'>
            <img
                src={props.src}
                ref={ref}
                alt={props.altText}
                className={isSelected ? 'border-2 border-sky-600' : ''}
                style={{ width, height }}
            />
            {isSelected && (
                <>
                    <div onMouseDown={onResizeStart('height')} data-name="north" className="w-2 h-2 bg-sky-600 absolute -top-1 left-1/2 cursor-ns-resize" />
                    <div onMouseDown={onResizeStart('corner')} data-name="north-east" className="w-2 h-2 bg-sky-600 absolute -top-1 -right-1 cursor-ne-resize" />
                    <div onMouseDown={onResizeStart('width')} data-name="east" className="w-2 h-2 bg-sky-600 absolute -right-1 top-1/2 cursor-e-resize" />
                    <div onMouseDown={onResizeStart('corner')} data-name="east-south" className="w-2 h-2 bg-sky-600 absolute -right-1 -bottom-1 cursor-se-resize" />
                    <div onMouseDown={onResizeStart('height')} data-name="south" className="w-2 h-2 bg-sky-600 absolute -bottom-1 left-1/2 cursor-s-resize" />
                    <div onMouseDown={onResizeStart('corner')} data-name="south-west" className="w-2 h-2 bg-sky-600 absolute -left-1 -bottom-1 cursor-sw-resize" />
                    <div onMouseDown={onResizeStart('width')} data-name="west" className="w-2 h-2 bg-sky-600 absolute -left-1 top-1/2 cursor-w-resize" />
                    <div onMouseDown={onResizeStart('corner')} data-name="west-north" className="w-2 h-2 bg-sky-600 absolute -top-1 -left-1 cursor-nw-resize" />
                </>
            )}
        </picture>
    );
}
