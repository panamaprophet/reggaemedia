import { ReactNode, useState } from "react";
import { Row } from "../Layout";
import { Link } from "../Link";
import { List } from "../List";
import { Text } from "../Text";
import { Search } from "../Search";
import { Modal } from "../Modal";
import { YouTube } from "../Icons/YouTube";
import { VK } from "../Icons/VK";
import { Instagram } from "../Icons/Instagram";
import { Close } from "../Icons/Close";
import { Search as SearchIcon } from "../Icons/Search";
import { Button } from "../Button";
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
    const [isSearch, setSearch] = useState(false);
    const [query, setQuery] = useState('');
    const links = {
        youtube: 'https://www.youtube.com/watch?v=7ip0XCgggFQ',
        vk: 'https://vk.com/reggaemedia',
        instagram: 'https://www.instagram.com/reggaemedia/',
    }

    const submitQuery = (text: string) => {
        onSearch(text);
    }

    return (
        <header className="leading-10 uppercase text-gray-600">
            <Row className="justify-between mt-2 mr-4 ml-4 p-2">
                <List className="flex flex-row gap-12 items-center">
                    <Link href="/" >
                        <Text>Статьи</Text>
                    </Link>
                    <Link href="/" >
                        <Text>Связаться с нами</Text>
                    </Link>
                </List>
                <div className="flex flex-row items-center gap-4">
                    <MediaLink link={links.youtube} background="bg-blue-500">
                        <VK size={14} />
                    </MediaLink>
                    <MediaLink link={links.youtube} background="bg-red-500">
                        <YouTube size={14} />
                    </MediaLink>
                    <MediaLink link={links.youtube} background="bg-blue-500">
                        <Instagram size={14} />
                    </MediaLink>
                    <Button onClick={() => setSearch(!isSearch)}>
                        {isSearch ? <Close size={16} /> : <SearchIcon size={16} />}
                    </Button>
                </div>
            </Row>
            {isSearch && (
                <Modal
                    className="top-1/4 -translate-y-1/4 gap-4"
                    size="w-screen h-screen"
                    isOpen={isSearch} onClose={() => setSearch(false)}
                >
                    <Search
                        query={query}
                        onChange={(text) => setQuery(text)}
                        onSubmit={(text) => submitQuery(text)}
                    />
                </Modal>
            )}

        </header>
    );
};
