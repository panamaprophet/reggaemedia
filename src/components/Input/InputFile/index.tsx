import { ChangeEvent, ChangeEventHandler } from 'react';


interface Props {
    multiple?: boolean,
    onChange: (files: File[] | File) => void,
};

export const InputFile = ({ multiple = false, onChange }: Props) => {
    const _onChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            console.warn('no files was selected');
            return;
        }

        const files = Array.from(event.target.files);
        // @todo: bring back max size check
        // const size = files.reduce((size, file) => file.size + size, 0);

        onChange(files);
    }

    return (
        <label>
            <input
                className='w-full'
                type="file"
                multiple={multiple}
                onChange={_onChange}
            />
        </label>
    );
};
