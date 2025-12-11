/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0a',
                    800: '#121212',
                    700: '#1a1a1a',
                },
                primary: '#00ff9d',
                accent: '#00b8d4',
            },
            boxShadow: {
                neon: '0 0 10px rgba(0, 255, 157, 0.5), 0 0 20px rgba(0, 255, 157, 0.3)',
            }
        },
    },
    plugins: [],
}
