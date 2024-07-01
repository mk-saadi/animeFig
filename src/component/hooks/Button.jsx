import React from "react";

const Button = ({ type, span1, span2 }) => {
	return (
		<div className="relative flex items-center justify-center px-8 py-1 mt-6 overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 border-blue-500 rounded-md shadow-lg cursor-pointer form-control shadow-sky-800 group hover:scale-105 hover:shadow-sky-800 hover:shadow-xl active:scale-100 focus:border-white">
			<span className="text-white duration-300 cursor-pointer group-hover:-translate-y-10 whitespace-nowrap">
				{span1}
			</span>
			<button
				className="absolute px-56 py-2 text-gray-900 duration-300 translate-y-10 bg-white cursor-pointer group-hover:translate-y-0 whitespace-nowrap"
				type={type}
			>
				{span2}
			</button>
		</div>
	);
};

export default Button;
