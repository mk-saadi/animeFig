import { Link } from "react-router-dom";
import image from "../../../assets/background.jpg";
// import { useFigures } from "../../hooks/APIS";
import axios from "axios";
import { useEffect, useState } from "react";

const FirstRow = () => {
	// const { figure: fig, isLoading, error } = useFigures(`/figures/features`);

	const [fig, setFig] = useState([]);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_URL}/figures/features`)
			.then((res) => {
				setFig(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<header className="overflow-hidden">
			<div
				className="relative h-[21rem] rounded-md pointer-events-auto px-4 w-full flex justify-between flex-col lg:flex-row"
				style={{
					backgroundImage: `url(${image})`,
					backgroundSize: "cover",
					borderRadius: "0.375rem",
				}}
			>
				<div className="absolute rounded-md inset-0 z-10 bg-gradient-to-r from-[#000000] via-[#0000003b] to-[#ffffff00]" />
				<div className="z-20 flex flex-col items-center justify-center gap-y-6">
					<h1 className="text-2xl lg:text-4xl font-serif leading-6 lg:leading-[2.7rem] font-extrabold text-white">
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
					{fig.map((f) => (
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
								<div className="absolute inset-0 bottom-0 z-30 flex items-center justify-center duration-300 rounded-md opacity-0 bg-ash backdrop-blur-sm bg-opacity-30 group-hover:opacity-100 ">
									<p className="text-base font-medium text-center text-white">{f.series}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</header>
	);
};

export default FirstRow;
