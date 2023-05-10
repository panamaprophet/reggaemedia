

interface Props {
    size?: number,
    color?: string,
}

export const Redo = ({ size = 16, color = '#000' }: Props) => (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
    </svg>
)
