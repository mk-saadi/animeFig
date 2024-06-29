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
import { Eye, EyeOff, ImagePlus } from "lucide-react";
import { useToast } from "react-toast-master";
import Button from "../hooks/Button";
import InputField from "../hooks/InputField";
import PasswordInputField from "../hooks/PasswordInputField";

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

	return (
		<div className="flex flex-col hero min-w-[28rem]">
			<form
				onSubmit={handleRegister}
				className="flex flex-col w-full px-4 py-12 rounded-md shadow-md gap-y-4"
			>
				<InputField
					label="Your Name"
					type="text"
					id="name"
					name="name"
				/>

				<div className="flex flex-col w-full gap-y-1.5">
					<label
						htmlFor="image"
						className="text-sm font-medium text-gray-500"
					>
						Upload photo
					</label>

					{selectedFile ? (
						<label
							htmlFor="inputFormPic"
							className="flex gap-x-4 justify-start items-center px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none cursor-pointer shadow-md"
						>
							{imagePreview && (
								<img
									id="preview-image"
									src={imagePreview}
									alt="Image preview"
									className="object-cover rounded-md w-14 h-7"
								/>
							)}
							{selectedFile.name.length > 25
								? `${selectedFile.name.slice(0, 25)}...`
								: selectedFile.name}
						</label>
					) : (
						<label
							htmlFor="inputFormPic"
							className="px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none shadow-md cursor-pointer"
							// className="flex items-center justify-start text-gray-300 cursor-pointer gap-x-2"
						>
							<ImagePlus />
						</label>
					)}
					<input
						type="file"
						id="inputFormPic"
						name="profile"
						accept="image/*"
						onChange={handleChange}
						style={{ display: "none" }}
						// className="px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none shadow-md"
					/>
				</div>

				<InputField
					label="Your Email"
					type="email"
					id="email"
					name="email"
				/>

				<PasswordInputField
					label="Your Password"
					id="password"
					name="password"
				/>

				<PasswordInputField
					label="Confirm Password"
					id="confirmPassword"
					name="confirmPassword"
				/>

				<Button
					type="submit"
					span1="Login?"
					span2="Login"
				/>
			</form>
		</div>
	);
};

export default Register;
