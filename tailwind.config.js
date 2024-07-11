/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				laal: "#e7230d",
				ash: "#374151",
				holud: "#f4ae18",
				dhusor: "#d1d5db",
				kala: "#111827",
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
				serif: ["Montserrat", "sans-serif"],
			},
			// opacity: {
			// 	2: "0.2",
			// },
		},
	},
	plugins: [require("daisyui")],
};
