import { useState, useEffect } from 'react';

const getCurrentSelectionOffset = () => {
    const offset = window.getSelection()?.getRangeAt(0)?.getClientRects()?.[0];

    if (!offset) {
        return { top: 0, left: 0 };
    }

    return {
        top: offset.top + offset.height,
        left: offset.left,
    };
};

const useSelectionOffset = () => {
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

export default useSelectionOffset;
