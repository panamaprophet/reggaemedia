import { $insertNodeToNearestRoot } from '@lexical/utils';
import { LexicalEditor } from 'lexical';
import { EmbedNode } from '../node';

interface Props {
    source: string,
    editor?: LexicalEditor,
}

export const embedImageUrl = ({ source }: Props) => {
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

export const embedYoutube = ({ source }: Props) => {
    const url = new URL(source);
    const { searchParams } = url;

    const videoId = searchParams.get('v');
    const playlistId = searchParams.get('list');
    const startTime = searchParams.get('t');

    let src = 'https://www.youtube.com/embed/';

    if (playlistId) {
        src += `videoseries?list=${playlistId}`;
    } else {
        src += videoId;
    }

    if (startTime) {
        const separator = src.includes('?') ? '&' : '?';

        src += `${separator}start=${parseInt(startTime)}`;
    }

    const embedNode = new EmbedNode({
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
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


export const embedSoundcloud = ({ source, editor }: Props) => {
    const embedNode = new EmbedNode({
        thumbnail: '',
        width: 500,
        height: 165,
        contentType: 'soundcloud',
        alt: '',
        src: '',
    });

    getSoundcloudEmbedUrl(source).then(src => editor?.update(() => embedNode.setSrc(src)));

    $insertNodeToNearestRoot(embedNode);

    return true;
};


export const embedInstagram = ({ source }: Props) => {
    const url = source.split('?')[0];

    const embedNode = new EmbedNode({
        thumbnail: '',
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
    const embedNode = new EmbedNode({
        thumbnail: URL.createObjectURL(source),
        src: URL.createObjectURL(source),
        alt: '',
        contentType: 'image',
        width: 300,
        height: 300,
    });

    onUpload(source).then(src => editor.update(() => embedNode.setSrc(src)));

    $insertNodeToNearestRoot(embedNode);

    return true;
}
