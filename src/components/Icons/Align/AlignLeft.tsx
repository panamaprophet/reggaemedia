
interface Props {
    size?: number,
    color?: string,
}

export const AlignLeft = ({ size = 32, color = '#000' }: Props) => {
    return (
        <svg width={size * 1.2} height={size} viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447716 2 0 1.55228 0 1Z" fill={color} />
            <path d="M0 19C0 18.4477 0.447715 18 1 18H20C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20H1C0.447715 20 0 19.5523 0 19Z" fill={color} />
            <path d="M0 13C0 12.4477 0.447715 12 1 12H10C10.5523 12 11 12.4477 11 13C11 13.5523 10.5523 14 10 14H1C0.447715 14 0 13.5523 0 13Z" fill={color} />
            <path d="M0 7C0 6.44772 0.447715 6 1 6H23C23.5523 6 24 6.44772 24 7C24 7.55228 23.5523 8 23 8H1C0.447716 8 0 7.55228 0 7Z" fill={color} />
        </svg>
    )
}
