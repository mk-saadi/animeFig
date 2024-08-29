import { Link } from "react-router-dom";
import image from "../../../assets/background.jpg";
import { useFigures } from "../../hooks/APIS";

const FirstRow = () => {
	const { figure: fig, isLoading, error } = useFigures(`/figures/features`);

	return (
		<header className="overflow-hidden">
			<div>
				<div
					className="relative h-[20rem] px-4 w-full flex justify-between"
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: "cover",
						borderRadius: "0.375rem",
					}}
				>
					<>
						<p>Shipping Japan&apos;s finest OTAKU goods to the world!</p>
					</>
					<div className="justify-center items-center gap-x-2.5 flex">
						{isLoading ? (
							<>
								<span className="h-[256px] w-[176px] bg-gray-300 animate-pulse"></span>
								<span className="h-[256px] w-[176px] bg-gray-300 animate-pulse"></span>
								<span className="h-[256px] w-[176px] bg-gray-300 animate-pulse"></span>
								<span className="h-[256px] w-[176px] bg-gray-300 animate-pulse"></span>
							</>
						) : (
							fig.map((f) => (
								<div key={f._id}>
									<Link
										to={`/collections?name=&category=&series=${f.series}&character=&sort=&order=asc&page=1`}
										className="relative overflow-hidden group"
									>
										<div className="overflow-hidden rounded-md shadow-xl shadow-ash/70 h-72 w-44">
											<img
												src={f.image}
												alt=""
												className="object-cover w-full h-full duration-300 group-hover:scale-105"
											/>
										</div>
										<p className="absolute bottom-0 left-0 right-0 flex justify-center py-2 text-sm font-medium text-center duration-300 bg-white opacity-0 bg-opacity-70 rounded-b-md group-hover:opacity-100 line-clamp-1 text-kala">
											{f.series}
										</p>
									</Link>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default FirstRow;
