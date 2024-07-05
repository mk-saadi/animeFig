import { Link, useLoaderData } from "react-router-dom";
import Banner from "../home/Banner";
import image from "../../assets/background.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import useTitle from "./useWebTitle";
import Categories from "../category/Categories";
import CategoryD from "../category/CategoryD";
import ShowFig from "../showFig/ShowFig";
// import useScrollToTop from "./useScrollToTop";
import Products from "../prouducts/Products";
// import { useToast } from "../../../../../react-toast-master-demo/src/ToastProvider";
// import { useToast } from "../../../../../../npm package/react-toast-master-demo/src/ToastProvider";
import { BiLoaderCircle } from "react-icons/bi";
import { useToast } from "./ToastProvider";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Exp = () => {
	// const [figures, setData] = useState([]);
	// const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	// const [total, setTotal] = useState(0);
	// const limit = 6;
	// const { toastMaster, hideToast } = useToast();
	const { showToast, hideToast } = useToast();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const result = await axios.get(
	// 			`${import.meta.env.VITE_URL}/addedFigure?page=${page}&limit=${limit}`
	// 		);
	// 		setData(result.data);
	// 	};

	// 	const fetchTotal = async () => {
	// 		const result = await axios.get(`${import.meta.env.VITE_URL}/totalAddedFigure`);
	// 		setTotal(result.data.totalAddedFigure);
	// 	};

	// 	fetchData();
	// 	fetchTotal();
	// }, [page]);

	// const totalPages = Math.ceil(total / limit);

	// const handleNext = () => {
	// 	if (page < totalPages - 1) {
	// 		setPage((prevPage) => prevPage + 1);
	// 	}
	// };

	// const handlePrev = () => {
	// 	setPage((prevPage) => Math.max(prevPage - 1, 0));
	// };

	// const handlePageClick = (pageNumber) => {
	// 	setPage(pageNumber);
	// };

	// showToast("info", "loading");
	const handleCheck = async () => {
		const isCOnfirmed = await showToast({
			type: "confirm",
			message: "Are you sure you want to delete this user?",
			footer: '<a href="https://mk-saadi.web.app/" target="_blank" >Not sure what to do?</a>',
		});

		if (isCOnfirmed) {
			showToast({
				type: "loading",
				message: "Please wait!",
			});

			setTimeout(() => {
				showToast({
					type: "success",
					message: "user deleted!",
				});
			}, 4000);
		}
	};

	// const isClickedConfirm = ()=>
	// showToast(
	// 	"confirm",
	// 	"Are you sure you want to delete this user?",
	// 	'<a href="https://mk-saadi.web.app/" target="_blank" >Not sure what to do?</a>'
	// );
	// if (isClickedConfirm) {
	// 	showToast("success", "user deleted!");
	// }
	// const handleCheck = async () => {
	// 	setLoading(true);
	// 	const confirm = await toastMaster({
	// 		type: "confirmDark",
	// 		bg: "white",
	// 		message: "Proceed with account creation?",
	// 		// footer: "By clicking 'Confirm' you agree to our <a style='cursor: pointer; text-decoration: underline; margin-left: 4px; color: #2196f3' href='#'> Terms and Conditions</a>",
	// 		footer: (
	// 			<p>
	// 				By clicking &quot;Confirm&quot; you agree to our{" "}
	// 				<a
	// 					className="text-[#2196f3] hover:underline cursor-pointer"
	// 					onClick={hideToast}
	// 					href="#"
	// 				>
	// 					{" "}
	// 					Terms and Conditions
	// 				</a>
	// 			</p>
	// 		),
	// 		// shadow: "dark",
	// 	});

	// 	if (confirm) {
	// 		toastMaster({
	// 			type: "loadingDark",
	// 			bg: "white",
	// 			message: "Please wait!",
	// 			loadFooter:
	// 				"This seem to be taking longer than usual! <p style='color:black; margin-left:4px;'>Please hold on.</p>",
	// 			cancelButton: true,
	// 		});

	// 		setTimeout(() => {
	// 			toastMaster({
	// 				type: "successDark",
	// 				bg: "white",
	// 				message: "Account successfully created!",
	// 				footer: "Welcome to the team Shirou. Hope you have a good time.",
	// 				cancelButton: true,
	// 			});
	// 			// hideToast();
	// 		}, 10000);
	// 	} else {
	// 		setLoading(false);
	// 	}
	// };
	// const handleCheck = async () => {
	// 	// const isConfirm = await
	// 	toastMaster({
	// 		type: "warningStay",
	// 		message: "Service unavailable!",
	// 		footer: "We are sorry to say our booking services are unavailable at the moment. Please try again later.",
	// 		cancelButton: true,
	// 		radius: "xl",
	// 		bg: "dark",
	// 		position: "bottomLeft",
	// 		direction: "top",
	// 	});
	// 	// if (isConfirm) {
	// 	// 	toastMaster({
	// 	// 		type: "success",
	// 	// 		cancelButton: true,
	// 	// 		message: "user deleted!",
	// 	// 		footer: '<a href="https://mk-saadi.web.app/" target="_blank" >Not sure what to do?</a>',
	// 	// 		radius: "xl",
	// 	// 	});
	// 	// }
	// };
	// showToast(
	// 	"success",
	// 	"Something went wrong!",
	// 	'<a href="https://mk-saadi.web.app/" target="_blank">Why do I have this issue?</a>'
	// );
	// ('<a href="https://mk-saadi.web.app/">Why do I have this issue?</a>');

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col gap-y-2">
				{/* infoStay */}
				{/* <button
					onClick={() =>
						toastMaster({
							bg: "dark",
							cancelButton: true,
							transition: "zoom",
							position: "top",
							type: "infoStay",
							message: "This toast is on manuel!",
							shadow: "block",
							// align: "left",
							radius: "lg",
							footer: (
								<p>
									This toast won&apos;t go away automatically. Kingly use your mouse to
									close this toast for good.
								</p>
							),
						})
					}
					className="px-2 py-1 text-white bg-blue-600 rounded-md shadow-md whitespace-nowrap"
				>
					show toast
				</button> */}

				<button
					onClick={handleCheck}
					className="relative flex items-center justify-center px-8 py-1 overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 border-yellow-500 rounded-full shadow-lg shadow-amber-800 group hover:scale-105 hover:shadow-amber-800 hover:shadow-xl active:scale-95 focus:border-white"
				>
					<span className="text-white duration-300 group-hover:translate-y-10 whitespace-nowrap">
						View cart items
					</span>
					<span className="absolute px-12 py-2 text-gray-900 duration-300 -translate-y-10 bg-white group-focus:translate-y-10 group-hover:-translate-y-0 whitespace-nowrap">
						Cart is empty
					</span>
					<span className="absolute px-32 py-2 text-white duration-300 -translate-y-10 bg-gray-900 group-focus:-translate-y-0">
						<BiLoaderCircle className="animate-spin" />
					</span>
				</button>

				{/* <button onClick={handleCheck}>
					{loading === true ? <span>loading</span> : <span>load</span>}
				</button> */}

				{/* <button
					// onClick={handleCheck}
					className="relative flex items-center justify-center px-8 py-1 overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 border-yellow-500 rounded-full shadow-lg focus:border-gray-200 shadow-amber-800 group hover:scale-105 hover:shadow-amber-800 hover:shadow-xl active:scale-95"
				>
					<span className="text-white duration-300 group-hover:translate-y-10 whitespace-nowrap">
						View cart items
					</span>
					<span className="absolute px-12 py-2 text-gray-900 duration-300 -translate-y-10 bg-white group-focus:translate-y-10 group-hover:-translate-y-0 whitespace-nowrap">
						Cart is empty
					</span>
					<span className="absolute px-32 py-2 text-white duration-300 -translate-y-10 bg-gray-900 group-focus:-translate-y-0">
						<BiLoaderCircle className="animate-spin" />
					</span>
				</button> */}

				{/* <div className="flex gap-x-3">
					<button className="relative flex items-center justify-center overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 rounded-full shadow-xl border-amber-500 shadow-amber-900 group">
						<span className="px-6 py-2 text-white duration-300 group-hover:-translate-y-10 whitespace-nowrap">
							<Facebook />
						</span>
						<span className="absolute py-8 duration-500 translate-y-16 bg-sky-400 px-14 group-hover:-translate-y-16" />
						<span className="absolute py-8 duration-500 translate-y-32 bg-green-400 px-14 group-hover:-translate-y-16" />
						<span className="absolute py-8 duration-500 translate-y-44 bg-rose-400 px-14 group-hover:-translate-y-16" />
						<span className="absolute px-6 py-2 text-gray-900 duration-500 translate-y-16 bg-white group-hover:translate-y-0 whitespace-nowrap">
							<Facebook />
						</span>
					</button>

					<button className="relative flex items-center justify-center overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 rounded-full shadow-xl border-amber-500 shadow-amber-900 group">
						<span className="px-6 py-2 text-white duration-300 group-hover:-translate-y-10 whitespace-nowrap">
							<Twitter className=" group-hover:skew-y-6" />
						</span>
						<span className="absolute px-6 py-2 text-gray-900 duration-300 translate-y-10 bg-white group-hover:translate-y-0 whitespace-nowrap">
							<Twitter className="group-hover:-skew-y-6" />
						</span>
					</button>

					<button className="relative flex items-center justify-center overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 rounded-full shadow-xl border-amber-500 shadow-amber-900 group">
						<span className="px-6 py-2 text-white duration-300 group-hover:-translate-y-10 whitespace-nowrap">
							<Instagram />
						</span>
						<span className="absolute px-6 py-2 text-gray-900 duration-300 translate-y-10 bg-white group-hover:translate-y-0 whitespace-nowrap">
							<Instagram />
						</span>
					</button>
				</div> */}
			</div>

			{/* <div className="mt-20">
				<div
					className="grid grid-cols-2 gap-4 mx-4 mt-16 sm:grid-cols-3 md:grid-cols-6 sm:mx-20"
					data-aos="fade-up"
					data-aos-offset="100"
					data-aos-duration="300"
				>
					{figures.map((figS) => (
						<Products
							key={figS._id}
							figS={figS}
						></Products>
					))}
				</div>
				<div className="flex gap-8">
					<p>You are currently on page {page + 1}</p>
					<button
						onClick={handlePrev}
						disabled={page === 0}
					>
						Previous
					</button>

					<div className="flex gap-8">
						{Array.from({ length: totalPages }, (_, index) => (
							<button
								key={index}
								onClick={() => handlePageClick(index)}
								disabled={page === index}
							>
								{index + 1}
							</button>
						))}
					</div>
					<button
						onClick={handleNext}
						disabled={page >= totalPages - 1}
					>
						Next
					</button>
				</div>
			</div> */}
		</div>
	);
};

export default Exp;
