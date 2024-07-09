import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import useTitle from "../hooks/useWebTitle";
import { BsQuestionSquareFill } from "react-icons/bs";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { ImagePlus } from "lucide-react";
import { useToast } from "react-toast-master";
import Button from "../hooks/Button";
import InputField from "../hooks/InputField";
import useScrollToTop from "../hooks/useScrollToTop";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useFigures } from "../hooks/APIS";

const AddToys = () => {
	const { user } = useContext(AuthContext);
	const { toastMaster } = useToast();
	const {
		figure: formValues,
		isLoading: isLoadingFormValues,
		error: errorFormValues,
	} = useFigures("/figures/form_values");

	useTitle("addFigures");
	useScrollToTop();

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);

	const handleChange = (event) => {
		const newFiles = event.target.files;

		// Check if total selected files exceed 2
		if (selectedFiles.length + newFiles.length > 3) {
			alert("Maximum 3 images allowed!");
			return;
		}

		// Update selected files and previews
		setSelectedFiles([...selectedFiles, ...newFiles]);
		setImagePreviews(
			[...imagePreviews, ...Array.from(newFiles)].map((file) => URL.createObjectURL(file))
		);
	};

	const handlePost = async (event) => {
		event.preventDefault();

		const form = event.target;

		const images = Array.from(form.img.files);
		const email = user?.email;
		const name = form.name.value;
		const price = parseFloat(form.price.value);
		const quantity = parseFloat(form.quantity.value);
		const description = form.description.value;
		const brand = form.brand.value;
		const category = form.category.value;
		const label = form.label.value;
		const offer = parseInt(form.offer.value);
		const release = form.release.value;
		const series = form.series.value;
		const character = form.character.value;
		const dimension = form.dimension.value;

		const processFigureName = (name) => {
			return name
				.toLowerCase()
				.replace(/[^\w\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-");
		};

		const link = processFigureName(name);

		const figure = {
			email,
			name,
			price,
			quantity,
			description,
			brand,
			release,
			series,
			character,
			category,
			rating: 0,
			label,
			offer,
			dimension,
			images: [],
			link,
		};

		toastMaster({
			type: "loadingWhite",
			message: "Please wait...",
			transition: "down",
			bg: "glass",
			loadFooter: <p className="text-ash">This seems to be a long process, please wait</p>,
		});

		try {
			if (images.length > 0) {
				const storage = getStorage();

				for (const imageFile of images) {
					const imageRef = ref(storage, `figures/${series}/${imageFile.name}`);
					await uploadBytes(imageRef, imageFile);

					const imageURL = await getDownloadURL(imageRef);
					figure.images.push(imageURL);
				}
			}

			const res = await axios.post(`${import.meta.env.VITE_URL}/figures`, figure);
			console.log("res: ", res);
			if (res.data.acknowledged === true) {
				toastMaster({
					type: "successWhite",
					bg: "glass",
					message: "Figure successfully added!",
					transition: "down",
				});
				form.reset();
			}

			// Handle success or error messages here
		} catch (error) {
			console.error("Error uploading images or sending data:", error);
			// Handle errors appropriately, e.g., display an error message to the user
		}
	};

	return (
		<div className="bg-white">
			<form
				onSubmit={handlePost}
				className="px-1 my-20"
			>
				<div className="relative px-2 mx-0 bg-white rounded-md card-body sm:px-6 md:px-24">
					<p className="text-2xl font-bold text-left text-error">Add New Figure To Database</p>
					<div className="grid grid-cols-2 gap-2 pt-10 sm:grid-cols-2 md:gap-4">
						<div className="form-control">
							<InputField
								label="figure name *"
								type="text"
								id="name"
								name="name"
							/>
						</div>
						{/* email */}
						<div className="form-control">
							<InputField
								label="figure price (in $) *"
								type="text"
								id="price"
								name="price"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="manufacturing brand *"
								type="text"
								id="brand"
								name="brand"
							/>
						</div>
						{/* <div className="form-control">
							<input
								type="url"
								name="img"
								required
								placeholder="product image"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div> */}
						{/* figure images */}
						<div className="flex flex-col w-full gap-y-1.5">
							<label
								htmlFor="image"
								className="text-sm font-medium text-gray-500"
							>
								Upload photo (Max 3 images) *
							</label>
							{selectedFiles.length > 0 ? (
								<div className="grid grid-cols-3 gap-2">
									{imagePreviews.map((preview, index) => (
										<img
											key={index}
											src={preview}
											alt="Image preview"
											className="object-cover w-full h-24 rounded-md"
										/>
									))}
								</div>
							) : (
								<label
									htmlFor="inputFormPic"
									className="flex items-center justify-start w-full px-3 py-2 bg-transparent border rounded-md shadow-lg cursor-pointer border-dhusor shadow-gray-900/10 gap-x-4 text-ash focus:outline-none"
								>
									<ImagePlus />{" "}
									{/* Assuming ImagePlus component for visual representation */}
								</label>
							)}
							<input
								type="file"
								id="inputFormPic"
								name="img"
								multiple
								accept="image/*"
								onChange={handleChange}
								style={{ display: "none" }}
								required={selectedFiles.length < 3} // Disable when 3 images are selected
							/>
						</div>
						{/* quantity */}
						<div className="form-control">
							<InputField
								label="quantity *"
								type="text"
								id="quantity"
								name="quantity"
							/>
						</div>
						{/* <div className="form-control">
							<InputField
								label="figure category *"
								type="text"
								id="category"
								name="category"
							/>
						</div> */}
						<div className="form-control">
							<InputField
								label="figure series *"
								type="text"
								id="series"
								name="series"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="offer (in %)"
								type="text"
								id="offer"
								name="offer"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="release date"
								type="date"
								id="release"
								name="release"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="character"
								type="text"
								id="character"
								name="character"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="dimension"
								type="text"
								id="dimension"
								name="dimension"
							/>
						</div>
						<div className="form-control">
							<InputField
								label="label"
								type="text"
								id="label"
								name="label"
							/>
						</div>
						<select
							className="bg-gray-600 rounded-sm select select-info"
							name="category"
						>
							<option
								disabled
								selected
							>
								products category
							</option>
							<option className="text-xs">Nendoroid</option>
							<option className="text-xs">Figma</option>
							<option className="text-xs">Scale Figures</option>
							<option className="text-xs">Bishoujo Figures</option>
							<option className="text-xs">Plushies</option>
						</select>
						<div>
							<div className="dropdown dropdown-hover">
								<label
									tabIndex={0}
									className="btn btn-circle btn-ghost btn-xs text-info"
								>
									<BsQuestionSquareFill className="text-xl" />
								</label>
								<div
									tabIndex={0}
									className="rounded-sm shadow card compact dropdown-content bg-base-100"
								>
									<div className="py-3 px-2 text-[9px] sm:text-xs md:w-80 sm:w-64 w-48">
										<p>
											<span className="text-info">Nendoroid:</span> Chibi-style figures
											with a cute and deformed design, featuring interchangeable faces,
											accessories, and poses.
										</p>
										<p>
											<span className="text-info">Figma:</span> Articulated action
											figures with high poseability and interchangeable parts.
										</p>
										<p>
											<span className="text-info">Scale Figures:</span> Detailed and
											meticulously crafted anime figures in various scales, capturing
											characters with lifelike accuracy.
										</p>
										<p>
											<span className="text-info">Bishoujo Figures:</span> Anime figures
											focusing on the beauty and allure of female characters.
										</p>
										<p>
											<span className="text-info">Plushies:</span> Anime plushis are
											deformed shaped made from plush and cotton.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-4 pb-10">
						<textarea
							name="description"
							required
							className="text-slate-200 textarea textarea-info rounded-sm bg-gray-600 w-full min-h-[10rem]"
							placeholder="Product Description"
						></textarea>
					</div>
					<input
						type="submit"
						className="absolute text-white rounded-sm bottom-4 md:right-24 btn btn-info"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default AddToys;
