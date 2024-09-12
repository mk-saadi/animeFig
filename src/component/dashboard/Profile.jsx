import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Breadcrumbs from "../hooks/BreadCrumbs";
import UseAxiosHook from "../hooks/useAxiosHook";
import { Link } from "react-router-dom";

const Profile = () => {
	const { user } = useContext(AuthContext);
	console.log("user: ", user);
	const [orders, setOrders] = useState([]);
	console.log("orders: ", orders);
	const [axiosSecure] = UseAxiosHook();
	const [loading, setLoading] = useState(false);

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

	return (
		<div>
			<div>
				<>
					<Breadcrumbs />
				</>
				<h1 className=" text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
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
							<div className="flex items-center justify-between">
								<div>
									<p>Order ID: {item._id}</p>
									<p>Order Date: {item.date}</p>
								</div>
								<div className="flex items-start justify-center gap-x-4">
									<button>Cancel Order</button>
									<Link to="/profile/orders_progress">Track Order</Link>
								</div>
							</div>
							<div>
								{item?.zoneDetail ? (
									<div key={item.zoneDetail.zip}>
										<p>
											Ship to: {item.zoneDetail.address}, {item.zoneDetail.city}
										</p>
										<p>ZIP: {item.zoneDetail.zip}</p>
									</div>
								) : (
									<p>No zone details available</p>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
