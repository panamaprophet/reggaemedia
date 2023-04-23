

interface Props {
    size?: number,
    color?: string,
}

export const Font = ({ size = 32, color = '#000' }: Props) => (
    <svg width={size * 0.8} height={size} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 2H9V20H7V2Z" fill={color} />
        <path d="M2 0H14V2H2V0Z" fill={color} />
        <path d="M4 19C4 18.4477 4.44772 18 5 18H11C11.5523 18 12 18.4477 12 19C12 19.5523 11.5523 20 11 20H5C4.44772 20 4 19.5523 4 19Z" fill={color} />
        <path d="M0 1C0 0.447715 0.447715 0 1 0H2V3C2 3.55228 1.55228 4 1 4C0.447715 4 0 3.55228 0 3V1Z" fill={color} />
        <path d="M14 0H15C15.5523 0 16 0.447715 16 1V3C16 3.55228 15.5523 4 15 4C14.4477 4 14 3.55228 14 3V0Z" fill={color} />
    </svg>
)
