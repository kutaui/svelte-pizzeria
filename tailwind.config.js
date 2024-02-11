/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontWeight: {
			thin: 100,
			extralight: 200,
			light: 300,
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
			extrabold: 800,
			black: 900
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif']
		},
		extend: {
			colors: {
				primary: '#f13a01',
				secondary: '#f43f5e',
				tertiary: '#34d399',
				quaternary: '#fbbf24',
				quinary: '#f87171',
				senary: '#60a5fa',
				septenary: '#f472b6',
				octonary: '#fbbf24',
				nonary: '#34d399',
				decenary: '#f43f5e'
			}
		}
	},
	plugins: []
};
