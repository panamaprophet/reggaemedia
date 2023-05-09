import { useEffect, useId, useState } from 'react';
import { Close } from '../Icons/Close'
import { InputText } from '../Input/InputText';


interface Props {
    onChange: (tags: string[]) => void,
}

export const Tags = ({ onChange }: Props) => {
    const [tags, setTags] = useState<string[]>([]);
    const [value, setValue] = useState('');
    const id = useId();

    useEffect(() => {
        if (value.at(-1) === ' ') {
            setTags(prev => [...prev, value.trim()])
            setValue('');
        }

        onChange(tags);
    }, [value, tags]);

    return (
        <div className="flex gap-1">
            {tags.length !== 0 && ( // Without this check block with padding remains in dom
                <div className="flex gap-1 pl-4">
                    {tags.map((tag, index) => (
                        <div
                            key={`${id}-${tag}-${index}`}
                            className="
                                flex
                                items-center
                                justify-center
                                my-2
                                px-2
                                gap-2
                                border
                                rounded
                            ">
                            <p className=" text-sm whitespace-nowrap font-bold">{tag}</p>
                            <div
                                className="cursor-pointer"
                                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                            >
                                <Close size={10} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <InputText
                value={value}
                onChange={(text) => setValue(text)}
                placeholder="Теги"
                className="max-w-full w-full focus:outline-none text-normal p-4"
            />
        </div>
    )
}
