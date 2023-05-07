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

import { ImageNode } from './node';
import { INSERT_IMAGE_FILE_COMMAND, INSERT_IMAGE_URL_COMMAND, RESIZE_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { $isImageNode } from './node';


interface Props {
    onUpload: (file: File) => Promise<string>,
}

export const ImagePlugin = ({ onUpload }: Props): JSX.Element | null => {
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

    useRegisterCommand(
        INSERT_IMAGE_FILE_COMMAND,
        (file: File) => {
            const image = {
                id: String(Math.random()),
                src: URL.createObjectURL(file),
                alt: '',
            };
            const imageNode = new ImageNode(image);

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
            const imageNode = new ImageNode({ src, alt: '' });

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

    return null;
}
