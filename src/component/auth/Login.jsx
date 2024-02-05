import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import useTitle from "../hooks/useWebTitle";

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
				autoClose: 3000,
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
		<div className="hero min-h-screen">
			<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
				<form
					onSubmit={handleLogin}
					className="card-body"
				>
					<h2 className="text-5xl font-bold text-center text-error mb-10">Login!</h2>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							placeholder="email"
							className="input input-bordered bg-white text-gray-600"
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
							className="input input-bordered bg-white text-gray-600"
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
					<div className="form-control mt-6">
						<input
							type="submit"
							value="Login"
							className="btn btn-info rounded-sm text-white"
						/>
					</div>
					<div className="flex justify-center items-center mt-8">
						<p className=" flex gap-2">
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
