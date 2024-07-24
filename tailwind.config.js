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
			boxShadow: {
				equal: "0 0 10px 0",
			},
		},
	},
	plugins: [require("daisyui")],
};
