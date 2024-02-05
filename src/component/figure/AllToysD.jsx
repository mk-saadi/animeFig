/* eslint-disable react/prop-types */
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useWebTitle";

const AllToysD = ({ fig }) => {
	useTitle("figuresDetails");
	return (
		<tr className="text-xs sm:text-sm">
			<th>
				<img
					src={fig.img}
					alt=""
					className="h-12 w-12 object-cover"
				/>
			</th>
			<td>
				<p>{fig.seller.length > 6 ? `${fig.seller.slice(0, 6)}...` : fig.seller}</p>
			</td>
			<td>
				<p>{fig.name.slice(0, 25)}...</p>
			</td>
			<td>
				<p>{fig.category}</p>
			</td>
			<td>
				<p>{fig.quantity}</p>
			</td>
			<td>
				<p>$ {fig.price}</p>
			</td>
			<td>
				<Link to={`/figDetails/${fig._id}`}>
					<button className="btn btn-xs sm:btn-sm btn-info rounded-sm text-white text-xs flex justify-center items-center gap-2 flex-nowrap">
						Details <BsFillArrowRightSquareFill />
					</button>
				</Link>
			</td>
		</tr>
	);
};

export default AllToysD;
