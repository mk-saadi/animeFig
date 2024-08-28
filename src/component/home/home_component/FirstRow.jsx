import image from "../../../assets/background.jpg";

const FirstRow = ({ fig }) => {
	return (
		<header>
			<div>
				<div className="relative h-[18rem]">
					<img
						src={image}
						alt=""
						className="object-cover w-full h-full rounded-md shadow-lg"
					/>
				</div>
			</div>
		</header>
	);
};

export default FirstRow;
