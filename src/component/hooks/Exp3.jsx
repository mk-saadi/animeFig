import { useState } from "react";
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from "@headlessui/react";

// import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const products = [
	{
		name: "Analytics",
		description: "Get a better understanding of your traffic",
		href: "#",
	},
	{
		name: "Engagement",
		description: "Speak directly to your customers",
		href: "#",
	},
	{
		name: "Security",
		description: "Your customers’ data will be safe and secure",
		href: "#",
	},
	{ name: "Integrations", description: "Connect with third-party tools", href: "#" },
	{
		name: "Automations",
		description: "Build strategic funnels that will convert",
		href: "#",
	},
];
const callsToAction = [
	{ name: "Watch demo", href: "#", icon: PlayCircleIcon },
	{ name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white">
			<nav
				className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<a
						href="#"
						className="-m-1.5 p-1.5"
					>
						<span className="sr-only">Your Company</span>
						<img
							className="w-auto h-8"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
						/>
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>- - -
					</button>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Popover className="relative">
						<PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
							Product
							<ChevronDownIcon
								className="flex-none w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						</PopoverButton>

						<PopoverPanel
							transition
							className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
						>
							<div className="p-4">
								{products.map((item) => (
									<div
										key={item.name}
										className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
									>
										<div className="flex items-center justify-center flex-none rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
											<item.icon
												className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
												aria-hidden="true"
											/>
										</div>
										<div className="flex-auto">
											<a
												href={item.href}
												className="block font-semibold text-gray-900"
											>
												{item.name}
												<span className="absolute inset-0" />
											</a>
											<p className="mt-1 text-gray-600">{item.description}</p>
										</div>
									</div>
								))}
							</div>
							<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
								{callsToAction.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
									>
										<item.icon
											className="flex-none w-5 h-5 text-gray-400"
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</div>
						</PopoverPanel>
					</Popover>

					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Features
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Marketplace
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Company
					</a>
				</PopoverGroup>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Log in <span aria-hidden="true">&rarr;</span>
					</a>
				</div>
			</nav>
			<Dialog
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a
							href="#"
							className="-m-1.5 p-1.5"
						>
							<span className="sr-only">Your Company</span>
							<img
								className="w-auto h-8"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>X
						</button>
					</div>
					<div className="flow-root mt-6">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="py-6 space-y-2">
								<Disclosure
									as="div"
									className="-mx-3"
								>
									{({ open }) => (
										<>
											<DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
												Product
												<ChevronDownIcon
													className={classNames(
														open ? "rotate-180" : "",
														"h-5 w-5 flex-none"
													)}
													aria-hidden="true"
												/>
											</DisclosureButton>
											<DisclosurePanel className="mt-2 space-y-2">
												{[...products, ...callsToAction].map((item) => (
													<DisclosureButton
														key={item.name}
														as="a"
														href={item.href}
														className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
													>
														{item.name}
													</DisclosureButton>
												))}
											</DisclosurePanel>
										</>
									)}
								</Disclosure>
								<a
									href="#"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Features
								</a>
								<a
									href="#"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Marketplace
								</a>
								<a
									href="#"
									className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
								>
									Company
								</a>
							</div>
							<div className="py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Log in
								</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
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
