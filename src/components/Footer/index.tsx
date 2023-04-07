import { getCurrentYear } from "@/helpers";

export const Footer = () => (
    <div className="flex items-center justify-center m-5">
        <div className="text-xs uppercase text-gray-600">{getCurrentYear()} © Reggae.Media. Crafted with love. </div>
    </div>
)
