import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Breadcrumbs from "../hooks/BreadCrumbs";
import UseAxiosHook from "../hooks/useAxiosHook";
import { Link } from "react-router-dom";
import { ArrowRight, Ban } from "lucide-react";
import { useToast } from "react-toast-master";

const Profile = () => {
	const { user } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [axiosSecure] = UseAxiosHook();
	const [loading, setLoading] = useState(false);
	const { toastMaster } = useToast();

	useEffect(() => {
		const fetchUserPurchases = async () => {
			setLoading(true);
			if (user?.email) {
				try {
					const response = await axiosSecure.get(`/payments/user_payments?email=${user.email}`);
					setOrders(response.data);
					setLoading(false);
				} catch (error) {
					setLoading(false);
					console.error("Error fetching user purchases:", error);
				}
			}
		};

		fetchUserPurchases();
	}, [user, axiosSecure]);

	const zoneDetails = orders.map((item) => item.zoneDetail);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	const cancelOrder = async (id) => {
		const confirm = await toastMaster({
			type: "confirmDark",
			message: "Confirm cancellation",
			footer: "Are you sure you want to cancel this batch of order?",
			position: "center",
			align: "left",
		});

		if (confirm) {
			try {
				const response = await axiosSecure.delete(`/payments/${id}`);
				if (response.data.deletedCount > 0) {
					setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
					toastMaster({
						type: "success",
						message: "Order cancelled successfully",
						position: "bottomLeft",
						transition: "top",
					});
				}
			} catch (error) {
				console.error("Error cancelling order:", error);
			}
		}
	};

	return (
		<div className="flex flex-col w-full min-h-screen gap-y-8">
			<div>
				<div>
					<>
						<Breadcrumbs />
					</>
					<h1 className="mb-4 text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
						<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
						Profile
					</h1>
				</div>
				<div className="w-full px-8 py-4 border rounded-md border-dhusor">
					<div className="flex justify-start place-items-start gap-x-6">
						<div className="w-20 overflow-hidden rounded-md h-28">
							<img
								src={user.photoURL}
								alt={user.displayName}
								className="object-cover w-full h-full rounded-md"
							/>
						</div>
						<div className="">
							<h2 className="text-xl font-semibold text-kala">{user.displayName}</h2>
							<div className="flex text-base gap-x-3 text-ash">
								<p>Email: {user.email},</p>
								{zoneDetails?.slice(0, 1).map((item) => (
									<p key={item.zip}>Phone: {item?.phone}</p>
								))}
							</div>

							<div className="flex flex-col text-base gap-x-3 text-ash">
								<p>Joined: {user.metadata.creationTime}</p>
								<p>Last Logged In: {user.metadata.creationTime}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* order history */}
			<div>
				<h2 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
					<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					Your Orders
				</h2>
				<div className="flex flex-col w-full gap-y-6">
					{orders.map((item) => (
						<div
							key={item._id}
							className="w-full px-8 py-4 border rounded-md border-dhusor"
						>
							<div className="flex items-center justify-between pb-3 border-b border-dhusor">
								<div className="">
									<p className="text-base text-kala">
										Order ID: {item._id} -{" "}
										<span
											className={`font-semibold ${
												item.orderStatus === "Received"
													? "text-green-500"
													: "text-blue-500"
											}`}
										>
											{item.orderStatus}
										</span>
									</p>
									<p className="text-ash">Date: {formatDate(item.date)}</p>
								</div>
								<div className="flex items-center justify-start gap-x-3">
									<button
										className="flex items-center justify-center gap-x-1.5 px-2 py-1 duration-300 rounded-md text-white font-medium bg-laal"
										onClick={() => cancelOrder(item._id)}
									>
										<Ban size={20} />
										Cancel Order
									</button>
									<Link
										to="/profile/orders_progress"
										className="flex text-kala hover:text-laal duration-150 font-medium items-center gap-x-1.5 justify-center"
									>
										Track Order
										<ArrowRight size={20} />
									</Link>
								</div>
							</div>
							{/* info section */}
							<div className="flex justify-around w-full mt-4 border-b border-dhusor">
								<div className="text-ash">
									<p className="text-kala mb-[2px]">Contact:</p>
									<p>{item.zoneDetail?.deliverName}</p>
									<p>{item.zoneDetail?.deliverEmail}</p>
									<p>{item.zoneDetail?.phone}</p>
								</div>
								<div className="text-ash">
									<p className="text-kala mb-[2px]">Shipping Address:</p>
									<p>{item.zoneDetail?.country}</p>
									<p>
										{item.zoneDetail?.apartment}, {item.zoneDetail?.address},{" "}
										{item.zoneDetail.city}
									</p>
									<p>ZIP: {item.zoneDetail.zip}</p>
								</div>
								<div className="text-ash">
									<p className="text-kala mb-[2px]">Payment:</p>
									<p>Visa</p>
									<p>**** 4242</p>
									<p>Shipping Fee: $17.30</p>
									<p>Total paid: ${item.grandTotal}</p>
								</div>
							</div>
							{/* ordered figures */}
							<div className="grid grid-cols-3 gap-2 mt-3 ">
								{item.orderedFigs.map((item) => (
									<div
										key={item._id}
										className="flex w-full p-2 gap-x-2 text-ash"
									>
										<>
											<img
												src={item?.figImage}
												alt=""
												className="object-cover w-20 h-20 rounded-md"
											/>
										</>
										<div className="flex flex-col w-full">
											<p className="line-clamp-2">{item.figName}</p>
											<p className="font-medium">
												{item.quantity} = ${item.totalPrice}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
