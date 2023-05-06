import { SerializedLexicalNode } from 'lexical';


const filterList = ['direction', 'indent', 'mode', 'detail'];

export const normalize = (node: SerializedLexicalNode) => {
    let result: any = { ...node };

    const hasChildren = 'children' in result && Array.isArray(result.children);

    if (hasChildren) {
        result.children = result.children.map(normalize);
    }

    // keep minimal required data
    result = Object.fromEntries(
        Object
            .entries(result)
            .filter(([key]) => !filterList.includes(key))
    );

    return result;
};

export const formatArticleDate = <T extends {
    updatedOn: number,
    createdOn: number,
}>({ updatedOn, createdOn }: T) => {
    return (new Date(updatedOn || createdOn)).toLocaleString('ru-RU');
};
