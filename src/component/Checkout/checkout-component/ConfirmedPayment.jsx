import { CheckCircle } from "lucide-react";
import Breadcrumbs from "../../hooks/BreadCrumbs";
import { Link } from "react-router-dom";
import { useToast } from "react-toast-master";

const ConfirmedPayment = () => {
	const items = localStorage.getItem("ordered");
	const item = JSON.parse(items);
	const { toastMaster } = useToast();

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	return (
		<div className="flex flex-col min-h-screen bg-white">
			<div className="flex w-full px-8 py-3 border-b border-dhusor">
				<h1 className="text-lg text-laal uppercase font-[900] font-serif">anime-Fig</h1>
			</div>
			<div className="mt-1 mx-28">
				<Breadcrumbs />
			</div>

			<>
				<div className="flex flex-col items-center justify-center flex-grow">
					<div className="flex flex-col items-center justify-center">
						<div className="flex flex-col items-center justify-center mb-6 gap-y-2">
							<CheckCircle
								size={72}
								className="mb-4 text-green-500"
							/>
							<h1 className="mb-1 text-3xl font-semibold text-kala">Thank you for Ordering</h1>
							<p className="text-sm font-normal text-center text-ash max-w-prose">
								The order confirmation email with details of your order and a link to track
								its progress will be sent to your email
							</p>
							<div className="flex flex-col items-center justify-center text-ash gap-y-1">
								<p className="px-4 py-1 text-laal/70 text-center flex justify-start gap-x-1.5 items-center rounded-md bg-holud/15 w-full">
									Order ID:
									<span
										className="font-semibold cursor-pointer"
										onClick={() => {
											if (item?.id) {
												navigator.clipboard.writeText(item.id);
												toastMaster({
													type: "success",
													message: "Order ID copied to clipboard!",
													position: "bottomLeft",
													transition: "top",
													bg: "white",
												});
											}
										}}
									>
										{item?.id}
									</span>
								</p>

								<p className="text-sm">Order Date: {formatDate(item?.date)}</p>
							</div>
						</div>
						<div className="flex flex-row w-fit justify-center items-center gap-x-2.5">
							<Link
								to="/"
								className="w-full"
							>
								<button className="flex items-center justify-center w-full px-4 py-1 text-base font-semibold duration-300 rounded-md whitespace-nowrap text-holud ring-holud ring-2">
									Go Home
								</button>
							</Link>
							<Link
								to="/order_progress"
								className="w-full"
							>
								<button className="flex items-center justify-center w-full px-4 whitespace-nowrap py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud">
									Track Order
								</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};

export default ConfirmedPayment;
