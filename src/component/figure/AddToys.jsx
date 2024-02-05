import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import useTitle from "../hooks/useWebTitle";
import { BsQuestionSquareFill } from "react-icons/bs";

const AddToys = () => {
	const { user } = useContext(AuthContext);
	useTitle("addFigures");

	const handlePost = (event) => {
		event.preventDefault();

		const form = event.target;
		const img = form.img.value;
		const email = form.email.value;
		const name = form.name.value;
		const price = parseFloat(form.price.value);
		const quantity = parseFloat(form.quantity.value);
		const description = form.description.value;
		const seller = form.seller.value;
		const Manufacturer = form.Manufacturer.value;
		const category = form.category.value;
		const rating = parseFloat(form.ratings.value);

		const figure = {
			img: img,
			email: email,
			name: name,
			price: price,
			quantity: quantity,
			seller: seller,
			description: description,
			Manufacturer: Manufacturer,
			category: category,
			rating: rating,
		};

		fetch(`${import.meta.env.VITE_URL}/addedFigure`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(figure),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					toast.success("Your new booking was successfully added.", {
						position: "top-center",
						autoClose: 4000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				form.reset();
			});
	};

	return (
		<div className="bg-gray-800">
			<form
				onSubmit={handlePost}
				className="px-1 my-20"
			>
				<div className="relative px-2 mx-0 rounded-md card-body sm:px-6 bg-base-300 md:px-24">
					<p className="text-2xl font-bold text-left text-error">Add New Figure To Database</p>
					<div className="grid grid-cols-2 gap-2 pt-10 sm:grid-cols-2 md:gap-4">
						{/* seller */}
						<div className="form-control">
							<input
								type="text"
								name="seller"
								required
								defaultValue={user?.displayName}
								placeholder="seller's name"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						{/* last name */}
						<div className="form-control">
							<input
								type="text"
								name="name"
								required
								placeholder="product name"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						{/* phone */}
						<div className="form-control">
							<input
								type="email"
								name="email"
								required
								defaultValue={user?.email}
								placeholder="seller's email"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						{/* email */}
						<div className="form-control">
							<input
								type="text"
								name="price"
								required
								placeholder="product price ($)"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						<div className="form-control">
							<input
								type="text"
								name="Manufacturer"
								required
								placeholder="manufacturer"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						<div className="form-control">
							<input
								type="url"
								name="img"
								required
								placeholder="product image"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						<div className="form-control">
							<input
								type="text"
								name="ratings"
								required
								placeholder="rating (number)"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
							/>
						</div>
						<div className="form-control">
							<input
								type="text"
								name="quantity"
								required
								placeholder="quantity"
								className="text-sm bg-gray-600 rounded-sm sm:text-base text-slate-100 input input-bordered"
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
								products sub-category
							</option>
							<option className="text-xs">Nendoroid</option>
							<option className="text-xs">Figma</option>
							<option className="text-xs">Scale Figures</option>
							<option className="text-xs">Bishoujo Figures</option>
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
