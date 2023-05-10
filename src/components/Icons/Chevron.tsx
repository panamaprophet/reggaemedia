import { IconProps, getIconSize } from './helpers';

export const Chevron = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={getIconSize(size)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
)
