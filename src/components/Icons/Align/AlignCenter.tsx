import { IconProps, getIconSize } from '../helpers';

export const AlignCenter = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H1C0.447716 2 0 1.55228 0 1Z" fill={color} />
        <path d="M0 13C0 12.4477 0.447715 12 1 12H23C23.5523 12 24 12.4477 24 13C24 13.5523 23.5523 14 23 14H1C0.447716 14 0 13.5523 0 13Z" fill={color} />
        <path d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7Z" fill={color} />
        <path d="M3 19C3 18.4477 3.44772 18 4 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19Z" fill={color} />
    </svg>
);
