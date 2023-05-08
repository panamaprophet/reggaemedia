import Image from 'next/image';
import icon from './logo.svg'

interface Props {
    size: 'small' | 'medium' | 'large',
}

const sizes = {
    small: 'w-8 h-8',
    medium: 'w-32 h-32',
    large: 'w-48 h-48',
}

export const Logo = ({ size }: Props) => (
    <div className={`relative ${sizes[size]}`}>
        <Image src={icon} fill className="object-contain" alt="logo" />
    </div>
);
