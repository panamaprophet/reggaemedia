import { $insertNodeToNearestRoot, $wrapNodeInElement } from '@lexical/utils';
import {
    $insertNodes,
    $isRootOrShadowRoot,
    $createParagraphNode,
    COMMAND_PRIORITY_EDITOR,
    $getNodeByKey,
    NodeKey,
    LexicalEditor,
    LexicalNode,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { EmbedNode, ImagePayload } from './node';
import { INSERT_EMBED_COMMAND, INSERT_IMAGE_FILE_COMMAND, INSERT_IMAGE_URL_COMMAND, INSERT_INSTAGRAM_COMMAND, INSERT_SOUNDCLOUD_COMMAND, INSERT_YOUTUBE_COMMAND, RESIZE_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { $isEmbedNode } from './node';


interface Props {
    onUpload: (file: File) => Promise<string>,
}

const embedImageFile = (editor: LexicalEditor, source: File, onUpload: any) => {
    // const image: ImagePayload = {
    //     thumbnail: URL.createObjectURL(source),
    //     alt: '',
    //     contentType: 'image',
    //     width: 300,
    //     height: 300,
    // };
    // const embedNode = new EmbedNode(image);

    // const url = await onUpload(file);

    // editor.update(() => {
    //     const image = $getNodeByKey(key);

    //     if ($isEmbedNode(image)) {
    //         image.setSrc(url);
    //     }
    // })

    // $insertNodes([embedNode]);

    // if ($isRootOrShadowRoot(embedNode.getParentOrThrow())) {
    //     $wrapNodeInElement(embedNode, $createParagraphNode).selectEnd();
    // }

    // return true;
}

const embedImageUrl = (editor: LexicalEditor, source: string) => {
    const embedNode = new EmbedNode({
        thumbnail: encodeURIComponent(source),
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
};

const embedYoutube = (source: string, context: { editor: LexicalEditor }) => {
    const url = new URL(source);
    const queryParams = new URLSearchParams(url.search);

    let src = 'https://www.youtube.com/embed/';

    if (queryParams.get('list')) {
        src += `videoseries?list=${queryParams.get('list')}`;
    } else if (queryParams.get('v')) {
        src += queryParams.get('v');
    }

    const embedNode = new EmbedNode({
        thumbnail: `https://img.youtube.com/vi/${queryParams.get('v')}/hqdefault.jpg`,
        width: 560,
        height: 315,
        contentType: 'youtube',
        alt: '',
        src: encodeURIComponent(src),
    });

    $insertNodeToNearestRoot(embedNode);

    return true;
};


const getSoundcloudEmbedUrl = (source: string) =>
    fetch(`https://soundcloud.com/oembed?format=json&url=${source}`)
        .then(response => response.json())
        .then(response => new DOMParser().parseFromString(response.html, 'text/html'))
        .then(html => html.querySelector('iframe')!.getAttribute('src')!);


const embedSoundcloud = (source: string, { editor }: { editor: LexicalEditor }) => {
    const embedNode = new EmbedNode({
        thumbnail: '/SoundcloudSkeleton.png',
        width: 500,
        height: 165,
        contentType: 'soundcloud',
        alt: '',
        src: '',
    });

    getSoundcloudEmbedUrl(source).then(src => editor.update(() => embedNode.setSrc(src)));

    $insertNodeToNearestRoot(embedNode);

    return true;
};


const embedInstagram = (source: string, context: { editor: LexicalEditor }) => {
    const url = source.split('?')[0];

    const embedNode = new EmbedNode({
        thumbnail: '/InstagramSkeleton.png',
        width: 470,
        height: 760,
        contentType: 'instagram',
        alt: '',
        src: encodeURIComponent(`${url}embed`),
    });

    $insertNodeToNearestRoot(embedNode);

    return true;
};


export const EmbedPlugin = ({ onUpload }: Props): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();

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
        INSERT_EMBED_COMMAND,
        ({ type, source }: { type: string, source: string }) => {
            switch (type) {
                case 'instagram':
                    return embedInstagram(source, { editor });
                case 'soundcloud':
                    return embedSoundcloud(source, { editor });
                case 'youtube':
                    return embedYoutube(source, { editor });
                case 'image':
                // return typeof source === 'string' ? embedImageUrl(source) : embedImageFile(source, onUpload);
                default:
                    return false;
            }

            return true;
        },
    );

    return null;
}
