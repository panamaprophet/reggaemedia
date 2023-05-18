import {
    COMMAND_PRIORITY_EDITOR,
    $getNodeByKey,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { INSERT_EMBED_COMMAND, RESIZE_EMBED_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { $isEmbedNode } from './node';
import { embedImageFile, embedImageUrl, embedInstagram, embedSoundcloud, embedYoutube } from './helpers';


interface Props {
    onUpload: (file: File) => Promise<string>,
}

export const EmbedPlugin = ({ onUpload }: Props): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

    useRegisterCommand(
        RESIZE_EMBED_COMMAND,
        (payload: { width: number, height: number, key: string }) => {
            editor.update(() => {
                const { width, height, key } = payload;
                const node = $getNodeByKey(key);

                if ($isEmbedNode(node)) {
                    node.setWidthAndHeight(width, height);
                }
            })

            return false;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_EMBED_COMMAND,
        ({ type, source }: { type: string, source: string } | { type: 'image', source: File | string }) => {
            switch (type) {
                case 'instagram':
                    return embedInstagram({ source });
                case 'soundcloud':
                    return embedSoundcloud({ source, editor });
                case 'youtube':
                    return embedYoutube({ source });
                case 'image':
                    return typeof source === 'string' ? embedImageUrl({ source, editor }) : embedImageFile(editor, source, onUpload);
                default:
                    return false;
            }

            return true;
        },
    );

    return null;
}
