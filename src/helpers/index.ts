export const cx = (...args: unknown[]) => args.filter(Boolean).join(' ');

export const getCurrentYear = () => new Date().getFullYear();
