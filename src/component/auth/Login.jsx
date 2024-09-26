import { useContext } from "react";
import { useNavigate } from "react-router-dom";
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

	useTitle("auth | login");
	useScrollToTop();

	const handleLogin = async (event) => {
		event.preventDefault();
		const { email, password } = event.target.elements;

		if (password.value.length < 6) {
			toastMaster({
				transition: "down",
				type: "error",
				message: "password must be at least 6 characters long!",
				bg: "white",
			});
			return;
		}

		try {
			toastMaster({
				type: "loadingDark",
				message: "Logging in...",
				position: "bottomLeft",
				transition: "top",
			});
			const { user } = await signIn(email.value, password.value);
			const savedLocation = JSON.parse(sessionStorage.getItem("previousLocation"));
			const destination = savedLocation?.pathname || "/";
			navigate(destination, { replace: true });
			sessionStorage.removeItem("previousLocation");

			if (user.uid) {
				toastMaster({
					type: "successDark",
					message: "Successfully Logged In",
					position: "bottomLeft",
					transition: "top",
				});
			}
		} catch {
			toastMaster({
				type: "errorDark",
				message: "Login Failed",
				position: "bottomLeft",
				transition: "top",
			});
			event.target.reset();
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
