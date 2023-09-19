'use client';

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
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            >
                <Column className="items-center justify-center gap-4">
                    <p className="text-3xl p-4 pt-8">Поиск по тегу</p>
                    <div className="gap-x-16 md:columns-4 columns-2">
                        {tags.map((tag, index) => (
                            <Link className='capitalize text-sky-600 block' key={tag + index} to={`/articles/tags/${tag}`}>
                                {tag}
                            </Link>
                        ))}
                    </div>
                </Column >
            </Modal>
        </>
    );
};
