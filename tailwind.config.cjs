module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		fontFamily: {
			body: 'Source Sans Pro, sans-serif',
			display: 'Public Sans, sans-serif',
		},
		extend: {
			colors: {
				accent: {
					1: 'hsl(var(--color-accent1) / <alpha-value>)',
					2: 'hsl(var(--color-accent2) / <alpha-value>)',
				},
				bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
				bkg2: 'hsl(var(--color-bkg2) / <alpha-value>)',
				content: 'hsl(var(--color-content) / <alpha-value>)',
				primary: 'hsl(var(--color-primary) / <alpha-value>)',
				secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
				destructive: 'hsl(var(--color-destructive) / <alpha-value>)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography', '@tailwindcss/forms')],
};
