interface Props {
    size?: number,
    color?: string,
}

export const UnorderedList = ({ size = 16, color = '#000' }: Props) => (
    <svg width={size} height={size * 0.7} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2Z" fill={color} />
        <path d="M4 2C4 1.44772 4.44772 1 5 1H21C21.5523 1 22 1.44772 22 2C22 2.55228 21.5523 3 21 3H5C4.44772 3 4 2.55228 4 2Z" fill={color} />
        <path d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2Z" fill={color} />
        <path d="M4 8C4 7.44772 4.44772 7 5 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H5C4.44772 9 4 8.55228 4 8Z" fill={color} />
        <path d="M3 8C3 8.82843 2.32843 9.5 1.5 9.5C0.671573 9.5 0 8.82843 0 8C0 7.17157 0.671573 6.5 1.5 6.5C2.32843 6.5 3 7.17157 3 8Z" fill={color} />
        <path d="M4 14C4 13.4477 4.44772 13 5 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H5C4.44772 15 4 14.5523 4 14Z" fill={color} />
        <path d="M3 14C3 14.8284 2.32843 15.5 1.5 15.5C0.671573 15.5 0 14.8284 0 14C0 13.1716 0.671573 12.5 1.5 12.5C2.32843 12.5 3 13.1716 3 14Z" fill={color} />
    </svg>
)
