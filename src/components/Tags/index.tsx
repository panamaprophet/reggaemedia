import { Tag } from './elements/Tag';
import { Input } from './elements/Input';
import { removeByIndex, setByIndex } from '@/helpers';


export const Tags = ({ value = [], onChange }: { value: string[], onChange: (value: string[]) => void }) => {
    const onKeyDown = (code: string, currentValue: string) => {
        if (code === 'Backspace' && !currentValue) {
            onChange([...value].slice(0, -1));
        }
    }

    return (
        <div className="flex items-center gap-2 p-4">
            {value.map((tag, index) => (
                <Tag
                    key={`${tag}_${index}`}
                    value={tag}
                    onChange={changes => onChange(setByIndex(index, changes, value))}
                    onRemove={() => onChange(removeByIndex(index, value))}
                />
            ))}

            <Input
                onChange={(newTag) => onChange([...value, newTag])}
                onKeyDown={onKeyDown}
                placeholder="Тег"
            />
        </div>
    )
};
