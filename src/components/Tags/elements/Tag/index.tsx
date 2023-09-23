import { Button } from '@/components/Button';
import { Close } from '@/components/Icons/Close';
import { Input } from '../Input';


interface Props {
    value: string,
    onChange: (value: string) => void,
    onRemove: () => void,
}

export const Tag = ({ value, onChange, onRemove }: Props) => (
    <Button theme="secondary" size="small">
        <div className="flex items-center">
            <Input value={value} onChange={onChange} />

            <div onClick={onRemove}>
                <Close size="xs" />
            </div>
        </div>
    </Button>
);
