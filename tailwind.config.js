// eslint-disable-next-line no-undef
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		fontFamily: {
			head: '"futura", "Nunito Sans", sans-serif',
			sans: '"Inter", sans-serif',
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
			},
		},
	},
	plugins: [],
};
