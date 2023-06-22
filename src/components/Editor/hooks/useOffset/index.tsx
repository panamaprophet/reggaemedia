import { useState, useEffect } from 'react';

const getCurrentSelectionOffset = () => {
    try {
        const offset = window.getSelection()?.getRangeAt(0)?.getClientRects()?.[0]!;
    
        return {
            top: offset.top + offset.height,
            left: offset.left,
        };
    } catch (e) {
        return { top: 0, left: 0 };
    }
};

const useSelectionOffset = () => {
    const [offset, setOffset] = useState(getCurrentSelectionOffset());

    const refreshOffset = () => setOffset(getCurrentSelectionOffset());

    useEffect(() => {
        const updateOffset = () => setOffset(getCurrentSelectionOffset());

        window.addEventListener('resize', updateOffset);
        window.addEventListener('scroll', updateOffset);

        return () => {
            window.removeEventListener('resize', updateOffset);
            window.removeEventListener('scroll', updateOffset);
        };
    }, []);

    return [offset, refreshOffset] as const;
}

export default useSelectionOffset;
