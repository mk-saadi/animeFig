/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "react-toast-master";

const Comment = ({ fig }) => {
	const initialComments = fig?.comments || [];
	const id = fig?._id;
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const { toastMaster } = useToast();
	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState(initialComments);
	useEffect(() => {
		console.log("fig.comments:", fig.comments);
		setComments(fig?.comments || []);
	}, [fig]);

	console.log("comments: ", comments);

	const handleComment = async (event) => {
		event.preventDefault();

		if (!user) {
			navigate("/auth/login");
		}

		const form = event.target;
		const name = user?.displayName;
		const commentBody = form.body.value;
		const rating = parseFloat(form.rating.value);

		const commentDoc = {
			name,
			commentBody,
			rating,
		};

		toastMaster({
			type: "loading",
			message: "Posting comment...",
			transition: "up",
			bg: "white",
			position: "bottomLeft",
		});
		setLoading(true);

		try {
			const res = await axios.post(`${import.meta.env.VITE_URL}/figures/${id}/comments`, commentDoc);
			if (res.status === 200) {
				console.log(res.data);
				toastMaster({
					type: "success",
					message: res.data.message,
					transition: "up",
					bg: "white",
					position: "bottomLeft",
				});

				form.reset();
				setLoading(false);
				setComments((prevComments) => [...prevComments, commentDoc]);
			}
		} catch (error) {
			toastMaster({
				type: "error",
				message: error.message,
				transition: "up",
				bg: "white",
				position: "bottomLeft",
			});
			setLoading(false);
		}
	};

	return (
		<>
			<div className="bg-white">
				<form
					onSubmit={handleComment}
					className="flex flex-col space-y-2.5"
				>
					<input
						type="number"
						name="rating"
						placeholder="rate"
						className=""
					/>
					<textarea
						name="body"
						required
						className="block w-full rounded-md border-0 px-3.5 py-2 bg-white text-gray-900/70  ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-[#fab07a] focus:outline-none text-sm md:text-base font-semibold sm:leading-6 "
					></textarea>

					<div className="flex justify-end w-full">
						<input
							type="submit"
							value="Submit"
							className="inline-flex justify-center px-4 py-1 text-base font-semibold text-orange-600 duration-200 bg-orange-300 border-none rounded-lg shadow-lg outline-none cursor-pointer md:py-2 md:px-7 w-fit active:scale-95 hover:bg-orange-300 shadow-gray-700/30"
							disabled={loading === true}
						/>
					</div>
				</form>
			</div>

			<div className="flex flex-col">
				{comments.length === 0 ? (
					<div>no comments yet</div>
				) : (
					comments.map((ca, index) => (
						<div
							key={index}
							className="my-2.5"
						>
							<p>{ca.name}</p>
							<p>{ca.commentBody}</p>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Comment;
