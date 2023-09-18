import { SerializedEditorState } from 'lexical';


export interface User {
    id: UUID,
    name: string,
    email: string,
}

export interface Article {
    id: UUID,
    authorId: User['id'],

    title: string,
    body: SerializedEditorState,
    tags: string[],

    createdOn: number,
    updatedOn: number,
    publishedOn?: number,

    alias?: string,
}
