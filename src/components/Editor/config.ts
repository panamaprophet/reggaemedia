import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import { onError } from '.';
import { theme } from '@/theme';
import { EmbedNode } from './plugins';
import * as CutterPlugin from './plugins/Cutter';


export const staticConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        LinkNode,
        AutoLinkNode,
        QuoteNode,
        EmbedNode,
        CutterPlugin.Node,
    ],
};
