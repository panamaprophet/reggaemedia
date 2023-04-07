export const cx = (...args: string[]) => args.filter(Boolean).join(' ');

export const getCurrentYear = () => new Date().getFullYear();
