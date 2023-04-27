import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { NodeKey } from 'lexical';
import { useEffect, useState, MouseEvent as SyntheticMouseEvent, useCallback, useRef } from 'react';
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

    const [{ width, height }, setSize] = useState({ width: 500, height: 300 });
    const [isResizing, setResizing] = useState(false);
    const [dimension, setDimension] = useState<string | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const key = props.nodeKey;

    const [isSelected, setSelected] = useState(false);
    const ref = useRef<HTMLPictureElement | null>(null);

    // mouse down
    const onResizeStart = (value: string) => (event: SyntheticMouseEvent) => {
        setResizing(true);
        setDimension(value);
        setStartPoint({ x: event.clientX, y: event.clientY });
    };

    // mouse move
    const onResize = useCallback((event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;

        if (dimension === 'height') {
            setSize({
                width,
                height: height + (y - startPoint.y),
            });
        }

        if (dimension === 'width') {
            setSize({
                width: width + (x - startPoint.x),
                height,
            });
        }

        if (dimension === 'corner') {
            setSize({
                width: width + (x - startPoint.x),
                height: height + (y - startPoint.y),
            });
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

    useEffect(() => {
        const handleMouse = (event: MouseEvent) => {
            if (!ref.current) {
                return;
            }

            const isContain = ref.current.contains(event.target as Node);

            setSelected(isContain);
        }

        document.addEventListener('mousedown', handleMouse);

        return () => document.removeEventListener('mousedown', handleMouse)
    });

    return (
        <picture ref={ref} className='relative block select-none' onClick={() => setSelected(true)}>
            <img
                src={props.src}
                alt={props.altText}
                className={isSelected ? 'border-2 border-sky-600' : ''}
                style={{ width, height, maxWidth: props.maxWidth }}
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
