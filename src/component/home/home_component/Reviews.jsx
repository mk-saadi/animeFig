import stars from "../../../assets/stars.svg";

const Reviews = () => {
	return (
		<div className="bg-[#e0f2fe] py-12 my-10 rounded-md flex items-center justify-center w-full text-ash gap-x-4">
			<p>Our customers say:</p>
			<h3 className="text-2xl font-semibold text-kala">Excellent</h3>
			<img
				src={stars}
				alt=""
				className="h-fit w-44"
			/>
			<p>
				4.8 out of 5 based on <span className="text-blue-500 underline">4,500+ reviews</span>
			</p>
		</div>
	);
};

export default Reviews;
