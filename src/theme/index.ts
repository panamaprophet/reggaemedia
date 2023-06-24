export const theme = {
    paragraph: 'mb-2 last:mb-0 empty:h-5 empty:mb-0',
    quote: 'p-4 my-4 border-l-4 border-gray-300 bg-gray-50 text-base text-gray-500',
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
    image: 'inline-block',
    link: 'underline underline-offset-2 transition cursor-pointer',
    linebreak: 'block w-full h-5',
    text: {
        underline: 'underline underline-offset-2',
        underlineStrikethrough: 'underline underline-offset-2',
    },
};
