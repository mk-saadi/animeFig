/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				nill: "#3b82f6",
				ash: "#374151",
			},
		},
	},
	plugins: [require("daisyui")],
};
