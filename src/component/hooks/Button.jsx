const Button = ({ type, span1, span2 }) => {
	return (
		<div className="relative flex items-center justify-center px-8 py-1 mt-6 overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 border-yellow-500 rounded-md shadow-lg cursor-pointer form-control shadow-amber-800 group hover:scale-105 hover:shadow-amber-800 hover:shadow-xl active:scale-100 focus:border-white">
			<span className="text-white duration-300 cursor-pointer group-hover:-translate-y-10 whitespace-nowrap">
				{span1}
			</span>
			<button
				className="absolute py-2 text-gray-900 duration-300 translate-y-10 bg-white cursor-pointer px-44 group-hover:translate-y-0 whitespace-nowrap"
				type={type}
			>
				{span2}
			</button>
		</div>
	);
};

export default Button;
