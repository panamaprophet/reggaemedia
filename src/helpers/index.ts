import { SerializedLexicalNode } from 'lexical';


export const cx = (...args: unknown[]) => args.filter(Boolean).join(' ');

export const getCurrentYear = () => new Date().getFullYear();


const filterList = ['direction', 'indent', 'mode', 'detail'];

export const normalizeArticle = (node: SerializedLexicalNode) => {
    let result: any = { ...node };

    const hasChildren = 'children' in result && Array.isArray(result.children);

    if (hasChildren) {
        result.children = result.children.map(normalizeArticle);
    }

    // replace empty paragraphs with br
    if (result.type === 'paragraph' && result.children.length === 0) {
        result.children = [{ type: 'linebreak', version: 1 }];
    }

    // keep minimal required data
    result = Object.fromEntries(
        Object
            .entries(result)
            .filter(([key]) => !filterList.includes(key))
    );

    return result;
};
