import { EditorState } from 'lexical'

export type EditorEntity = {
    editorState: EditorState,
}

export type CustomUpdateListener = (prop: EditorEntity) => boolean;
