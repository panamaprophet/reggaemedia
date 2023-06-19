import { useState, useEffect } from 'react';
import { getCurrentSelectionOffset } from '../../plugins/FloatLink/helpers';

const useOffset = () => {
    const [offset, setOffset] = useState(getCurrentSelectionOffset());

    useEffect(() => {
        const updateOffset = () => setOffset(getCurrentSelectionOffset());

        window.addEventListener('resize', updateOffset);
        window.addEventListener('scroll', updateOffset);

        return () => {
            window.removeEventListener('resize', updateOffset);
            window.removeEventListener('scroll', updateOffset);
        };
    }, []);

    return offset;
}

export default useOffset;
