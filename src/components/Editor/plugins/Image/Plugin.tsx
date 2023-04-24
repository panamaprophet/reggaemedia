import { $wrapNodeInElement } from '@lexical/utils';
import {
    $insertNodes,
    $isRootOrShadowRoot,
    $createParagraphNode,
    COMMAND_PRIORITY_EDITOR,
} from 'lexical';

import { ImageNode, ImagePayload } from './node';
import { INSERT_IMAGE_COMMAND } from './command';
import { useRegisterCommand, useRegisterListener } from '../../hooks/useLexicalHooks';
import { useState } from 'react';

const mockRemove = (id: string) => console.log('Node with id:', id, 'successfully removed');

type ImageInfo = {
    id: string;
    key: string;
}

export const ImagePlugin = (): JSX.Element | null => {
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
                        }
                    }
                }
            }
        ]
    )

    return null;
}
