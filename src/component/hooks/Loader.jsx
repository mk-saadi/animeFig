const Loader = () => {
	return (
		<div className="flex flex-col border p-4 rounded shadow-md w-60 sm:w-[222px] animate-pulse h-[460px]">
			<div className="h-[224px] rounded-md dark:bg-gray-300"></div>
			<div className="w-full h-[50px] mt-8 rounded dark:bg-gray-300"></div>
			<div className="flex flex-col justify-between flex-1 p-4 space-y-4" />
			<div className="flex flex-col space-y-4 dark:bg-gray-50">
				<div className="w-full h-[48px] rounded dark:bg-gray-300"></div>
				<div className="w-full h-[36px] rounded dark:bg-gray-300"></div>
			</div>
		</div>
	);
};

export default Loader;
