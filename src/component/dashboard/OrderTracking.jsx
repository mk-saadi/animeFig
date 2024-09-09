import { useEffect, useState } from "react";
import { useToast } from "react-toast-master";
import UseAxiosHook from "../hooks/useAxiosHook";

const OrderTracking = () => {
	const items = localStorage.getItem("ordered");
	const item = JSON.parse(items);
	const id = item._id;
	const { toastMaster } = useToast();
	const [order, setOrder] = useState([]);
	// const { user } = useContext(AuthContext);
	const [axiosSecure] = UseAxiosHook();
	const [loading, setLoading] = useState(false);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
	};

	useEffect(() => {
		const fetchUserPurchases = async () => {
			setLoading(true);
			if (id) {
				try {
					const response = await axiosSecure.get(`/payments/user_payment?id=${id}`);
					setOrder(response.data);
					setLoading(false);
				} catch (error) {
					setLoading(false);
					console.error("Error fetching user purchases:", error);
				}
			}
		};

		fetchUserPurchases();
	}, [id, axiosSecure]);

	return <div></div>;
};

export default OrderTracking;
