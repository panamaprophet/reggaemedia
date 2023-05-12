/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'text-left',
        'text-right',
        'text-center',
        'text-justify',
        'font-bold',
        'font-normal',
        'underline',
        'underline-offset-1',
        'italic',
    ]
}

