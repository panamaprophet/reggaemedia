export type IconProps = {
    size?: keyof typeof IconSize,
    color?: string,
}

const IconSize = {
    xs: 'w-4 h-4', // 16px
    sm: 'w-5 h-5', // 20px
    lg: 'w-6 h-6', // 24px
    xl: 'w-8 h-8', // 32px
};

export const getIconSize = (size: keyof typeof IconSize) => IconSize[size] || IconSize['xs'];
