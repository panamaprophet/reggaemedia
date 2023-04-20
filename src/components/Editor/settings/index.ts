export const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    number: 'Numbered List',
    paragraph: 'Paragrapgh',
    quote: 'Quote',
};

export const rootTypeToRootName = {
    root: 'Root',
    table: 'Table',
};

export const FONT_FAMILY_OPTIONS: [string, string][] = [
    ['Arial', 'Arial'],
    ['Courier New', 'Courier New'],
    ['Georgia', 'Georgia'],
    ['Times New Roman', 'Times New Roman'],
    ['Trebuchet MS', 'Trebuchet MS'],
    ['Verdana', 'Verdana'],
];

export const FONT_SIZE_OPTIONS: [string, string][] = [
    ['10px', '10px'],
    ['11px', '11px'],
    ['12px', '12px'],
    ['13px', '13px'],
    ['14px', '14px'],
    ['15px', '15px'],
    ['16px', '16px'],
    ['17px', '17px'],
    ['18px', '18px'],
    ['19px', '19px'],
    ['20px', '20px'],
];

export const dropDownActiveClass = (active: boolean) => {
    if (active) return 'bg-gray-200';
    else return '';
}
