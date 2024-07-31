import { useEffect, useState } from "react";
import axios from "axios";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const CommentActions = ({ comment = {}, commentId, productId, userId }) => {
	const [likes, setLikes] = useState(comment?.likes?.length || 0);
	const [dislikes, setDislikes] = useState(comment?.dislikes?.length || 0);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	useEffect(() => {
		if (userId) {
			setIsLiked(comment?.likes?.includes(userId));
			setIsDisliked(comment?.dislikes?.includes(userId));
		}
	}, [userId, comment?.likes, comment?.dislikes]);

	const handleReaction = async (action) => {
		try {
			const res = await axios.post(
				`${import.meta.env.VITE_URL}/figures/${productId}/comments/${commentId}/react`,
				{
					userId: userId,
					action,
				}
			);

			if (res.status === 200) {
				if (action === "like") {
					setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
					setDislikes((prevDislikes) => (isDisliked && !isLiked ? prevDislikes - 1 : prevDislikes));
					setIsLiked(!isLiked);
					setIsDisliked(false);
				} else if (action === "dislike") {
					setDislikes((prevDislikes) => (isDisliked ? prevDislikes - 1 : prevDislikes + 1));
					setLikes((prevLikes) => (isLiked && !isDisliked ? prevLikes - 1 : prevLikes));
					setIsDisliked(!isDisliked);
					setIsLiked(false);
				}
			}
		} catch (error) {
			console.error("Error updating reaction:", error);
		}
	};

	return (
		<div className="flex flex-row items-center justify-start gap-x-4">
			{likes > 0 && (
				<div>
					<span className="flex text-sm text-ash flex-row justify-start items-center gap-x-1.5">
						+ {likes}
					</span>
				</div>
			)}

			{dislikes > 0 && (
				<div>
					<span className="flex text-sm text-ash flex-row justify-start items-center gap-x-1.5">
						- {dislikes}
					</span>
				</div>
			)}

			{/* For like */}
			<div className="flex items-center">
				<ThumbsUp
					className={`cursor-pointer ${isLiked ? "text-holud" : "text-ash/70"}`}
					size={18}
					onClick={() => handleReaction("like")}
					disable={isLiked}
				/>
			</div>

			{/* For dislike */}
			<div className="flex items-center">
				<ThumbsDown
					className={`cursor-pointer ${isDisliked ? "text-laal" : "text-ash/70"}`}
					size={18}
					onClick={() => handleReaction("dislike")}
					disable={isDisliked}
				/>
			</div>
		</div>
	);
};

export default CommentActions;
