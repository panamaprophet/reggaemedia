import { useEffect, useState } from "react";
import { Column } from "../Layout";
import { Text } from "../Text";
import { InputText } from "../Input/InputText";


interface Props {
    onSubmit: (query: string) => void,
}


export const Search = ({ onSubmit }: Props) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyboardClick = (event: KeyboardEvent) => {
            if (event.code === 'Enter') onSubmit(query);
        }

        document.addEventListener('keydown', handleKeyboardClick);

        return () => document.removeEventListener('keydown', handleKeyboardClick);
    }, [query, onSubmit])

    return (
        <Column className="items-center justify-center">
            <Text className="">SEARCH SITE</Text>
            <InputText
                value={query}
                placeholder="Type and hit enter to search"
                onChange={text => setQuery(text)}
            />
        </Column>
    );
};
