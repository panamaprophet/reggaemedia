import { cx } from '@/helpers';


type MarkerType = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

const MarkerPositionMap: { [k in MarkerType]: string } = {
    'top-left': '-top-1 -left-1 cursor-nw-resize',
    'top-right': '-top-1 -right-1 cursor-ne-resize',
    'bottom-left': '-left-1 -bottom-1 cursor-sw-resize',
    'bottom-right': '-right-1 -bottom-1 cursor-se-resize',
};


export const Marker = ({ type, onClick }: { type: MarkerType, onClick: (type: MarkerType) => void }) => (
    <div
        data-name={type}
        onMouseDown={() => onClick(type)}
        className={cx('absolute w-2 h-2 bg-sky-600', MarkerPositionMap[type])}
    />
);
