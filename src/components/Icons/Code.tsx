

interface Props {
    size?: number,
    color?: string,
}

export const Code = ({ size = 32, color = '#000' }: Props) => {
    return (
        <svg width={size} height={size * 0.6} viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.681 11.736C13.2932 12.088 12.6645 12.088 12.2767 11.736C11.889 11.384 11.889 10.8133 12.2767 10.4613L18.5958 4.72533L20 5.99999L13.681 11.736Z" fill={color} />
            <path d="M12.2767 1.53866C11.889 1.18667 11.889 0.615982 12.2767 0.263992C12.6645 -0.0879974 13.2932 -0.0879974 13.681 0.263992L20 5.99999L18.5958 7.27466L12.2767 1.53866Z" fill={color} />
            <path d="M6.31905 0.264007C6.70682 -0.087982 7.33551 -0.0879822 7.72328 0.264007C8.11105 0.615997 8.11105 1.18668 7.72328 1.53867L1.40423 7.27468L0 6.00001L6.31905 0.264007Z" fill={color} />
            <path d="M7.72328 10.4613C8.11105 10.8133 8.11105 11.384 7.72328 11.736C7.33551 12.088 6.70682 12.088 6.31905 11.736L0 6.00001L1.40423 4.72534L7.72328 10.4613Z" fill={color} />
        </svg>

    )
}
