interface Props {
    size?: number,
    color?: string,
}

export const Italic = ({ size = 16, color = '#000' }: Props) => (
    <svg width={size * 0.6} height={size} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 0H8.5L5.5 20H3.5L6.5 0Z" fill={color} />
        <rect x="2" width="10" height="2" rx="1" fill={color} />
        <rect y="18" width="10" height="2" rx="1" fill={color} />
    </svg>
)
