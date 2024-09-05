import { CheckCircle } from "lucide-react";
import React from "react";
import Breadcrumbs from "../../hooks/BreadCrumbs";

const ConfirmedPayment = () => {
	const items = localStorage.getItem("ordered");
	const item = JSON.parse(items);

	return (
		<div className="flex flex-col min-h-screen bg-white">
			<div className="flex w-full px-8 py-3 border-b border-dhusor">
				<h1 className="text-lg text-laal uppercase font-[900] font-serif">anime-Fig</h1>
			</div>
			<div className="mx-28">
				<Breadcrumbs />
			</div>

			<>
				<div className="flex flex-col items-center justify-center flex-grow">
					<div className="flex flex-col text-center">
						<CheckCircle
							size={48}
							className="text-green-500"
						/>
						<h1 className="text-2xl font-semibold text-kala">Your order has been confirmed</h1>
						<p>
							The order confirmation email with details of your order and a link to track its
							progress will be sent to your email
						</p>
						<div>
							<p>Order ID: {item?.id}</p>
							<p>Order Date: {item?.date}</p>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};

export default ConfirmedPayment;
