import { useEffect } from "react";
import { Column, Row } from "../Layout";
import { Text } from "../Text";
import { InputText } from "../Input/InputText";
import { Button } from "../Button";
import { Search as SearchIcon } from '../Icons/Search';

interface Props {
    query: string,
    onChange: (text: string) => void,
    onSubmit: (text: string) => void,
}


export const Search = ({ query, onChange, onSubmit }: Props) => {
    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => {
            if (event.code === 'Enter') onSubmit(query)
        }

        document.addEventListener('keydown', handleKeyboardClick);

        return () => document.removeEventListener('keydown', handleKeyboardClick);
    }, [query, onSubmit])

    return (
        <Column className="items-center justify-center gap-4">
            <Text>Search site</Text>
            <Row className="gap-4">
                <InputText
                    className="text-2xl"
                    value={query}
                    placeholder="Type and hit enter to search"
                    onChange={text => onChange(text)}
                />
                <Button onClick={() => onSubmit(query)}><SearchIcon size={32} /></Button>
            </Row>
        </Column >
    );
};
