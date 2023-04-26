import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, NodeKey } from 'lexical';
import { useEffect, useRef, useState, MouseEvent as SyntheticMouseEvent } from 'react';
import { $isImageNode } from '../node';
import { useDebouncer } from '@/hooks/useDebouncer';


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
    const [viewport, setViewport] = useState({ width: 500, height: 300 });
    const debouncedViewport = useDebouncer(viewport, 500);
    const [isSelected, setSelected] = useState(false);
    const ref = useRef<null | HTMLImageElement>(null);

    useEffect(() => {
        const handleMouse = (event: MouseEvent) => {
            if (ref.current?.contains(event.target as Node)) {
                setSelected(true);
            } else {
                setSelected(false)
            }
        }

        document.addEventListener('mousedown', handleMouse);

        return () => document.removeEventListener('mousedown', handleMouse)
    });

    const handleSize = (event: SyntheticMouseEvent, dimension: 'width' | 'height') => {
        const onMouseMove = (mouseMoveEvent: MouseEvent) => {
            const startSize = viewport;
            const startPosition = { x: event.clientX, y: event.clientY };

            if (dimension === 'height') {
                setViewport({
                    ...viewport,
                    height: startSize.height - startPosition.y + mouseMoveEvent.clientY,
                });
            } else {
                setViewport({
                    ...viewport,
                    width: startSize.width - startPosition.x + mouseMoveEvent.clientX,
                });
            }
        }

        const onMouseUp = () => document.removeEventListener('mousemove', onMouseMove);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    }

    useEffect(() => {
        editor.update(() => {
            const node = $getNodeByKey(props.nodeKey);

            if ($isImageNode(node)) {
                node.setWidthAndHeight(debouncedViewport.width, debouncedViewport.height);
            }
        })
    }, [editor, debouncedViewport]);

    return (
        <picture ref={ref} className='relative block'>
            <img
                src={props.src}
                alt={props.altText}
                className={isSelected ? 'border-2 border-sky-600' : ''}
                style={{
                    width: viewport.width,
                    height: viewport.height,
                }}
            />
            {isSelected && (
                <>
                    <div onMouseDown={event => handleSize(event, 'height')} data-name="north" className="w-2 h-2 bg-sky-600 absolute -top-1 left-1/2 cursor-ns-resize" />
                    <div onMouseDown={event => handleSize(event, 'width')} data-name="west" className="w-2 h-2 bg-sky-600 absolute -right-1 top-1/2 cursor-ew-resize" />
                    <div onMouseDown={event => handleSize(event, 'height')} data-name="south" className="w-2 h-2 bg-sky-600 absolute -bottom-1 left-1/2 cursor-ns-resize" />
                    <div onMouseDown={event => handleSize(event, 'width')} data-name="east" className="w-2 h-2 bg-sky-600 absolute -left-1 top-1/2 cursor-ew-resize" />
                </>
            )}
        </picture>
    );
}
