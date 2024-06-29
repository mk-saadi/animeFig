import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { storage } from "../../firebase/firebase.config";
import useTitle from "../hooks/useWebTitle";
import imageCompression from "browser-image-compression";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "react-toast-master";
import Button from "../hooks/Button";

const Register = () => {
	const { newUser, updateProfileInfo } = useContext(AuthContext);
	const navigate = useNavigate();
	const { toastMaster, hideToast } = useToast();

	useTitle("register");

	const handleRegister = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const image = form.profile.files[0];
		const email = form.email.value;
		const password = form.password.value;

		if (password.length < 6) {
			// toast.error("password must be at least 6 characters long!", {
			// 	position: "top-center",
			// 	autoClose: 3000,
			// 	hideProgressBar: false,
			// 	closeOnClick: true,
			// 	pauseOnHover: true,
			// 	draggable: true,
			// 	progress: undefined,
			// });

			toastMaster({
				type: "errorWhite",
				message: "password must be at least 6 characters long!",
				bg: "error",
			});
			return;
		}

		form.reset();

		// newUser(email, password)
		// 	.then((res) => {
		// 		const user = res.user;
		// 		updateProfile(auth.currentUser, {
		// 			displayName: name,
		// 			photoURL: URL.createObjectURL(profile),
		// 		});
		// 		if (user.uid) {
		// 			toast.success("Account successfully created", {
		// 				position: "top-center",
		// 				autoClose: 4000,
		// 				hideProgressBar: false,
		// 				closeOnClick: true,
		// 				pauseOnHover: true,
		// 				draggable: true,
		// 				progress: undefined,
		// 			});
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		toast.error(error.message, {
		// 			position: "top-center",
		// 			autoClose: 4000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined,
		// 		});
		// 	});

		const options = {
			maxSizeMB: 0.05,
			maxWidthOrHeight: 400,
			useWebWorker: true,
		};
		const compressedImage = await imageCompression(image, options);
		const blob = await imageCompression.getFilefromDataUrl(
			await imageCompression.getDataUrlFromFile(compressedImage),
			image.type
		);

		try {
			const res = await newUser(email, password);
			if (res.user) {
				const storageRef = ref(storage, email);
				const uploadTask = uploadBytesResumable(storageRef, blob);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						console.log(
							"Upload is " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "% done"
						);
					},
					(error) => {
						console.log(error.message);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							const userDocument = {
								photo: downloadURL,
								name: name,
								email: email,
								registrationDate: new Date(),
								role: "general-user",
							};
							updateProfileInfo(name, downloadURL);

							axios
								.post(`${import.meta.env.VITE_URL}/users`, userDocument)
								.then((response) => {
									if (response.data.acknowledged === true) {
										// showToast("success", "Registration successful!");
										console.log("error.message");

										form.reset();
										setTimeout(() => {
											// showToast("loading", "Redirecting");
											console.log("error.message");

											setTimeout(() => {
												// navigate("/");
											}, 500);
										}, 1000);
									}
								})
								.catch((error) => {
									console.log(error.message);
									// showToast("error", "Couldn't store data to database!");
								});
						});
					}
				);
			} else {
				// showToast("error", "Error registering user!");
				console.log("error.message");
			}
		} catch (error) {
			// showToast("error", "Error registering user!");
			console.log(error.message);
		}
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const handleChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const imageUrl = URL.createObjectURL(file);
			setImagePreview(imageUrl);
		}
	};

	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="min-h-screen py-10 hero">
			<div className="flex-shrink-0 w-full max-w-md bg-white shadow-xl card">
				<form
					onSubmit={handleRegister}
					className="card-body"
				>
					<h2 className="mb-10 text-5xl font-bold text-center text-error">Register!</h2>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							name="name"
							required
							placeholder="your name"
							className="text-gray-600 bg-white input input-bordered"
						/>
					</div>

					{/* <div className="form-control">
						<label className="label">
							<span className="label-text">Profile</span>
						</label>
						<input
							name="profile"
							type="file"
							required
							className="w-full max-w-xs file-input file-input-bordered file-input-error"
						/>
					</div> */}
					<div
						className="bg-[#42486a]"
						id="parag"
						tabIndex={1}
					>
						<p className="text-sm font-medium text-gray-400">Your Photo</p>

						{selectedFile ? (
							<label
								htmlFor="inputFormPic"
								className="flex gap-2 text-gray-300 cursor-pointer"
							>
								{imagePreview && (
									<img
										id="preview-image"
										src={imagePreview}
										alt="Image preview"
										className="object-cover rounded-full w-7 h-7"
									/>
								)}
								{selectedFile.name.length > 25
									? `${selectedFile.name.slice(0, 25)}...`
									: selectedFile.name}
							</label>
						) : (
							<label
								htmlFor="inputFormPic"
								className="flex items-center justify-start text-gray-300 cursor-pointer gap-x-2"
							>
								{/* <ImagePlus /> */}
								Upload photo
							</label>
						)}
						<input
							type="file"
							id="inputFormPic"
							name="image"
							accept="image/*"
							onChange={handleChange}
							style={{ display: "none" }}
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							required
							placeholder="your email"
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
							required
							placeholder="your password"
							className="text-gray-600 bg-white input input-bordered"
						/>
					</div>
					{/* <label className="label">
						<p
							href="#"
							className="text-sm"
						>
							Accept our{" "}
							<span className="text-sm label-text-alt link link-hover">
								terms and conditions
							</span>
						</p>
					</label> */}
					<div className="bg-[#42486a]">
						<p className="text-sm font-medium text-gray-400">Password</p>
						<div className="flex">
							<input
								id="inputForm"
								name="password"
								autoComplete="off"
								required
								type={showPassword ? "text" : "password"}
							/>

							<button
								type="button"
								onClick={handleTogglePassword}
								className="text-gray-300 outline-none"
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</button>
						</div>
					</div>
					<div className="w-full mt-6 form-control">
						<Button
							type="submit"
							span1="Login?"
							span2="Login"
						/>
					</div>
					<div className="flex items-center justify-center mt-8">
						<p className="flex gap-2 ">
							Already Have An Account
							<Link
								className="flex justify-around link link-error"
								to="/login"
							>
								Login Now
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
