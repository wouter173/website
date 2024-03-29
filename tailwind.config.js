/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			head: '"futura", "Nunito Sans", sans-serif',
			sans: 'Manrope, sans-serif',
			mono: '"JetBrains Mono", monospace',
		},
		extend: {
			colors: {
				bermuda: '#010101',
				'bermuda-card': '#1b1b1b',
				'tx-prim': 'white',
				'tx-sec': '#bfc0d0',
				'hl-bg': '#2d2d2d',
				'hl-top': '#3d3d3f',

				metal: '#25252D',
				'metal-light': '#323237',
			},
		},
	},
	plugins: [],
};
