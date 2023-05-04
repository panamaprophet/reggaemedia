export const cx = (...args: string[]) => args.filter(Boolean).join(' ');

export const getCurrentYear = () => new Date().getFullYear();

export const isString = (value: any): value is string => typeof value === 'string';
