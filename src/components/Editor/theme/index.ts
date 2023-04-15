const theme = {
    paragraph: 'mb-1',
    quote: 'text-slate-300',
    heading: {
        h1: 'text-3xl',
        h2: 'text-2xl',
        h3: 'text-xl',
    },
    list: {
        nested: {
            listitem: 'ml-4',
        },
        ol: 'list-decimal ml-8',
        ul: 'list-disc ml-4',
        listitemChecked: 'list-none border border-black rounded bg-blue-50',
        listitemUnchecked: 'list-none border border-black rounded bg-transparent',
    },
    hashtag: 'editor-hashtag',
    image: 'editor-image',
    link: 'text-blue-500',
    text: {
        bold: 'editor-textBold',
        code: 'editor-textCode',
        italic: 'editor-textItalic',
        strikethrough: 'editor-textStrikethrough',
        subscript: 'editor-textSubscript',
        superscript: 'editor-textSuperscript',
        underline: 'underline underline-offset-2',
        underlineStrikethrough: 'underline underline-offset-2',
    },
}

export default theme;
