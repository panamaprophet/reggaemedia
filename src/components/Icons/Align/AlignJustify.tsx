
interface Props {
    size?: number,
    color?: string,
}

export const AlignJustify = ({ size = 32, color = '#000' }: Props) => (
    <svg width={size * 1.2} height={size} viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1C24 1.55228 23.5523 2 23 2H1C0.447716 2 0 1.55228 0 1Z" fill={color} />
        <path d="M0 13C0 12.4477 0.447715 12 1 12H23C23.5523 12 24 12.4477 24 13C24 13.5523 23.5523 14 23 14H1C0.447716 14 0 13.5523 0 13Z" fill={color} />
        <path d="M0 7C0 6.44772 0.447715 6 1 6H23C23.5523 6 24 6.44772 24 7C24 7.55228 23.5523 8 23 8H1C0.447716 8 0 7.55228 0 7Z" fill={color} />
        <path d="M0 19C0 18.4477 0.447715 18 1 18H23C23.5523 18 24 18.4477 24 19C24 19.5523 23.5523 20 23 20H1C0.447716 20 0 19.5523 0 19Z" fill={color} />
    </svg>

)
