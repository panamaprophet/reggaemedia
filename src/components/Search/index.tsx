import { useEffect, useState } from 'react';
import { Column, Row } from '../Layout';
import { InputText } from '../Input/InputText';
import { Button } from '../Button';
import { Search as SearchIcon } from '../Icons/Search';
import { Modal } from '../Modal';
import { Close } from '../Icons/Close';

interface Props {
    onSubmit: (text: string) => void,
}


export const Search = ({ onSubmit }: Props) => {
    const [isSearch, setSearch] = useState(false);
    const [query, setQuery] = useState('');
    const Icon = isSearch ? Close : SearchIcon;

    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => {
            if (event.code === 'Enter') onSubmit(query)
        }

        document.addEventListener('keydown', handleKeyboardClick);

        return () => document.removeEventListener('keydown', handleKeyboardClick);
    }, [query, onSubmit])

    return (
        <>
            <Button onClick={() => setSearch(!isSearch)}>
                <Icon />
            </Button>

            {isSearch && (
                <Modal
                    size="screen"
                    isOpen={isSearch} onClose={() => setSearch(false)}
                >
                    <Column className="items-center justify-center gap-4">
                        <p className="text-xs uppercase">Поиск по сайту</p>
                        <Row className="gap-4">
                            <InputText
                                className="text-2xl"
                                value={query}
                                placeholder="Type and hit enter to search"
                                onChange={text => setQuery(text)}
                            />
                            <Button onClick={() => onSubmit(query)}><SearchIcon size={32} /></Button>
                        </Row>
                    </Column >
                </Modal>
            )}
        </>
    );
};
