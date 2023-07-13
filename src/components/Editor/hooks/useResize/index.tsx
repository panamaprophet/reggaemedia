import { useCallback, useEffect, MouseEvent as SyntheticMouseEvent, useState, ReactNode } from 'react';
import { Marker } from './Marker';

interface Props {
    width: number,
    height: number,
    isSelected: boolean,
    keepAspectRatio: boolean,
    callback: (width: number, height: number) => void,
}

type ReturnType = [boolean, ReactNode, { width: number, height: number }];


const getDirection = (movementX: number, movementY: number) => {
    const direction = [];

    if (movementY > 0) direction.push('down');
    if (movementY < 0) direction.push('up');

    if (movementX > 0) direction.push('right');
    if (movementX < 0) direction.push('left');

    return direction;
};

export const useResize = (props: Props): ReturnType => {
    const [{ width, height }, setSize] = useState({ width: props.width, height: props.height });
    const [isResizing, setResizing] = useState(false);
    const [type, setType] = useState<string | null>(null);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const callback = props.callback;

    const onResizeStart = (event: SyntheticMouseEvent) => {
        setResizing(true);
        setType(event.currentTarget.getAttribute('data-name'));
        setStartPoint({ x: event.clientX, y: event.clientY });
    };

    const onResize = useCallback((event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;
        const keepAspectRatio = event.altKey;

        let w = width;
        let h = height;

        const directions = getDirection(event.movementX, event.movementY);

        const isLeft = type === 'top-left' || type === 'bottom-left';
        const isTop = type === 'top-left' || type === 'top-right';

        const dx = Math.abs(x - startPoint.x);
        const dy = Math.abs(y - startPoint.y);

        directions.map((direction) => {
            switch (direction) {
                case 'left':
                    w = isLeft ? width + dx : width - dx;
                    break;
                case 'right':
                    w = isLeft ? width - dx : width + dx;
                    break;
                case 'up':
                    h = isTop ? height + dy : height - dy;
                    break;
                case 'down':
                    h = isTop ? height - dy : height + dy;
                    break;
            }

            if (keepAspectRatio && (direction === 'left' || direction === 'right')) {
                h = h / (width / w);
            }
    
            if (keepAspectRatio && (direction === 'up' || direction === 'down')) {
                w = w / (height / h);
            }
        });

        setStartPoint({ x, y });
        setSize({ width: w, height: h });
    }, [startPoint, type, height, width]);

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
                <Marker onClick={onResizeStart} type="top-left" />
                <Marker onClick={onResizeStart} type="top-right" />
                <Marker onClick={onResizeStart} type="bottom-right" />
                <Marker onClick={onResizeStart} type="bottom-left" />
            </>
        )
    }

    return [isResizing, Markers, { width, height }];
}
