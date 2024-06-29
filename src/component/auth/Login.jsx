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

		if (password.length < 6) {
			toastMaster({
				radius: "none",
				transition: "down",
				type: "errorWhite",
				message: "password must be at least 6 characters long!",
				bg: "warning",
			});
			return;
		}

		form.reset();

		toastMaster({
			radius: "none",
			transition: "fade",
			type: "loadingWhite",
			message: "Logging in...",
			bg: "warning",
		});

		try {
			const res = await signIn(email, password);
			const user = res.user;
			navigate(from, { replace: true });
			if (user.uid) {
				toastMaster({
					radius: "none",
					transition: "fade",
					type: "successWhite",
					message: "Successfully Logged In",
					bg: "success",
				});
			}
		} catch (error) {
			console.log("error: ", error);
			toastMaster({
				radius: "none",
				transition: "fade",
				type: "errorWhite",
				message: "Login Failed",
				bg: "error",
			});
		}
	};

	return (
		<div className="flex flex-col hero min-w-96">
			<form
				onSubmit={handleLogin}
				className="flex flex-col w-full px-4 py-6 rounded-md shadow-md gap-y-4"
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
