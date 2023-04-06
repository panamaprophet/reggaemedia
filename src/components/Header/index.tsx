import { Row } from "../Layout";
import { Link } from "../Link";
import { List } from "../List";
import { Search } from "../Search";
import { YouTube } from "../Icons/YouTube";
import { VK } from "../Icons/VK";
import { Instagram } from "../Icons/Instagram";


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
                        Статьи
                    </Link>
                    <Link className="text-xs uppercase" href="/" >
                        Связаться с нами
                    </Link>
                </List>
                <div className="flex flex-row items-center gap-4">
                    <Link className={'w-8 h-8 flex items-center justify-center rounded bg-blue-500'} href={links.vk}>
                        <VK size={14} />
                    </Link>
                    <Link className={'w-8 h-8 flex items-center justify-center rounded bg-red-500'} href={links.vk}>
                        <YouTube size={14} />
                    </Link>
                    <Link className={'w-8 h-8 flex items-center justify-center rounded bg-blue-500'} href={links.vk}>
                        <Instagram size={14} />
                    </Link>
                    <Search onSubmit={(query: string) => onSearch(query)} />
                </div>
            </Row>
        </header>
    );
};
