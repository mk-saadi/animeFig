import { Link } from "react-router-dom";
import image from "../../../assets/background.jpg";
import { useFigures } from "../../hooks/APIS";

const FirstRow = () => {
	const { figure: fig, isLoading, error } = useFigures(`/figures/features`);

	return (
		<header className="overflow-hidden">
			<div
				className="relative h-[21rem] rounded-md pointer-events-auto px-4 w-full flex justify-between"
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize: "cover",
					borderRadius: "0.375rem",
				}}
			>
				<div className="absolute rounded-md inset-0 z-10 bg-gradient-to-r from-[#000000] via-[#0000003b] to-[#ffffff00]" />
				<div className="z-20 flex flex-col items-center justify-center gap-y-6">
					<h1 className="text-4xl font-serif leading-[2.7rem] font-extrabold text-white">
						Shipping Japan&apos;s <br /> finest OTAKU <br /> goods to the world!
					</h1>
					<Link
						to="/collections"
						className="flex items-center justify-center w-full py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud"
					>
						Browse Collection
					</Link>
				</div>
				<div className="z-20 justify-center items-center gap-x-2.5 flex">
					{isLoading ? (
						<>
							{/* <span className="h-[256px] rounded-md shadow-kala/70 shadow-xl w-[176px] bg-gray-300 animate-pulse"></span>
							<span className="h-[256px] rounded-md shadow-kala/70 shadow-xl w-[176px] bg-gray-300 animate-pulse"></span>
							<span className="h-[256px] rounded-md shadow-kala/70 shadow-xl w-[176px] bg-gray-300 animate-pulse"></span>
							<span className="h-[256px] rounded-md shadow-kala/70 shadow-xl w-[176px] bg-gray-300 animate-pulse"></span> */}
						</>
					) : (
						fig.map((f) => (
							<div key={f._id}>
								<Link
									to={`/collections?name=&category=&series=${f.series}&character=&sort=&order=asc&page=1`}
									className="relative overflow-hidden group"
								>
									<div className="relative overflow-hidden border-t border-b rounded-md shadow-xl border-t-gray-300 border-b-gray-800 shadow-kala/70 h-72 w-44">
										<div className="absolute inset-0 z-0 w-full h-full bg-gray-300 rounded-md shadow-xl shadow-kala/70 animate-pulse" />
										<img
											src={f.image}
											alt={f.name}
											loading="lazy"
											className="relative z-10 object-cover w-full h-full duration-300 group-hover:scale-105"
										/>
									</div>
									<p className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-2 text-sm font-medium text-center duration-300 bg-white opacity-0 backdrop-blur-sm bg-opacity-30 rounded-b-md group-hover:opacity-100 line-clamp-1 text-kala">
										{f.series}
									</p>
								</Link>
							</div>
						))
					)}
				</div>
			</div>
		</header>
	);
};

export default FirstRow;
