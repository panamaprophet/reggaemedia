export interface User {
    id: string,
    role: 'admin' | 'user',
    name: string,
}

export interface Article {
    id: string,
    authorId: User['id'],

    title: string,
    body: {
        [k: string]: unknown,
    },
    tags: string[],

    createdOn: number,
    updatedOn: number,
    // @todo: consider publishedOn: number,

    alias?: string,
    isPublished: boolean,

    // @todo: define assets: [{ id: string }]
}
