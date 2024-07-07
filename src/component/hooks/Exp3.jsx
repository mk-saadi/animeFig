const handlePost = async (event) => {
	event.preventDefault();

	const images = form.img.files; // 2 image files
	const form = event.target;
	const email = form.email.value;
	const name = form.name.value;
	const price = parseFloat(form.price.value);
	const quantity = parseFloat(form.quantity.value);
	const description = form.description.value;
	const seller = form.seller.value;
	const brand = form.brand.value;
	const category = form.category.value;
	const label = form.label.value;
	const rating = parseFloat(form.ratings.value);
	const offer = parseFloat(form.offer.value);
	const release = form.release.value;
	const series = form.series.value;
	const character = form.character.value;
	const dimension = form.dimension.value;

	// Firebase storage reference
	const storage = getStorage(firebaseApp);
	const uploadPromises = [];

	// Loop through the images and upload them to Firebase Storage
	for (let i = 0; i < images.length; i++) {
		const image = images[i];
		const storageRef = ref(storage, `figures/${image.name}`);
		const uploadTask = uploadBytes(storageRef, image).then((snapshot) => {
			return getDownloadURL(snapshot.ref);
		});
		uploadPromises.push(uploadTask);
	}

	try {
		// Wait for all images to be uploaded and get their download URLs
		const imageUrls = await Promise.all(uploadPromises);

		const figure = {
			images: imageUrls,
			email,
			name,
			price,
			quantity,
			seller,
			description,
			brand,
			release,
			series,
			character,
			category,
			rating,
			label,
			offer,
			dimension,
		};

		// Post the figure data to your backend
		const response = await axios.post(`${import.meta.env.VITE_URL}/addedFigure`, figure);

		if (response.status === 200) {
			console.log("Figure added successfully");
			// Reset form or show success message
		} else {
			console.error("Failed to add figure");
		}
	} catch (error) {
		console.error("Error uploading images or posting figure data:", error);
	}
};

import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Assuming Firebase v9+

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const people = [
	{ id: 1, name: "Tom Cook" },
	{ id: 2, name: "Wade Cooper" },
	{ id: 3, name: "Tanya Fox" },
	{ id: 4, name: "Arlene Mccoy" },
	{ id: 5, name: "Devon Webb" },
];

export default function Example() {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(people[1]);

	const filteredPeople =
		query === ""
			? people
			: people.filter((person) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<div className="mx-auto h-screen w-52 pt-20">
			<Combobox
				value={selected}
				onChange={(value) => setSelected(value)}
				onClose={() => setQuery("")}
				__demoMode
			>
				<div className="relative">
					<ComboboxInput
						className={clsx(
							"w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
							"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
						)}
						displayValue={(person) => person?.name}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
						<ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
					</ComboboxButton>
				</div>

				<ComboboxOptions
					anchor="bottom"
					transition
					className={clsx(
						"w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
						"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
					)}
				>
					{filteredPeople.map((person) => (
						<ComboboxOption
							key={person.id}
							value={person}
							className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
						>
							<CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
							<div className="text-sm/6 text-white">{person.name}</div>
						</ComboboxOption>
					))}
				</ComboboxOptions>
			</Combobox>
		</div>
	);
}

// "devDependencies": {
// 	"@types/react": "^18.3.3",
// 	"@types/react-dom": "^18.3.0",
// 	"@vitejs/plugin-react": "^4.3.1",
// 	"autoprefixer": "^10.4.17",
// 	"eslint": "^8.55.0",
// 	"eslint-plugin-react": "^7.34.2",
// 	"eslint-plugin-react-hooks": "^4.6.2",
// 	"eslint-plugin-react-refresh": "^0.4.7",
// 	"postcss": "^8.4.33",
// 	"tailwindcss": "^3.4.1",
// 	"vite": "^5.3.1"
// }

// <PopoverGroup className="flex items-center gap-x-1.5">
// 	<Popover className={`relative group`}>
// 		<div className="flex flex-col items-center w-[9ch] justify-center overflow-x-hidden group">
// 			<PopoverButton className="px-1 justify-center items-center gap-x-1.5 text-base duration-300 flex text-white font-[300] data-[focus]:outline-none focus:outline-none">
// 				Figures
// 				<ChevronDownIcon
// 					// size={26}
// 					className="size-5 group-data-[open]:rotate-180"
// 				/>
// 			</PopoverButton>
// 			<span className="w-[100px] h-px group-hover:bg-white group-focus:outline-none bg-opacity-0 group-hover:bg-opacity-100 p-0 duration-300" />
// 		</div>
// 		<PopoverPanel
// 			transition
// 			anchor="bottom"
// 			className="divide-y divide-white/5 z-50 border-dhusor border rounded-xl bg-white text-ash text-sm transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] mt-7 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
// 		>
// 			<div className="p-3">
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold ">Insights</p>
// 					<p className="">
// 						Measure actions your users take
// 					</p>
// 				</a>
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold">Automation's</p>
// 					<p className="">
// 						Create your own targeted content
// 					</p>
// 				</a>
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold text-white">
// 						Reports
// 					</p>
// 					<p className="text-white/50">
// 						Keep track of your growth
// 					</p>
// 				</a>
// 			</div>
// 			<div className="p-3">
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold text-white">
// 						Documentation
// 					</p>
// 					<p className="text-white/50">
// 						Start integrating products and tools
// 					</p>
// 				</a>
// 			</div>
// 		</PopoverPanel>
// 	</Popover>
// 	{/* by series */}
// 	<Popover className={`relative group`}>
// 		<div className="flex flex-col items-center w-[8ch] justify-center overflow-x-hidden group">
// 			<PopoverButton className="px-1 justify-center items-center gap-x-1.5 text-base duration-300 flex text-white font-[300] data-[focus]:outline-none focus:outline-none">
// 				Series
// 				<ChevronDownIcon
// 					// size={26}
// 					className="size-5 group-data-[open]:rotate-180"
// 				/>
// 			</PopoverButton>
// 			<span className="w-[100px] h-px group-hover:bg-white group-focus:outline-none bg-opacity-0 group-hover:bg-opacity-100 p-0 duration-300" />
// 		</div>
// 		<PopoverPanel
// 			transition
// 			anchor="bottom"
// 			className="divide-y divide-white/5 z-50 border-dhusor border rounded-xl bg-white text-ash text-sm transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] mt-7 data-[closed]:-translate-y-1 data-[closed]:opacity-0"
// 		>
// 			<div className="p-3">
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold ">Insights</p>
// 					<p className="">
// 						Measure actions your users take
// 					</p>
// 				</a>
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold">automation's</p>
// 					<p className="">
// 						Create your own targeted content
// 					</p>
// 				</a>
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold text-white">
// 						Reports
// 					</p>
// 					<p className="text-white/50">
// 						Keep track of your growth
// 					</p>
// 				</a>
// 			</div>
// 			<div className="p-3">
// 				<a
// 					className="block px-3 py-2 transition rounded-lg hover:bg-white/5"
// 					href="#"
// 				>
// 					<p className="font-semibold text-white">
// 						Documentation
// 					</p>
// 					<p className="text-white/50">
// 						Start integrating products and tools
// 					</p>
// 				</a>
// 			</div>
// 		</PopoverPanel>
// 	</Popover>
// </PopoverGroup>;
