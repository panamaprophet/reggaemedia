import { useState } from 'react';
import { useRouter } from 'next/router';


// returns the article id from the current location query
export const useArticleId = () => {
    const { query } = useRouter();
    const { id: ids } = query;

    const id = Array.isArray(ids) ? ids[0] : ids;

    return useState<string | undefined>(id !== 'new' ? id : undefined);
};
