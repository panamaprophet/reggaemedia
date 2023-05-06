import { useSession } from 'next-auth/react';


// returns the tuple consisting of userId and user object
export const useUserId = () => {
    const session = useSession();

    return [
        session.data?.user?.id,
        session.data?.user,
    ];
};
