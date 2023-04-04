import { useState } from "react";
import { Row } from "../Layout";
import { Link } from "../Link";
import { List } from "../List";
import { SocialLinks } from "../SocialMedia";
import { SearchButton } from "../SearchButton";
import { Text } from "../Text";

import { Search } from "../Search";
import { Modal } from "../Modal";

export const Header = () => {
    const [isSearch, setSearch] = useState(false);

    return (
        <header>
            <Row className="justify-between mt-2 mr-4 ml-4">
                <List className="flex flex-row gap-5">
                    <Link href="/" >
                        <Text>Статьи</Text>
                    </Link>
                    <Link href="/" >
                        <Text>Связаться с нами</Text>
                    </Link>
                </List>
                <div className="flex flex-row items-center gap-4">
                    <SocialLinks />
                    <SearchButton isSearch={isSearch} onClick={() => setSearch(!isSearch)} />
                </div>
            </Row>
            {isSearch && (
                <Modal isOpen={isSearch} size="w-screen h-screen" onClose={() => setSearch(false)}>
                    <Search onSubmit={() => { }} />
                </Modal>
            )}

        </header>
    );
};
