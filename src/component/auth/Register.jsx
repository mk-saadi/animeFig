import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { storage } from "../../../firebase/firebase.config";
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
import useScrollToTop from "../hooks/useScrollToTop";

const Register = () => {
	const { newUser, updateProfileInfo } = useContext(AuthContext);
	const navigate = useNavigate();
	const { toastMaster } = useToast();

	useTitle("auth | register");
	useScrollToTop();

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

	/**
	 * Handles the registration form submission.
	 * @param {Event} event - The form submission event.
	 * @returns {Promise<void>} - A promise that resolves when the registration is complete.
	 */
	const handleRegister = async (event) => {
		event.preventDefault();

		// Get form values
		const form = event.target;
		const name = form.name.value;
		const image = form.image.files[0];
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirmPassword.value;

		// Validate password and confirm password
		if (password.length < 6) {
			return toastMaster({
				type: "errorDark",
				transition: "top",
				position: "bottomLeft",
				message: "password must be at least 6 characters long",
			});
		}
		if (password !== confirmPassword) {
			return toastMaster({
				type: "errorDark",
				transition: "top",
				position: "bottomLeft",
				message: "Passwords do not match",
			});
		}
		if (!image) {
			return toastMaster({
				type: "errorDark",
				transition: "top",
				position: "bottomLeft",
				message: "Please select an image",
			});
		}

		form.reset();

		// Compress image
		const options = {
			maxSizeMB: 0.06,
			maxWidthOrHeight: 800,
			useWebWorker: true,
		};

		toastMaster({
			type: "loadingDark",
			transition: "top",
			position: "bottomLeft",
			message: "Please wait...",
		});

		try {
			const compressedImage = await imageCompression(image, options);

			// Crop and resize image
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

			// Upload and register user
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
							// Register user in the database
							axios
								.post(`${import.meta.env.VITE_URL}/users`, userDocument)
								.then((response) => {
									if (response.data.acknowledged === true) {
										toastMaster({
											type: "successDark",
											transition: "top",
											position: "bottomLeft",
											message: "Registration successful",
										});

										const savedLocation = JSON.parse(
											sessionStorage.getItem("previousLocation")
										);
										const destination = savedLocation?.pathname || "/";
										navigate(destination, { replace: true });
										sessionStorage.removeItem("previousLocation");
									}
								})
								.catch((error) => {
									toastMaster({
										type: "errorDark",
										transition: "top",
										position: "bottomLeft",
										message: "Registration failed",
									});
								});
						}
					);
				} else {
					toastMaster({
						type: "errorDark",
						transition: "top",
						position: "bottomLeft",
						message: "Registration failed",
					});
				}
			};
		} catch (error) {
			toastMaster({
				type: "errorDark",
				transition: "top",
				position: "bottomLeft",
				message: "Registration failed",
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
							className="flex items-center justify-start w-full px-3 py-2 bg-transparent border rounded-md shadow-lg cursor-pointer border-dhusor shadow-gray-900/10 gap-x-4 text-ash placeholder:text-gray-400 focus:outline-none"
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
							className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg cursor-pointer border-dhusor shadow-gray-900/10 text-ash focus:outline-none"
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
					classname={"text-lg mt-6"}
					type="submit"
					span1="Register?"
					span2="Register"
				/>
			</form>
		</div>
	);
};

export default Register;
