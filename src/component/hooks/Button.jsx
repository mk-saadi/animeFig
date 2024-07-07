const Button = ({ type, span1, span2, classname }) => {
	return (
		<div
			className={`uppercase font-[900] relative font-serif flex items-center justify-center px-8 py-1 overflow-hidden duration-300 bg-[#fff] border-2 border-ash hover:shadow-ash/35 rounded-md shadow-lg cursor-pointer form-control shadow-ash/30 group hover:scale-105 active:scale-100 ${classname}`}
		>
			<span className="duration-300 cursor-pointer text-ash group-hover:-translate-y-10 whitespace-nowrap">
				{span1}
			</span>
			<button
				className="absolute py-2 font-serif uppercase duration-300 translate-y-10 bg-white cursor-pointer text-gradient px-96 group-hover:translate-y-0 whitespace-nowrap"
				type={type}
			>
				{span2}
			</button>
		</div>
	);
};

export default Button;
