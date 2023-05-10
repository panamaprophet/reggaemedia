import { IconProps, getIconSize } from './helpers';

export const Heading1 = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="1" width="2" height="20" rx="1" fill={color} />
        <rect x="8" y="1" width="2" height="20" rx="1" fill={color} />
        <rect y="10" width="8" height="2" fill={color} />
        <path d="M17.8745 0.987808H19.8257V20.5L17.8745 20.489V0.987808Z" fill={color} />
        <path d="M13.174 6.33049L17.8745 0.987799L19.8257 1.96341L14.5537 7.71021L13.174 6.33049Z" fill={color} />
    </svg>
)
