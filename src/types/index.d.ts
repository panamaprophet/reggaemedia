import { SerializedEditorState } from 'lexical';


export interface User {
    id: string,
    name: string,
    email: string,
}

export interface Article {
    id: string,
    authorId: User['id'],

    title: string,
    body: SerializedEditorState,
    tags: string[],

    createdOn: number,
    updatedOn: number,
    publishedOn?: number,

    alias?: string,
}
