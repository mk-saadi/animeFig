import { Plane, Rocket, Truck } from "lucide-react";
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

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	return (
		<>
			<div
				// className="flex flex-wrap gap-y-4 gap-x-14 text-ash"
				className="grid grid-cols-4 gap-4 text-ash"
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
					<p className="text-sm font-normal">{formatDate(release)}</p>
				</div>
				<div className="flex flex-col justify-start">
					<p className="font-medium text-kala">Character:</p>
					<Link
						className="text-sm font-normal underline duration-300 cursor-pointer hover:text-laal"
						to={`/collections?name=&category=&series=${series}&character=${character}&sort=&order=asc&page=1`}
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
			<div className="my-8 ">
				<p className="font-medium text-kala">Description:</p>
				<p
					// style={{ whiteSpace: "pre-line" }}
					className="text-sm font-light whitespace-pre-line text-ash"
				>
					{description}
				</p>
			</div>
			{/* shipping */}
			<div className="flex flex-col items-start justify-start px-8 py-4 border rounded-md gap-y-5 border-ash/20 text-ash">
				<div>
					<h3 className="flex items-center justify-center text-lg font-medium gap-x-2 text-kala">
						<div className="w-7 h-1 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
						Worldwide Shipping
					</h3>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center justify-start gap-x-4">
						<Truck
							size={20}
							strokeWidth={1.3}
							className="text-laal"
						/>
						<div>
							<p className="font-normal text-kala">Saver</p>
							<p className="text-sm font-light">(2-4 months)</p>
						</div>
					</div>
					<p>$16.73</p>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center justify-start gap-x-4">
						<Plane
							size={20}
							strokeWidth={1.3}
							className="text-laal"
						/>
						<div>
							<p className="font-normal text-kala">Regular</p>
							<p className="text-sm font-light">(5-10 days)</p>
						</div>
					</div>
					<p> $13.12</p>
				</div>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center justify-start gap-x-4">
						<Rocket
							size={20}
							strokeWidth={1.3}
							className="text-laal"
						/>
						<div>
							<p className="font-normal text-kala">Express</p>
							<p className="text-sm font-light">(3-7 days)</p>
						</div>
					</div>
					<p>$22.52</p>
				</div>
			</div>
		</>
	);
};

export default InfoComponent;
