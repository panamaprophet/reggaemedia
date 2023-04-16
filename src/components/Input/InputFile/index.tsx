import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';


interface Props {
    multiple?: boolean,
    maxSize?: number,
    onChange: (files: File[] | File) => void,
};

const MESSAGE_RESET_TIMEOUT = 4200;
const DEFAULT_MAX_SIZE = 1024 * 1024

export const InputFile = ({ multiple = false, onChange, maxSize = DEFAULT_MAX_SIZE }: Props) => {
    const [isError, setError] = useState(false);

    const _onChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {

        if (!event.target.files) {
            console.warn('no files was selected');
            return;
        }

        if (!event.target.files[0]) {
            return;
        }

        if (event.target.files[0].size > maxSize) {
            setError(true);

            return;
        }

        multiple
            ? onChange(Array.from(event.target.files))
            : onChange(event.target.files[0]);
    }

    useEffect(() => {
        if (!isError) { return };

        const id = setTimeout(() => setError(false), MESSAGE_RESET_TIMEOUT);

        return () => clearTimeout(id);
    }, [isError])

    return (
        <label>
            <input
                type="file"
                multiple={multiple}
                onChange={_onChange}
            />
        </label>
    );
};
