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
import { INSERT_IMAGE_FILE_COMMAND, INSERT_IMAGE_URL_COMMAND, INSERT_INSTAGRAM_COMMAND, INSERT_SOUNDCLOUD_COMMAND, INSERT_YOUTUBE_COMMAND, RESIZE_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { $isEmbedNode } from './node';


interface Props {
    onUpload: (file: File) => Promise<string>,
}

export const EmbedPlugin = ({ onUpload }: Props): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

    const handlePlaceholder = async (key: NodeKey, file: File) => {
        const url = await onUpload(file);

        editor.update(() => {
            const image = $getNodeByKey(key);

            if ($isEmbedNode(image)) {
                image.setSrc(url);
            }
        })
    };

    const handleSoundcloud = async (key: NodeKey, trackUrl: string) => {
        const url = `https://soundcloud.com/oembed?format=json&url=${trackUrl}`;
        const response = await fetch(url, { method: 'GET' }).then(response => response.json());
        const html = new DOMParser().parseFromString(response.html, 'text/html');
        const iframe = html.querySelector('iframe') as HTMLIFrameElement;
        const src = iframe.getAttribute('src') as string;

        editor.update(() => {
            const node = $getNodeByKey(key);

            if ($isEmbedNode(node)) {
                node.setWidthAndHeight(600, response.height);
                node.setEmbedUrl(encodeURIComponent(src));
            }
        })
    };

    const handleInstagram = async (key: NodeKey, instagramUrl: string) => {
        const url = instagramUrl.split('?')[0];

        editor.update(() => {
            const node = $getNodeByKey(key);

            if ($isEmbedNode(node)) {
                node.setEmbedUrl(encodeURIComponent(`${url}embed`));
            }
        });
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
            const embedNode = new EmbedNode(image);

            handlePlaceholder(embedNode.__key, file);

            $insertNodes([embedNode]);

            if ($isRootOrShadowRoot(embedNode.getParentOrThrow())) {
                $wrapNodeInElement(embedNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_IMAGE_URL_COMMAND,
        (src: string) => {
            const embedNode = new EmbedNode({
                thumbnail: encodeURIComponent(src),
                width: 300,
                height: 300,
                contentType: 'image',
                alt: '',
            });

            $insertNodes([embedNode]);

            if ($isRootOrShadowRoot(embedNode.getParentOrThrow())) {
                $wrapNodeInElement(embedNode, $createParagraphNode).selectEnd();
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

                if ($isEmbedNode(node)) {
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
                embedUrl += `videoseries?list=${queryParams.get('list')}`;
            } else if (queryParams.get('v')) {
                embedUrl += queryParams.get('v');
            }

            const embedNode = new EmbedNode({
                thumbnail: `https://img.youtube.com/vi/${queryParams.get('v')}/hqdefault.jpg`,
                width: 560,
                height: 315,
                contentType: 'youtube',
                alt: '',
                embedUrl,
            });

            $insertNodes([embedNode]);

            if ($isRootOrShadowRoot(embedNode.getParentOrThrow())) {
                $wrapNodeInElement(embedNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_SOUNDCLOUD_COMMAND,
        (link: string) => {
            const embedNode = new EmbedNode({
                thumbnail: '/SoundcloudSkeleton.png',
                width: 500,
                height: 165,
                contentType: 'soundcloud',
                alt: '',
                embedUrl: '',
            });

            handleSoundcloud(embedNode.__key, link);

            $insertNodes([embedNode]);

            if ($isRootOrShadowRoot(embedNode.getParentOrThrow())) {
                $wrapNodeInElement(embedNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    useRegisterCommand(
        INSERT_INSTAGRAM_COMMAND,
        (link: string) => {
            const imageNode = new EmbedNode({
                thumbnail: '/InstagramSkeleton.png',
                width: 470,
                height: 760,
                contentType: 'instagram',
                alt: '',
                embedUrl: '',
            });

            handleInstagram(imageNode.__key, link);

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
