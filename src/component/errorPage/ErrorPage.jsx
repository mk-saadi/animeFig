import { Link } from "react-router-dom";
import error from "../../assets/404.jpg";

const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white">
			<img
				src={error}
				alt=""
				className="w-2/4 h-auto mb-8 md:w-2/5"
			/>
			<h2 className="text-3xl font-bold text-center text-ash">
				Sorry, There Seems <br /> To Be An Error
			</h2>
			<Link
				to="/"
				className="mt-10 w-fit"
			>
				<button className="flex items-center justify-center w-full px-4 py-1 text-base font-semibold duration-300 rounded-md whitespace-nowrap text-holud ring-holud ring-2">
					Go Home
				</button>
			</Link>
		</div>
	);
};

export default ErrorPage;
