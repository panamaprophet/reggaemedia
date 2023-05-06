export const cx = (...args: unknown[]) =>
    args
        .filter(Boolean)
        .filter(value => typeof value !== 'object')
        .join(' ');

export const getCurrentYear = () => new Date().getFullYear();
