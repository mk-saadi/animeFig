/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const InfoComponent = ({ fig }) => {
	const {
		name,
		character,
		brand,
		dimension,
		description,
		release,
		quantity,
		label,
		rating,
		series,
		category,
	} = fig;

	return (
		<div>
			<div
				// className="flex flex-wrap gap-y-4 gap-x-14 text-ash"
				className="grid grid-cols-4 text-ash gap-y-4 gap-x-4"
			>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Series:</p>
					<Link
						className="text-sm font-normal underline duration-300 cursor-pointer hover:text-laal"
						to={`/collections?name=&category=&series=${series}&character=&sort=&order=asc&page=1`}
					>
						{series}
					</Link>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Manufacturer:</p>
					<p className="text-sm font-normal">{brand}</p>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Release Date:</p>
					<p className="text-sm font-normal">{release}</p>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Character:</p>
					<Link
						className="text-sm font-normal underline duration-300 cursor-pointer hover:text-laal"
						to={`/collections?name=&category=&series=&character=${character}&sort=&order=asc&page=1`}
					>
						{character}
					</Link>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Category:</p>
					<Link
						className="text-sm font-normal underline duration-300 cursor-pointer hover:text-laal"
						to={`/collections?name=&category=${category}&series=&character=&sort=&order=asc&page=1`}
					>
						{category}
					</Link>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Dimension:</p>
					<p className="text-sm font-normal">{dimension}</p>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Status:</p>
					<p className="text-sm font-normal">{label}</p>
				</div>
			</div>
			{/* description */}
			<div>
				<p
					style={{ whiteSpace: "pre-line" }}
					className="mt-8 text-sm text-ash"
				>
					{description}
				</p>
			</div>
		</div>
	);
};

export default InfoComponent;
