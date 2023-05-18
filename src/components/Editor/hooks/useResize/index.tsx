import { useCallback, useEffect, MouseEvent as SyntheticMouseEvent, useState, ReactNode } from 'react';

interface Props {
    width: number,
    height: number,
    isSelected: boolean,
    keepAspectRatio: boolean,
    callback: (width: number, height: number) => void,
}

type ReturnType = [boolean, ReactNode, { width: number, height: number }];

export const useResize = (props: Props): ReturnType => {
    const [{ width, height }, setSize] = useState({ width: props.width, height: props.height });
    const [isResizing, setResizing] = useState(false);
    const [dimension, setDimension] = useState<string | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const callback = props.callback;

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

        let w = width;
        let h = height;

        switch (dimension) {
            case 'height':
                h = currentHeight;
                break;
            case 'width':
                w = currentWidth;
                break;
            default:
                const ratio = width / height;

                if (currentWidth / ratio < currentHeight) {
                    w = currentWidth;
                    h = currentWidth / ratio;
                } else {
                    w = currentHeight * ratio;
                    h = currentHeight;
                }
        }

        setStartPoint({ x, y });
        setSize({ width: w, height: h });
    }, [startPoint, dimension, height, width]);

    // mouse up
    const onResizeEnd = useCallback(() => {
        setResizing(false);

        callback(width, height);
    }, [callback, width, height]);

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

    let Markers = null;

    if (props.isSelected) {
        Markers = (
            <>
                {!props.keepAspectRatio && (
                    <>
                        <div onMouseDown={onResizeStart('height')} data-name="north" className="w-2 h-2 bg-sky-600 absolute -top-1 left-1/2 cursor-ns-resize" />
                        <div onMouseDown={onResizeStart('width')} data-name="east" className="w-2 h-2 bg-sky-600 absolute -right-1 top-1/2 cursor-e-resize" />
                        <div onMouseDown={onResizeStart('height')} data-name="south" className="w-2 h-2 bg-sky-600 absolute -bottom-1 left-1/2 cursor-s-resize" />
                        <div onMouseDown={onResizeStart('width')} data-name="west" className="w-2 h-2 bg-sky-600 absolute -left-1 top-1/2 cursor-w-resize" />
                    </>
                )}
                {props.keepAspectRatio && (
                    <>
                        <div onMouseDown={onResizeStart('corner')} data-name="north-east" className="w-2 h-2 bg-sky-600 absolute -top-1 -right-1 cursor-ne-resize" />
                        <div onMouseDown={onResizeStart('corner')} data-name="east-south" className="w-2 h-2 bg-sky-600 absolute -right-1 -bottom-1 cursor-se-resize" />
                        <div onMouseDown={onResizeStart('corner')} data-name="south-west" className="w-2 h-2 bg-sky-600 absolute -left-1 -bottom-1 cursor-sw-resize" />
                        <div onMouseDown={onResizeStart('corner')} data-name="west-north" className="w-2 h-2 bg-sky-600 absolute -top-1 -left-1 cursor-nw-resize" />
                    </>
                )}
            </>
        )
    }

    return [isResizing, Markers, { width, height }];
}
