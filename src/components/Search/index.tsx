import { useEffect, useState } from 'react';
import { Column } from '../Layout';
import { Button } from '../Button';
import { Search as SearchIcon } from '../Icons/Search';
import { Modal } from '../Modal';
import { Close } from '../Icons/Close';
import { getTags } from '@/actions/articles';
import { Link } from '../Link';


export const Search = () => {
    const [isOpen, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const Icon = isOpen ? Close : SearchIcon;

    useEffect(() => {
        if (isOpen && tags.length === 0) {
            getTags().then(setTags);
        }
    }, [isOpen, tags]);

    return (
        <>
            <Button onClick={() => setOpen(!isOpen)}>
                <Icon />
            </Button>

            <Modal
                isOpen={isOpen} onClose={() => setOpen(false)}
            >
                <Column className="items-center justify-center gap-4">
                    <p className="text-xs uppercase">Поиск по тегу</p>
                    {tags.map((tag) => (
                        <Link className='capitalize text-sky-600' key={tag} to={`/articles/tags/${tag}`}>
                            {tag}
                        </Link>
                    ))}
                </Column >
            </Modal>
        </>
    );
};
