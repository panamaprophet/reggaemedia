import { IconProps, getIconSize } from './helpers';

export const Image = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} viewBox="2 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_35_9)">
            <path d="M5 3C5 1.89543 5.89543 1 7 1H21C22.1046 1 23 1.89543 23 3V17C23 18.1046 22.1046 19 21 19H7C5.89543 19 5 18.1046 5 17V3Z" stroke={color} strokeWidth="2" shapeRendering="crispEdges" />
        </g>
        <path d="M13 14L19 6.5L23 12V18H13V14Z" fill={color} />
        <path d="M5 16L10 11L13 14V18H5V16Z" fill={color} />
        <circle cx="9.5" cy="5.5" r="1.5" fill={color} />
        <defs>
            <filter id="filter0_d_35_9" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_9" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35_9" result="shape" />
            </filter>
        </defs>
    </svg>

)
