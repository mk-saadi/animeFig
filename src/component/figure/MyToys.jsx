import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import MyToysD from "./MyToysD";
import Swal from "sweetalert2";
import useTitle from "../hooks/useWebTitle";
import { useToast } from "../hooks/ToastProvider";
import axios from "axios";

const MyToys = () => {
	const { user } = useContext(AuthContext);
	const [figs, setFig] = useState([]);
	useTitle("myFigures");

	const { showToast } = useToast();

	const url = `${import.meta.env.VITE_URL}/addedFigure?email=${user.email}`;

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setFig(data));
	}, [url]);

	const handleDeleteOP = async (id) => {
		const confirm = await showToast("confirm", "Are you sure you want to delete this figure?");
		if (confirm) {
			try {
				const res = await axios.delete(`https://server-anime-fig.vercel.app/addedFigure/${id}`);
				const data = res.data;
				if (data.deletedCount > 0) {
					showToast("success", "figure deleted successfully.");
					const updated = figs.filter((fig) => fig._id !== id);
					setFig(updated);
				}
			} catch (error) {
				showToast("error", "couldn't delete. please try again.");
			}
		}
	};

	return (
		<div
			style={{ width: "98vw" }}
			className="min-h-screen mx-auto my-16 overflow-x-auto"
			data-aos="fade-up"
			data-aos-offset="100"
			data-aos-duration="300"
		>
			<table className="table w-full table-zebra">
				<thead>
					<tr>
						<th>Image</th>
						<th>Seller</th>
						<th>Figure Name</th>
						<th>Sub-Category</th>
						<th>Price</th>
						<th>Details</th>
						<th>Modify</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{figs
						.map((fig) => (
							<MyToysD
								key={fig._id}
								fig={fig}
								handleDeleteOP={handleDeleteOP}
							></MyToysD>
						))
						.reverse()}
				</tbody>
			</table>
		</div>
	);
};

export default MyToys;
