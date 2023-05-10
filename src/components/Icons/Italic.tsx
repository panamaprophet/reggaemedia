import { IconProps, getIconSize } from './helpers';

export const Italic = ({ size = 'xs', color = '#000' }: IconProps) => (
    // adj width * 0.6
    <svg className={getIconSize(size)} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 0H8.5L5.5 20H3.5L6.5 0Z" fill={color} />
        <rect x="2" width="10" height="2" rx="1" fill={color} />
        <rect y="18" width="10" height="2" rx="1" fill={color} />
    </svg>
)
