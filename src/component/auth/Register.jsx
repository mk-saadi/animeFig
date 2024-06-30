import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { storage } from "../../firebase/firebase.config";
import useTitle from "../hooks/useWebTitle";
import imageCompression from "browser-image-compression";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";
import { useToast } from "react-toast-master";
import Button from "../hooks/Button";
import InputField from "../hooks/InputField";
import PasswordInputField from "../hooks/PasswordInputField";

const Register = () => {
	const { newUser, updateProfileInfo } = useContext(AuthContext);
	const navigate = useNavigate();
	const { toastMaster } = useToast();
	const location = useLocation();

	useTitle("register");

	const from = location.state?.from?.pathname || "/";

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

	const handleRegister = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const image = form.image.files[0];
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirmPassword.value;

		if (password.length < 6) {
			return toastMaster({
				type: "error",
				message: "password must be at least 6 characters long",
				bg: "gray",
			});
		}
		if (password !== confirmPassword) {
			return toastMaster({
				type: "error",
				message: "Passwords do not match",
				bg: "gray",
			});
		}
		if (!image) {
			return toastMaster({
				type: "error",
				message: "Please select an image",
				bg: "gray",
			});
		}

		form.reset();

		const options = {
			maxSizeMB: 0.06,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};

		toastMaster({
			type: "loading",
			message: "Please wait...",
			bg: "gray",
		});

		try {
			const compressedImage = await imageCompression(image, options);

			const img = new Image();
			img.src = URL.createObjectURL(compressedImage);

			const cropImage = (img) => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				const maxSize = 800;
				const size = Math.min(maxSize, img.width, img.height);

				canvas.width = size;
				canvas.height = size;

				ctx.drawImage(
					img,
					(img.width - size) / 2,
					(img.height - size) / 2,
					size,
					size,
					0,
					0,
					size,
					size
				);

				return canvas.toDataURL("image/jpeg");
			};

			img.onload = async () => {
				const croppedDataURL = cropImage(img);
				const blob = await fetch(croppedDataURL).then((res) => res.blob());

				const res = await newUser(email, password);
				if (res.user) {
					const userId = res.user.uid;
					const fileName = encodeURIComponent(image.name);
					const storageRef = ref(storage, `users/${userId}/profileImages/${fileName}`);
					const uploadTask = uploadBytesResumable(storageRef, blob);

					uploadTask.on(
						"state_changed",
						(snapshot) => {
							console.log(
								"Upload is " +
									(snapshot.bytesTransferred / snapshot.totalBytes) * 100 +
									"% done"
							);
						},
						(error) => {
							console.error("Upload error: ", error.message);
						},
						async () => {
							const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
							const userDocument = {
								photo: downloadURL,
								name: name,
								email: email,
								registrationDate: new Date(),
								role: "general-user",
							};
							await updateProfileInfo(name, downloadURL);

							axios
								.post(`${import.meta.env.VITE_URL}/users`, userDocument)
								.then((response) => {
									if (response.data.acknowledged === true) {
										toastMaster({
											type: "success",
											message: "Registration successful",
											bg: "gray",
										});

										setTimeout(() => {
											navigate(from, { replace: true });
										}, 500);
									}
								})
								.catch((error) => {
									toastMaster({
										type: "error",
										message: "Registration failed",
										bg: "gray",
									});
								});
						}
					);
				} else {
					toastMaster({
						type: "error",
						message: "Registration failed",
						bg: "gray",
					});
				}
			};
		} catch (error) {
			toastMaster({
				type: "error",
				message: "Registration failed",
				bg: "gray",
			});
		}
	};

	return (
		<div className="flex flex-col hero min-w-[28rem]">
			<form
				onSubmit={handleRegister}
				className="flex flex-col w-full px-4 pt-8 pb-12 rounded-md shadow-md gap-y-4"
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
							{selectedFile.name &&
								(selectedFile.name.length > 25
									? `${selectedFile.name.slice(0, 25)}...`
									: selectedFile.name)}
						</label>
					) : (
						<label
							htmlFor="inputFormPic"
							className="px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none shadow-md cursor-pointer"
						>
							<ImagePlus />
						</label>
					)}
					<input
						type="file"
						id="inputFormPic"
						name="image"
						accept="image/*"
						onChange={(event) => handleChange(event)}
						style={{ display: "none" }}
						required
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

				<>
					<PasswordInputField
						label="Confirm Password"
						id="confirmPassword"
						name="confirmPassword"
					/>
					<p className="mt-1 font-medium text-gray-500 cursor-pointer hover:underline w-fit">
						<small>Accept our terms and conditions</small>
					</p>
				</>

				<Button
					type="submit"
					span1="Register?"
					span2="Register"
				/>
			</form>
		</div>
	);
};

export default Register;
