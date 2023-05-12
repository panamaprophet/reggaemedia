import { $insertNodeToNearestRoot } from '@lexical/utils';
import {
    COMMAND_PRIORITY_EDITOR,
    $getNodeByKey,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $isYouTubeNode, YouTubeNode } from './node'
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { INSERT_YOUTUBE_COMMAND, RESIZE_YOUTUBE_COMMAND } from './command';


export const YouTubePlugin = (): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

    useRegisterCommand(
        INSERT_YOUTUBE_COMMAND,
        (link: string) => {
            const url = new URL(link)
            const queryParams = new URLSearchParams(url.search);
            const youTubeNode = new YouTubeNode({ videoID: queryParams.get('v') });

            $insertNodeToNearestRoot(youTubeNode);

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        RESIZE_YOUTUBE_COMMAND,
        (payload: { width: number, height: number, key: string }) => {
            editor.update(() => {
                const { width, height, key } = payload;
                const node = $getNodeByKey(key);

                if ($isYouTubeNode(node)) {
                    node.setWidthAndHeight(width, height);
                }
            })

            return false;
        },
        COMMAND_PRIORITY_EDITOR
    );

    return null;
}
