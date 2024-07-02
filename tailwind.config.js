/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				nill: "#e7230d",
				ash: "#374151",
			},
		},
	},
	plugins: [require("daisyui")],
};
