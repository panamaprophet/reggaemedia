import { useRef } from 'react';
import Image from 'next/image';
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW, ElementFormatType, NodeKey } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { useRegisterCommand } from '@/components/Editor/hooks/useRegisterCommand';
import { useResize } from '@/components/Editor/hooks/useResize';
import { RESIZE_EMBED_COMMAND } from '../command';
import { EmbedProps } from '../node';
import InstagramStub from '../images/instagram-stub.png';
import SoundcloudStub from '../images/soundcloud-stub.png';


type Props = Omit<EmbedProps, 'src'> & { resizable: boolean, nodeKey: NodeKey, format: ElementFormatType }

const getPlaceholder = (props: Props) => {
    switch (props.contentType) {
        case 'soundcloud':
            return SoundcloudStub;
        case 'instagram':
            return InstagramStub;
        default:
            return props.thumbnail;
    }
};


export const EmbedComponent = (props: Props): JSX.Element => {
    const [editor] = useLexicalComposerContext();
    const ref = useRef<HTMLImageElement | null>(null);
    const placeholder = getPlaceholder(props);

    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(props.nodeKey);
    const [isResizing, Markers, { width, height }] = useResize({
        keepAspectRatio: props.contentType !== 'image',
        isSelected,
        width: props.width,
        height: props.height,
        callback: (size) => editor.dispatchCommand(RESIZE_EMBED_COMMAND, { ...size, key: props.nodeKey }),
    });


    const handleMouseClick = (event: MouseEvent) => {
        if (isResizing) {
            return true;
        }

        if (event.target === ref.current) {
            clearSelection();
            setSelected(true);

            return true;
        }

        return false;
    }

    useRegisterCommand(CLICK_COMMAND, handleMouseClick, COMMAND_PRIORITY_LOW);

    return (
        <BlockWithAlignableContents
            format={props.format}
            nodeKey={props.nodeKey}
            className={{
                base: '',
                focus: 'outline-sky-600',
            }}
        >
            <div className="relative inline-block select-none" style={{ width, height }}>
                <Image
                    fill
                    src={placeholder}
                    alt={props.alt}
                    ref={ref}
                />
                {Markers}
            </div>
        </BlockWithAlignableContents>
    );
}
