interface Props {
    size?: number,
    color?: string,
}

export const Paragraph = ({ size = 16, color = '#000' }: Props) => (
    <svg width={size * 1.2} height={size} viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1C6 0.447715 6.44772 0 7 0H23C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H7C6.44772 2 6 1.55228 6 1Z" fill={color} />
        <path d="M0 19C0 18.4477 0.447715 18 1 18H17C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20H1C0.447716 20 0 19.5523 0 19Z" fill={color} />
        <path d="M0 13C0 12.4477 0.447715 12 1 12H23C23.5523 12 24 12.4477 24 13C24 13.5523 23.5523 14 23 14H1C0.447716 14 0 13.5523 0 13Z" fill={color} />
        <path d="M0 7C0 6.44772 0.447715 6 1 6H23C23.5523 6 24 6.44772 24 7C24 7.55228 23.5523 8 23 8H1C0.447716 8 0 7.55228 0 7Z" fill={color} />
    </svg>

)
