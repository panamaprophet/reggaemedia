import { IconProps, getIconSize } from './helpers';

export const Underline = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11.5C-1.39116e-07 12.9587 0.632141 14.3576 1.75736 15.3891C2.88258 16.4205 4.4087 17 6 17C7.5913 17 9.11742 16.4205 10.2426 15.3891C11.3679 14.3576 12 12.9587 12 11.5L10.02 11.5C10.02 12.4773 9.59647 13.4146 8.84257 14.1057C8.08867 14.7968 7.06617 15.185 6 15.185C4.93383 15.185 3.91133 14.7968 3.15743 14.1057C2.40353 13.4146 1.98 12.4773 1.98 11.5L0 11.5Z" fill={color} />
        <rect y="18" width="12" height="2" rx="1" fill={color} />
        <path d="M0 1C0 0.447715 0.447715 0 1 0V0C1.55228 0 2 0.447715 2 1V12H0V1Z" fill={color} />
        <path d="M10 1C10 0.447715 10.4477 0 11 0V0C11.5523 0 12 0.447715 12 1V12H10V1Z" fill={color} />
    </svg>
)
