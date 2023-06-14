import { Row } from '../Layout';
import { Link } from '../Link';
import { Search } from '../Search';
import { YouTube } from '../Icons/YouTube';
import { VK } from '../Icons/VK';
import { Instagram } from '../Icons/Instagram';
import { Section } from '../Section';
import { ReactNode } from 'react';
import { cx } from '@/helpers';
import { Logo } from '../Logo';
import { getTags } from '@/services/articles';


interface Props {
    onSearch?: (text: string) => void,
    hasInlineLogo?: boolean,
}

const LinkButtonWithIcon = ({ to, children, color = 'bg-black-500' }: { children: ReactNode, color: string, to: string }) => (
    <Link className={cx('w-8 h-8 flex items-center justify-center rounded', color)} to={to}>
        {children}
    </Link>
);

export const Header = ({ hasInlineLogo }: Props) => {
    const links = {
        youtube: 'https://www.youtube.com/watch?v=7ip0XCgggFQ',
        vk: 'https://vk.com/reggaemedia',
        instagram: 'https://www.instagram.com/reggaemedia/',
    };

    return (
        <>
            <Section>
                <Row className="w-full px-4 py-2 uppercase text-gray-600 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        {hasInlineLogo && (
                            <Link to="/">
                                <Logo size="small" />
                            </Link>
                        )}
                        <Link className="text-xs uppercase" to="/articles">Статьи</Link>
                        <Link className="text-xs uppercase" to="/contacts">Связаться c нами</Link>
                    </div>

                    <div className="flex gap-4">
                        <LinkButtonWithIcon to={links.vk} color="bg-blue-500">
                            <VK />
                        </LinkButtonWithIcon>

                        <LinkButtonWithIcon to={links.youtube} color="bg-blue-500">
                            <YouTube />
                        </LinkButtonWithIcon>

                        <LinkButtonWithIcon to={links.instagram} color="bg-blue-500">
                            <Instagram />
                        </LinkButtonWithIcon>

                        <Search />
                    </div>
                </Row>
            </Section>
            {!hasInlineLogo && (
                <div className="flex justify-center items-center border-b border-b-slate-200 py-16">
                    <Logo size="medium" />
                </div>
            )}
        </>
    );
};
