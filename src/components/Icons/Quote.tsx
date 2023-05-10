import { IconProps, getIconSize } from './helpers';

export const Quote = ({ size = 'xs', color = '#000' }: IconProps) => (
    <svg className={getIconSize(size)} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" fill={color} />
        <rect x="6" y="6" width="21" height="21" rx="2" fill={color} stroke={color} strokeWidth="2" />
        <circle cx="20" cy="15.1896" r="3" fill={color} />
        <path d="M19.0621 21.227C19.2379 21.5461 19.5234 21.6098 19.8826 21.4102C20.2417 21.2106 20.6583 20.7565 21.0797 20.1055C21.5011 19.4545 21.9083 18.6357 22.25 17.7527C22.5916 16.8697 22.8522 15.9621 22.9989 15.1448L21 16.9959L19.0621 21.227Z" fill={color} />
        <circle cx="13" cy="15.1896" r="3" fill={color} />
        <path d="M12.0621 21.227C12.2379 21.5461 12.5234 21.6098 12.8826 21.4102C13.2417 21.2106 13.6583 20.7565 14.0797 20.1055C14.5011 19.4545 14.9083 18.6357 15.25 17.7527C15.5916 16.8697 15.8522 15.9621 15.9989 15.1448L14 16.9959L12.0621 21.227Z" fill={color} />
    </svg>
)
