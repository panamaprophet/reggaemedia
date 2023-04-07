import Image from "next/image";
import icon from './Logo.svg'


export const Logo = () => (
    <div className="w-32 h-32 relative">
        <Image src={icon} fill className="object-contain" alt="logo" />
    </div>
);
