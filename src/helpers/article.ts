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
}>({ updatedOn, createdOn }: T, showTime?: boolean) => {
    const target = new Date(updatedOn || createdOn);

    const date = target.toLocaleDateString('ru-RU');
    const time = target.toLocaleTimeString('ru-RU');

    return showTime ? `${date} ${time}` : date;
};
