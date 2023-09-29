'use client';

import { useEffect, useState } from 'react';
import { Search as SearchIcon } from '@/components/Icons/Search';
import { Cross } from '@/components/Icons/Cross';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Link } from '@/components/Link';
import { getTags } from '@/actions/articles';

export const Search = () => {
    const [isOpen, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const Icon = isOpen ? Cross : SearchIcon;

    useEffect(() => {
        if (isOpen && tags.length === 0) {
            getTags().then((result) => setTags(result.tags));
        }
    }, [isOpen, tags]);

    return (
        <>
            <Button size="small" onClick={() => setOpen(!isOpen)}>
                <Icon />
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-3xl p-4 pt-8">Поиск по тегу</p>
                    <div className="gap-x-16 md:columns-4 columns-2">
                        {tags.map((tag, index) => (
                            <Link className='capitalize text-sky-600 block' key={tag + index} to={`/articles/tags/${tag}`}>
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div >
            </Modal>
        </>
    );
};
