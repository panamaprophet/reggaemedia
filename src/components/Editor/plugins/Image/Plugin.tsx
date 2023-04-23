import { $wrapNodeInElement } from '@lexical/utils';
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
} from 'lexical';

import { $createImageNode, ImagePayload } from './node';
import { INSERT_IMAGE_COMMAND } from './command';
import { useRegisterCommand } from '../../hooks/useLexicalHooks';


export const ImagePlugin = (): JSX.Element | null => {
    useRegisterCommand(
        INSERT_IMAGE_COMMAND,
        (payload: ImagePayload) => {
            const imageNode = $createImageNode(payload);
            $insertNodes([imageNode]);
            if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
            }

            return true;
        },
        COMMAND_PRIORITY_EDITOR
    )

    return null;
}
