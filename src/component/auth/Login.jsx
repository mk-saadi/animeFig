import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import useTitle from "../hooks/useWebTitle";
import Button from "../hooks/Button";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	useTitle("login");

	const from = location.state?.from?.pathname || "/";

	const handleLogin = (event) => {
		event.preventDefault();

		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		if (password.length < 6) {
			toast.error("password must be at least 6 characters long!", {
				position: "top-center",
				autoClose: 30000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return;
		}

		form.reset();

		signIn(email, password)
			.then((res) => {
				const user = res.user;

				navigate(from, { replace: true });

				if (user.uid) {
					toast.success("Successfully Logged In", {
						position: "top-center",
						autoClose: 4000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch((error) => {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	};

	return (
		<div className="min-h-screen hero">
			<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card">
				<form
					onSubmit={handleLogin}
					className="card-body"
				>
					<h2 className="mb-10 text-5xl font-bold text-center text-error">Login!</h2>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							placeholder="email"
							className="text-gray-600 bg-white input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							className="text-gray-600 bg-white input input-bordered"
						/>
						<label className="label">
							<a
								href="#"
								className="label-text-alt link link-hover"
							>
								Forgot password?
							</a>
						</label>
					</div>
					{/* <div className="mt-6 form-control">
						<input
							type="submit"
							value="Login"
							className="text-white rounded-sm btn btn-info"
						/>
					</div> */}
					<Button
						type="submit"
						span1="Login?"
						span2="Login"
					/>
					<div className="flex items-center justify-center mt-8">
						<p className="flex gap-2 ">
							New To AnimeFig?
							<Link
								className="flex justify-around link link-error"
								to="/register"
							>
								Register Now
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
