import { Children, ReactNode } from 'react';


interface Props {
    children: ReactNode,
    type?: 'default' | 'numeric' | 'bullet',
    align?: string,
    wrap?: boolean,
    className?: string,
}

export const List = ({
    children,
    className
}: Props) => (
    <ul className={[className].join(' ')}>
        {Children.map(children, (child, index) => (
            <li key={index}>{child}</li>
        ))}
    </ul>
);
