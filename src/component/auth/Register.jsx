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
	const { toastMaster, hideToast } = useToast();
	const location = useLocation();

	useTitle("register");

	const from = location.state?.from?.pathname || "/";

	const [selectedFile, setSelectedFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const handleRegister = async (event) => {
		event.preventDefault();

		const form = event.target;
		const name = form.name.value;
		const image = form.image.files[0];
		const email = form.email.value;
		const password = form.password.value;
		const confirmPassword = form.confirmPassword.value;

		if (password.length < 6) {
			return;
		}
		if (!image) {
			alert("Profile image is required.");
			return;
		}

		if (password !== confirmPassword) {
			return;
		}

		form.reset();

		const options = {
			maxSizeMB: 0.05,
			maxWidthOrHeight: 400,
			useWebWorker: true,
		};

		try {
			const compressedImage = await imageCompression(image, options);
			const blob = await imageCompression.getFilefromDataUrl(
				await imageCompression.getDataUrlFromFile(compressedImage),
				image.type
			);

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
							"Upload is " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "% done"
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
									console.log("User document saved successfully");

									setTimeout(() => {
										navigate(from, { replace: true });
									}, 500);
								}
							})
							.catch((error) => {
								console.error("Error saving user document: ", error.message);
							});
					}
				);
			} else {
				console.log("User registration failed");
			}
		} catch (error) {
			console.error("Registration error: ", error.message);
		}
	};

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
