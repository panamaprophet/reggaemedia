import { $insertNodeToNearestRoot } from '@lexical/utils';
import { LexicalEditor } from 'lexical';
import { EmbedNode, ImagePayload } from '../node';

export const embedImageUrl = (source: string, _context: { editor: LexicalEditor }) => {
    const embedNode = new EmbedNode({
        thumbnail: source,
        src: source,
        width: 300,
        height: 300,
        contentType: 'image',
        alt: '',
    });

    $insertNodeToNearestRoot(embedNode);

    return true;
};

export const embedYoutube = (source: string, _context: { editor: LexicalEditor }) => {
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


export const embedSoundcloud = (source: string, { editor }: { editor: LexicalEditor }) => {
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


export const embedInstagram = (source: string, _context: { editor: LexicalEditor }) => {
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

export const embedImageFile = (editor: LexicalEditor, source: File, onUpload: (source: File) => Promise<string>) => {
    const image: ImagePayload = {
        thumbnail: URL.createObjectURL(source),
        alt: '',
        contentType: 'image',
        width: 300,
        height: 300,
    };
    const embedNode = new EmbedNode(image);

    onUpload(source).then(src => editor.update(() => embedNode.setSrc(src)));

    $insertNodeToNearestRoot(embedNode);

    return true;
}
