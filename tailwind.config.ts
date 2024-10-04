import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"parisienne": ["Parisienne", 'cursive']
			},
			backgroundImage: {
				'hero-img': "url('/public/img/hero-img.jpg')",
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				text: '#8a8a8a',
				yellow: '#feb524',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: '#c01b17',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			animation: {
				'slide-down': 'slideDown 0.5s ease-in-out forwards',
				'slide-up': 'slideUp 0.5s ease-in-out forwards',
				'animate-in': 'fadeIn 0.3s ease-out forwards',
				'animate-out': 'fadeOut 0.3s ease-in forwards',
			},
			keyframes: {
				slideDown: {
					'0%': {
						transform: 'translateY(-20%)',

						opacity: '0.1'
					},
					'50%': {
						transform: 'translateY(-10%)',

						opacity: '0.5'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					},
				},
				slideUp: {
					'100%': {
						transform: 'translateY(-20%)',

						opacity: '0'
					},
					'50%': {
						transform: 'translateY(-10%)',

						opacity: '0.5'
					},
					'0%': {
						transform: 'translateY(0)',
						opacity: '1'
					},
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				  },
				fadeOut: {
				'0%': { opacity: '1' },
				'100%': { opacity: '0'},
				},
			}
		}
	},
	plugins: [

	],
};
export default config;
