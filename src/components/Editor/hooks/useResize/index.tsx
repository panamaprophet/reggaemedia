import { useCallback, useEffect, useState } from 'react';
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
    const [type, setType] = useState<string | null>(null);

    const onResize = useCallback((event: MouseEvent) => {
        const keepAspectRatio = event.altKey;

        let newWidth = size.width;
        let newHeight = size.height;

        const directions = getDirection(event.movementX, event.movementY);

        const isLeft = type === 'top-left' || type === 'bottom-left';
        const isTop = type === 'top-left' || type === 'top-right';

        const dx = Math.abs(event.movementX);
        const dy = Math.abs(event.movementY);

        const ratio = size.width / size.height;

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
                newHeight =  newWidth / ratio;
            }

            if (keepAspectRatio && (direction === 'up' || direction === 'down')) {
                newWidth = newHeight * ratio;
            }
        });

        setSize({ width: newWidth, height: newHeight });
    }, [type, size]);

    const onResizeEnd = useCallback(() => {
        setType(null);
        callback(size);
    }, [callback, size]);

    useEffect(() => {
        if (!type) {
            return;
        }

        document.addEventListener('mousemove', onResize);
        document.addEventListener('mouseup', onResizeEnd);

        return () => {
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', onResizeEnd);
        }
    }, [type, onResizeEnd, onResize]);

    let Markers = null;

    if (isSelected) {
        Markers = (
            <>
                <Marker onClick={setType} type="top-left" />
                <Marker onClick={setType} type="top-right" />
                <Marker onClick={setType} type="bottom-right" />
                <Marker onClick={setType} type="bottom-left" />
            </>
        )
    }

    return [Boolean(type), Markers, size] as const;
};
