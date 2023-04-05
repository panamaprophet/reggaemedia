
interface Props {
    color?: string,
    size?: number,
}

export const Search = ({ color = '#4B5563', size = 32 }: Props) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
        <path fill={color} d="M20.943 4.619c-4.5-4.5-11.822-4.5-16.321 0-4.498 4.5-4.498 11.822 0 16.319 4.007 4.006 10.247 4.435 14.743 1.308 0.095 0.447 0.312 0.875 0.659 1.222l6.553 6.55c0.953 0.955 2.496 0.955 3.447 0 0.953-0.951 0.953-2.495 0-3.447l-6.553-6.551c-0.347-0.349-0.774-0.565-1.222-0.658 3.13-4.495 2.7-10.734-1.307-14.743zM18.874 18.871c-3.359 3.357-8.825 3.357-12.183 0-3.357-3.359-3.357-8.825 0-12.184 3.358-3.359 8.825-3.359 12.183 0s3.359 8.825 0 12.184z"></path>
    </svg>
);