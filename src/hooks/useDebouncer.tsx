import { useEffect, useState } from 'react';

export const useDebouncer = <T,>(value: T, delay: number) => {
    const [debauncedValue, setDebauncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebauncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debauncedValue;
}
