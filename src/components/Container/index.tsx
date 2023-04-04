import { ReactNode } from 'react'


interface Props {
    children: ReactNode,
}

// {
//     margin: 0 auto;
//     max - width: 1190px;
//     padding: 0 25px;
//     position: relative;
//     width: 100 %;
// }

export const Container = ({ children }: Props) => {
    return (
        <div className="w-full max-w-6xl">
            {children}
        </div>
    );
};
