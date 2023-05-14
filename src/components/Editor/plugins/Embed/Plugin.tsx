import { $wrapNodeInElement } from '@lexical/utils';
import {
    $insertNodes,
    $isRootOrShadowRoot,
    $createParagraphNode,
    COMMAND_PRIORITY_EDITOR,
    $getNodeByKey,
    NodeKey,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { EmbedNode, ImagePayload } from './node';
import { INSERT_IMAGE_FILE_COMMAND, INSERT_IMAGE_URL_COMMAND, INSERT_SOUNDCLOUD_COMMAND, INSERT_YOUTUBE_COMMAND, RESIZE_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { $isImageNode } from './node';


interface Props {
    onUpload: (file: File) => Promise<string>,
}

export const EmbedPlugin = ({ onUpload }: Props): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

    const handlePlaceholder = async (key: NodeKey, file: File) => {
        const url = await onUpload(file);

        editor.update(() => {
            const image = $getNodeByKey(key);

            if ($isImageNode(image)) {
                image.setSrc(url);
            }
        })
    };

    const handleSoundcloud = async (_key: NodeKey, trackUrl: string) => {
        const url = `https://soundcloud.com/oembed?format=json&url=${trackUrl}`;
        const response = await fetch(url, { method: 'GET' }).then(response => response.json());

        console.log(response);
    };

    useRegisterCommand(
        INSERT_IMAGE_FILE_COMMAND,
        (file: File) => {
            const image: ImagePayload = {
                thumbnail: URL.createObjectURL(file),
                alt: '',
                contentType: 'image',
                width: 300,
                height: 300,
            };
            const imageNode = new EmbedNode(image);

            handlePlaceholder(imageNode.__key, file);

            $insertNodes([imageNode]);

            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_IMAGE_URL_COMMAND,
        (src: string) => {
            const imageNode = new EmbedNode({
                thumbnail: src,
                width: 300,
                height: 300,
                contentType: 'image',
                alt: '',
            });

            $insertNodes([imageNode]);

            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        RESIZE_IMAGE_COMMAND,
        (payload: { width: number, height: number, key: string }) => {
            editor.update(() => {
                const { width, height, key } = payload;
                const node = $getNodeByKey(key);

                if ($isImageNode(node)) {
                    node.setWidthAndHeight(width, height);
                }
            })

            return false;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_YOUTUBE_COMMAND,
        (link: string) => {
            const url = new URL(link);
            const queryParams = new URLSearchParams(url.search);
            let embedUrl = 'https://www.youtube.com/embed/';

            if (queryParams.get('list')) {
                embedUrl += `videoseries?list=${queryParams.get('list')}`
            } else if (queryParams.get('v')) {
                embedUrl += queryParams.get('v')
            }

            const imageNode = new EmbedNode({
                thumbnail: `https://img.youtube.com/vi/${queryParams.get('v')}/hqdefault.jpg`,
                width: 560,
                height: 315,
                contentType: 'youtube',
                alt: '',
                embedUrl,
            });

            $insertNodes([imageNode]);

            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_SOUNDCLOUD_COMMAND,
        (link: string) => {
            const imageNode = new EmbedNode({
                thumbnail: '/SoundcloudSkeleton.png',
                width: 200,
                height: 66,
                contentType: 'soundcloud',
                alt: '',
                embedUrl: '',
            });

            handleSoundcloud(imageNode.__key, link);

            $insertNodes([imageNode]);

            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    return null;
}
