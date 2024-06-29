import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../hooks/useWebTitle";
import Button from "../hooks/Button";
import InputField from "../hooks/InputField";
import PasswordInputField from "../hooks/PasswordInputField";
import { useToast } from "react-toast-master";

const Login = () => {
	const { toastMaster } = useToast();
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useTitle("login");

	const from = location.state?.from?.pathname || "/";

	const handleLogin = async (event) => {
		event.preventDefault();

		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		if (!email) {
			return toastMaster({
				transition: "down",
				type: "errorWhite",
				message: "Kindly enter your email!",
				bg: "gray",
			});
		}
		if (password.length < 6) {
			return toastMaster({
				transition: "down",
				type: "errorWhite",
				message: "password must be at least 6 characters long!",
				bg: "gray",
			});
		}

		form.reset();

		toastMaster({
			transition: "down",
			type: "loadingWhite",
			message: "Logging in...",
			bg: "gray",
		});

		try {
			const res = await signIn(email, password);
			const user = res.user;
			navigate(from, { replace: true });
			if (user.uid) {
				toastMaster({
					transition: "down",
					type: "successWhite",
					message: "Successfully Logged In",
					bg: "gray",
				});
			}
		} catch (error) {
			toastMaster({
				transition: "down",
				type: "errorWhite",
				message: "Login Failed",
				bg: "gray",
			});
		}
	};

	return (
		<div className="flex flex-col hero min-w-[28rem]">
			<form
				onSubmit={handleLogin}
				className="flex flex-col w-full px-4 py-12 rounded-md shadow-md gap-y-4"
			>
				<InputField
					label="Your Email"
					type="email"
					id="email"
					name="email"
				/>
				<div>
					<PasswordInputField
						label="Your Password"
						id="password"
						name="password"
					/>
					<p className="mt-2 font-medium text-gray-500 cursor-pointer hover:underline w-fit">
						<small>Forgot Password?</small>
					</p>
				</div>

				<Button
					type="submit"
					span1="Login?"
					span2="Login"
				/>
			</form>
		</div>
	);
};

export default Login;
