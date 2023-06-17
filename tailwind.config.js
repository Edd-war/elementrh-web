/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
	// corePlugins: {
	//   preflight: false,
	// },
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 5s linear infinite',
				'ping-slow': 'ping-short 2s cubic-bezier(0, 0, 0, 0) infinite',
			},
			dropShadow: {
				'3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'light': '0 0 2em rgba(136, 19, 55, 0.75)',
				'dark': '0 0 2em rgba(97, 218, 251, 0.75)',
			},
			keyframes: {
				'ping-short': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'75%, 100%': { transform: 'scale(1.2)', opacity: '0' },
				},
			},
		},
	},
	plugins: [],
});

