import { useCallback, useEffect, MouseEvent as SyntheticMouseEvent, useState } from 'react';
import { Marker } from './Marker';

interface Props {
    width: number,
    height: number,
    isSelected: boolean,
    keepAspectRatio: boolean,
    callback: ({ width, height }: { width: number, height: number }) => void,
}

const getDirection = (movementX: number, movementY: number) => {
    const direction = [];

    if (movementY > 0) direction.push('down');
    if (movementY < 0) direction.push('up');

    if (movementX > 0) direction.push('right');
    if (movementX < 0) direction.push('left');

    return direction;
};

export const useResize = ({ callback, width, height, isSelected }: Props) => {
    const [size, setSize] = useState({ width, height });
    const [isResizing, setResizing] = useState(false);
    const [type, setType] = useState<string | null>(null);

    const onResizeStart = (event: SyntheticMouseEvent) => {
        setResizing(true);
        setType(event.currentTarget.getAttribute('data-name'));
    };

    const onResize = useCallback((event: MouseEvent) => {
        const keepAspectRatio = event.altKey;

        let newWidth = size.width;
        let newHeight = size.height;

        const directions = getDirection(event.movementX, event.movementY);

        const isLeft = type === 'top-left' || type === 'bottom-left';
        const isTop = type === 'top-left' || type === 'top-right';

        const dx = Math.abs(event.movementX);
        const dy = Math.abs(event.movementY);

        directions.map((direction) => {
            switch (direction) {
                case 'left':
                    newWidth = isLeft ? newWidth + dx : newWidth - dx;
                    break;
                case 'right':
                    newWidth = isLeft ? newWidth - dx : newWidth + dx;
                    break;
                case 'up':
                    newHeight = isTop ? newHeight + dy : newHeight - dy;
                    break;
                case 'down':
                    newHeight = isTop ? newHeight - dy : newHeight + dy;
                    break;
            }

            if (keepAspectRatio && (direction === 'left' || direction === 'right')) {
                newHeight = newHeight / (size.width / newWidth);
            }

            if (keepAspectRatio && (direction === 'up' || direction === 'down')) {
                newWidth = newWidth / (size.height / newHeight);
            }
        });

        setSize({ width: newWidth, height: newHeight });
    }, [type, size]);

    const onResizeEnd = useCallback(() => {
        setResizing(false);
        callback(size);
    }, [callback, size]);

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

    if (isSelected) {
        Markers = (
            <>
                <Marker onClick={onResizeStart} type="top-left" />
                <Marker onClick={onResizeStart} type="top-right" />
                <Marker onClick={onResizeStart} type="bottom-right" />
                <Marker onClick={onResizeStart} type="bottom-left" />
            </>
        )
    }

    return [isResizing, Markers, size] as const;
}
