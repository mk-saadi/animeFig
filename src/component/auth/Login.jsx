import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useTitle from "../hooks/useWebTitle";
import Button from "../hooks/Button";
import InputField from "../hooks/InputField";
import PasswordInputField from "../hooks/PasswordInputField";
import { useToast } from "react-toast-master";
import useScrollToTop from "../hooks/useScrollToTop";

const Login = () => {
	const { toastMaster } = useToast();
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useTitle("login");
	useScrollToTop();

	const from = location.state?.from?.pathname || "/";

	const handleLogin = async (event) => {
		event.preventDefault();

		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		if (email === "") {
			toastMaster({
				transition: "down",
				type: "error",
				message: "kindly enter your email!",
				bg: "white",
			});
			return;
		}
		if (password.length < 6) {
			return toastMaster({
				transition: "down",
				type: "error",
				message: "password must be at least 6 characters long!",
				bg: "white",
			});
		}

		form.reset();

		toastMaster({
			transition: "down",
			type: "loading",
			message: "Logging in...",
			bg: "white",
		});

		try {
			const res = await signIn(email, password);
			const user = res.user;
			navigate(from, { replace: true });
			if (user.uid) {
				toastMaster({
					transition: "down",
					type: "success",
					message: "Successfully Logged In",
					bg: "white",
				});
			}
		} catch (error) {
			toastMaster({
				transition: "down",
				type: "error",
				message: "Login Failed",
				bg: "white",
			});
		}
	};

	return (
		<div className="flex flex-col hero min-w-[28rem]">
			<form
				onSubmit={handleLogin}
				className="flex flex-col w-full px-4 pt-8 pb-12 rounded-md shadow-md gap-y-4"
			>
				<InputField
					label="Your Email"
					type="email"
					id="email"
					name="email"
				/>
				<>
					<PasswordInputField
						label="Your Password"
						id="password"
						name="password"
					/>
					<p className="mt-1 font-medium cursor-pointer text-white-500 hover:underline w-fit">
						<small>Forgot Password?</small>
					</p>
				</>

				<Button
					classname={"text-lg mt-6"}
					type="submit"
					span1="Login?"
					span2="Login"
				/>
			</form>
		</div>
	);
};

export default Login;
