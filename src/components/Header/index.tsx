import { ReactNode } from "react";
import { Row } from "../Layout";
import { Link } from "../Link";
import { List } from "../List";
import { Search } from "../Search";
import { YouTube } from "../Icons/YouTube";
import { VK } from "../Icons/VK";
import { Instagram } from "../Icons/Instagram";
import { cx } from "@/helpers";


const MediaLink = ({
    link,
    children,
    background
}: {
    link: string,
    children: ReactNode,
    background: string,
}) => (
    <Link href={link}>
        <div className={cx('w-8 h-8 flex items-center justify-center rounded', background)}>
            {children}
        </div>
    </Link>
);

interface Props {
    onSearch: (text: string) => void,
}

export const Header = ({ onSearch }: Props) => {
    const links = {
        youtube: 'https://www.youtube.com/watch?v=7ip0XCgggFQ',
        vk: 'https://vk.com/reggaemedia',
        instagram: 'https://www.instagram.com/reggaemedia/',
    }

    return (
        <header className="leading-10 uppercase text-gray-600">
            <Row className="justify-between mt-2 mr-4 ml-4 p-2">
                <List className="flex flex-row gap-12 items-center">
                    <Link className="text-xs uppercase" href="/" >
                        <p>Статьи</p>
                    </Link>
                    <Link className="text-xs uppercase" href="/" >
                        <p>Связаться с нами</p>
                    </Link>
                </List>
                <div className="flex flex-row items-center gap-4">
                    <MediaLink link={links.vk} background="bg-blue-500">
                        <VK size={14} />
                    </MediaLink>
                    <MediaLink link={links.youtube} background="bg-red-500">
                        <YouTube size={14} />
                    </MediaLink>
                    <MediaLink link={links.instagram} background="bg-blue-500">
                        <Instagram size={14} />
                    </MediaLink>
                    <Search onSubmit={(query: string) => onSearch(query)} />
                </div>
            </Row>
        </header>
    );
};
