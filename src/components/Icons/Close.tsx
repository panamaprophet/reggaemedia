
interface Props {
    color?: string,
    size?: number,
}

export const Close = ({ color = '#4B5563', size = 32 }: Props) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 15.56 15.562">
        <path fill={color} id="icon_close" data-name="icon close" d="M1367.53,39.407l-2.12,2.121-5.66-5.657-5.66,5.657-2.12-2.121,5.66-5.657-5.66-5.657,2.12-2.122,5.66,5.657,5.66-5.657,2.12,2.122-5.66,5.657Z" transform="translate(-1351.97 -25.969)"></path>
    </svg>
);
