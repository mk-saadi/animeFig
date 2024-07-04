const Button = ({ type, span1, span2 }) => {
	return (
		<div className="uppercase font-[900] relative font-serif flex items-center justify-center px-8 py-1 mt-6 overflow-hidden text-lg duration-300 bg-[#fff] border-2 border-ash hover:shadow-gray-700/50 rounded-md shadow-lg cursor-pointer form-control shadow-gray-600/50 group hover:scale-105 active:scale-100">
			<span className="duration-300 cursor-pointer text-ash group-hover:-translate-y-10 whitespace-nowrap">
				{span1}
			</span>
			<button
				className="absolute py-2 duration-300 translate-y-10 font-[900] uppercase font-serif bg-white cursor-pointer text-gradient px-96 group-hover:translate-y-0 whitespace-nowrap"
				type={type}
			>
				{span2}
			</button>
		</div>
	);
};

export default Button;
