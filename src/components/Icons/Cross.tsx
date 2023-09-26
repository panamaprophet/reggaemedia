import { IconProps, getIconSize } from './helpers';

export const Cross = ({ size = 'xs', color = '#4B5563' }: IconProps) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={getIconSize(size)} viewBox="-4 -4 22 22">
        <path fill={color} id="icon_close" data-name="icon close" d="M1367.53,39.407l-2.12,2.121-5.66-5.657-5.66,5.657-2.12-2.121,5.66-5.657-5.66-5.657,2.12-2.122,5.66,5.657,5.66-5.657,2.12,2.122-5.66,5.657Z" transform="translate(-1351.97 -25.969)"></path>
    </svg>
);
