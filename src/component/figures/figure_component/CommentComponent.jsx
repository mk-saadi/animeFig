import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useToast } from "react-toast-master";

const Comment = ({ fig }) => {
	const { user } = useContext(AuthContext);
	const { toastMaster } = useToast();
	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState(fig?.comments || []);
	const id = fig._id;

	useEffect(() => {
		setComments(fig?.comments || []);
	}, [fig]);

	const handleComment = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = user?.displayName;
		const image = user.photoURL;
		const commentBody = form.body.value;
		const rating = parseFloat(form.rating.value);

		const commentDoc = {
			name,
			commentBody,
			rating,
			image,
			createdAt: new Date().toISOString(),
		};

		if (user === null || !user) {
			toastMaster({
				type: "errorDark",
				message: "Please login to comment",
				footer: (
					<p>
						If you already have an account, please <Link to="/auth/login">login</Link>
						<br />
						If you do not have an account, please <Link to="/auth/register">register</Link>
					</p>
				),
			});
			return;
		}

		toastMaster({
			type: "loading",
			message: "Posting comment...",
			position: "bottomLeft",
			transition: "top",
			shadow: "warning",
		});
		setLoading(true);

		try {
			const res = await axios.post(`${import.meta.env.VITE_URL}/figures/${id}/comments`, commentDoc);
			if (res.status === 200) {
				toastMaster({
					type: "success",
					message: "Comment posted",
					position: "bottomLeft",
					transition: "top",
				});

				setComments((prevComments) => [...prevComments, { ...commentDoc, _id: res.data.insertedId }]);

				form.reset();
				setLoading(false);
			}
		} catch (error) {
			toastMaster({
				type: "error",
				message: error.message,
				position: "bottomLeft",
				transition: "top",
				bg: "white",
				shadow: "error",
			});
			setLoading(false);
		}
	};

	const handleDeleteComment = async (commentId) => {
		toastMaster({
			type: "loadingDark",
			message: "Deleting comment...",
			position: "bottomLeft",
			transition: "up",
		});

		try {
			const res = await axios.delete(`${import.meta.env.VITE_URL}/figures/${id}/comments/${commentId}`);
			if (res.status === 200) {
				toastMaster({
					type: "successDark",
					message: "Comment deleted",
					position: "bottomLeft",
					transition: "up",
				});

				setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
			}
		} catch (error) {
			toastMaster({
				type: "errorDark",
				message: error.message,
				position: "bottomLeft",
				transition: "up",
			});
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		if (isNaN(date)) {
			return "Invalid date";
		}

		const options = { day: "2-digit", month: "short", year: "numeric" };
		return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, ". ");
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
						required
					/>
					<textarea
						name="body"
						required
					></textarea>

					<div className="flex justify-end w-full">
						<input
							type="submit"
							value="Submit"
							disabled={loading === true}
						/>
					</div>
				</form>
			</div>

			<div className="flex flex-col">
				{comments.length === 0 ? (
					<div>no comments yet</div>
				) : (
					comments.map((ca) => (
						<div
							key={ca._id}
							className="my-2.5"
						>
							<p>{ca.name}</p>
							<p>{ca.commentBody}</p>
							<p>{formatDate(ca.createdAt)}</p>
							<button
								onClick={() => handleDeleteComment(ca._id)}
								className="text-red-500"
							>
								Delete
							</button>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Comment;
