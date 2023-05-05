import { $wrapNodeInElement } from '@lexical/utils';
import {
    $insertNodes,
    $isRootOrShadowRoot,
    $createParagraphNode,
    COMMAND_PRIORITY_EDITOR,
    $getNodeByKey,
} from 'lexical';

import { ImageNode, ImagePayload } from './node';
import { INSERT_IMAGE_COMMAND, RESIZE_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { useRegisterListener } from '../../hooks/useRegisterListener';
import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isImageNode } from './node';

const mockRemove = (id: string) => console.log('Node with id:', id, 'successfully removed');

type ImageInfo = {
    id: string;
    key: string;
}

export const ImagePlugin = (): JSX.Element | null => {
    const [editor] = useLexicalComposerContext();
    const [images, setImages] = useState<ImageInfo[]>([]);

    useRegisterCommand(
        INSERT_IMAGE_COMMAND,
        (payload: ImagePayload) => {
            const imageNode = new ImageNode(payload);
            const imageInfo = { key: imageNode.__key, id: payload.id };

            setImages((prev) => [...prev, imageInfo]);
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

    useRegisterListener(
        'onMutation',
        [
            ImageNode,
            (mutatedNodes) => {
                for (let [nodeKey, mutation] of mutatedNodes) {
                    if (mutation === 'destroyed') {
                        const imageInfo = images.find((item) => item.key === nodeKey);

                        if (imageInfo) {
                            mockRemove(imageInfo.id);

                            setImages(prev => prev.filter((image) => image.id === imageInfo.id));
                        }
                    }
                }
            }
        ]
    )

    return null;
}
