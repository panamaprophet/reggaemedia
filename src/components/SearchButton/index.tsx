
import { Search } from "../Icons/Search";
import { Close } from "../Icons/Close";
import { Button } from "../Button";


interface Props {
    isSearch: boolean,
    onClick: () => void,
}

export const SearchButton = ({ isSearch, onClick }: Props) => {
    return (
        <Button onClick={onClick}>
            {isSearch ? <Search size={16} /> : <Close size={16} />}
        </Button>

    );
};
