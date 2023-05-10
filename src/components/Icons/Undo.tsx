import { IconProps, getIconSize } from './helpers';

export const Undo = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
)
