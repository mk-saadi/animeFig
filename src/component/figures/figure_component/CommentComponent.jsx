import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useToast } from "react-toast-master";
import InputField from "../../hooks/InputField";
import { ThumbsDown, ThumbsUp, User2 } from "lucide-react";
import CommentActions from "./CommentAction";

const Comment = ({ fig }) => {
	const { user } = useContext(AuthContext);
	const { toastMaster } = useToast();
	const [loading, setLoading] = useState(false);
	const [comments, setComments] = useState(fig?.comments || []);
	console.log("comments: ", comments);
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

		const commentDoc = {
			name,
			commentBody,
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
			<section className="max-w-5xl">
				<h2 className="text-2xl text-kala">Excited about this item?</h2>
				<p className="text-sm text-ash">Comment here! Discuss your excitement with other users!</p>
				<div className="w-full mt-8 bg-white">
					<form
						onSubmit={handleComment}
						className="flex flex-col space-y-2.5 w-full"
					>
						<div className="flex justify-start gap-x-2.5 w-full items-start">
							{user && (
								<div className="flex-shrink-0">
									<img
										className="w-10 h-10 rounded-full shadow-md"
										src={user?.photoURL}
										alt={user?.displayName}
										loading="lazy"
									/>
								</div>
							)}
							{!user && (
								<div className="flex-shrink-0">
									<User2 className="w-10 h-10 rounded-full shadow-md bg-ash/20" />
								</div>
							)}
							<div className="flex flex-col w-full gap-y-1.5">
								<textarea
									name="body"
									placeholder="Add Comment..."
									className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg border-dhusor shadow-gray-900/10 text-ash focus:outline-none focus:ring-2 focus:ring-ash"
								></textarea>
							</div>
						</div>
						<div className="flex justify-end w-full">
							<input
								type="submit"
								value="Submit"
								className="flex items-center justify-center cursor-pointer w-fit px-8 py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud"
								disabled={loading === true}
							/>
						</div>
					</form>
				</div>
			</section>

			<div className="flex flex-col max-w-5xl mt-8">
				{comments.length === 0 ? (
					<div>no comments yet</div>
				) : (
					comments.map((ca) => (
						<div
							key={ca._id}
							className="my-3 flex justify-between items-start gap-x-2.5 w-full"
						>
							<div className="flex justify-start gap-x-2.5 w-full">
								<div className="flex-shrink-0">
									<img
										className="rounded-full shadow-md w-9 h-9"
										src={ca?.image}
										alt={ca?.name}
										loading="lazy"
									/>
								</div>
								<div className="flex flex-col w-full gap-y-1.5">
									<div className="flex items-start justify-between">
										<div className="flex flex-row items-center justify-start gap-x-4">
											<p className="text-base text-kala">{ca.name}</p>
											<p className="text-ash">•</p>
											<p className="text-sm text-ash">{formatDate(ca.createdAt)}</p>
										</div>
										{/* For like and dislike count */}
										{/* <div className="flex flex-row items-center justify-start gap-x-4">
											{ca.likes && <p>{ca?.likes}</p>}
											<ThumbsUp
												className="text-ash/70"
												size={18}
											/>
											<ThumbsDown
												className="text-ash/70"
												size={18}
											/>
										</div> */}
										<CommentActions
											commentId={ca._id}
											productId={id}
											userId={user?.uid}
											comment={ca}
										/>
									</div>
									<p className="text-sm text-ash">{ca.commentBody}</p>
								</div>
							</div>
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
