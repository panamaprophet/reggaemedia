interface Props {
    size?: number,
    color?: string,
}

export const Heading3 = ({ size = 32, color = '#000' }: Props) => {
    return (
        <svg width={size * 1.2} height={size} viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1C0 0.447718 0.447715 2.47171e-06 1 2.47171e-06C1.55228 2.47171e-06 2 0.447718 2 1V19C2 19.5523 1.55228 20 1 20C0.447715 20 0 19.5523 0 19V1Z" fill={color} />
            <path d="M8 1C8 0.447718 8.44772 2.47171e-06 9 2.47171e-06C9.55228 2.47171e-06 10 0.447718 10 1V19C10 19.5523 9.55228 20 9 20C8.44772 20 8 19.5523 8 19V1Z" fill={color} />
            <path d="M0 9H8V11H0V9Z" fill={color} />
            <path d="M17.5 11C18.5878 11 19.6512 10.6774 20.5556 10.0731C21.4601 9.46874 22.1651 8.60976 22.5813 7.60476C22.9976 6.59977 23.1065 5.4939 22.8943 4.42701C22.6821 3.36011 22.1583 2.3801 21.3891 1.61092C20.6199 0.841727 19.6399 0.317902 18.573 0.105684C17.5061 -0.106535 16.4002 0.00238293 15.3952 0.418665C14.3902 0.834947 13.5313 1.5399 12.9269 2.44437C12.3226 3.34884 12 4.4122 12 5.5L14.2 5.5C14.2 4.84732 14.3935 4.2093 14.7562 3.66662C15.1188 3.12394 15.6341 2.70097 16.2371 2.4512C16.8401 2.20143 17.5037 2.13608 18.1438 2.26341C18.7839 2.39074 19.3719 2.70504 19.8335 3.16655C20.295 3.62806 20.6093 4.21607 20.7366 4.8562C20.8639 5.49634 20.7986 6.15986 20.5488 6.76286C20.299 7.36585 19.8761 7.88124 19.3334 8.24385C18.7907 8.60646 18.1527 9 17.5 9V11Z" fill={color} />
            <path d="M12 14.5C12 15.5878 12.3226 16.6512 12.9269 17.5556C13.5313 18.4601 14.3902 19.1651 15.3952 19.5813C16.4002 19.9976 17.5061 20.1065 18.573 19.8943C19.6399 19.6821 20.6199 19.1583 21.3891 18.3891C22.1583 17.6199 22.6821 16.6399 22.8943 15.573C23.1065 14.5061 22.9976 13.4002 22.5813 12.3952C22.1651 11.3902 21.4601 10.5313 20.5556 9.92692C19.6512 9.32257 18.5878 9 17.5 9V11C18.1527 11 18.7907 11.3935 19.3334 11.7562C19.8761 12.1188 20.299 12.6342 20.5488 13.2371C20.7986 13.8401 20.8639 14.5037 20.7366 15.1438C20.6093 15.7839 20.295 16.3719 19.8335 16.8335C19.3719 17.295 18.7839 17.6093 18.1438 17.7366C17.5037 17.8639 16.8401 17.7986 16.2371 17.5488C15.6341 17.299 15.1188 16.8761 14.7562 16.3334C14.3935 15.7907 14.2 15.1527 14.2 14.5H12Z" fill={color} />
        </svg>

    )
}
