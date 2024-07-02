import { Link } from "react-router-dom";
import img from "../../assets/img.png";
import { useContext, useState, Fragment, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../provider/CartProvider";
import Cart from "./Cart";
import {
	Disclosure,
	Menu,
	Transition,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
} from "@headlessui/react";
import {
	X,
	Menu as MenuIcon,
	UserCircle,
	Search,
	Plus,
	User2,
	PartyPopper,
	DollarSign,
	Twitter,
	Facebook,
	Youtube,
	Linkedin,
	User,
	ChevronDownIcon,
	PlayCircleIcon,
	PhoneIcon,
} from "lucide-react";
import InputField from "../hooks/InputField";
import useScroll from "../hooks/Scroll";

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

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	console.log("user: ", user);
	const [showUserName, setShowUserName] = useState(false);
	const { cartItems, dispatch } = useCart();
	const isScrolled = useScroll("top-navbar");

	const totalPrice = cartItems.reduce((total, item) => total + item.figPrice, 0);

	const handleLogOut = () => {
		logOut()
			.then(() => {})
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

	// const navMenu = (
	// 	<>
	// 		<Link to="/">
	// 			<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent">
	// 				Home
	// 			</button>{" "}
	// 		</Link>
	// 		<Link to="/allToys">
	// 			<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent">
	// 				All Figures
	// 			</button>
	// 		</Link>
	// 		{user && (
	// 			<>
	// 				<Link to="/myToys">
	// 					<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent text-accent">
	// 						My Figures
	// 					</button>
	// 				</Link>
	// 				<Link to="/addAToys">
	// 					<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent text-accent">
	// 						Add New Figures
	// 					</button>
	// 				</Link>
	// 			</>
	// 		)}
	// 	</>
	// );

	// const [isScrolled, setIsScrolled] = useState(false);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const topNavbarHeight = document.getElementById("top-navbar").offsetHeight;
	// 		if (window.scrollY > topNavbarHeight) {
	// 			setIsScrolled(true);
	// 		} else {
	// 			setIsScrolled(false);
	// 		}
	// 	};

	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	return (
		<div className="w-full shadow-lg h-fit">
			<div
				id="top-navbar"
				className={`bg-white overflow-hidden fixed w-full top-0 z-[30] h-[45px] transition-transform${
					isScrolled ? "-translate-y-full" : "translate-y-0"
				}`}
			>
				<div className="flex items-center justify-between h-full mx-8">
					{/* first div start */}
					<div className="flex items-center justify-center gap-x-1.5">
						<div className="hidden lg:block">
							<Link
								to="/"
								className="flex items-center gap-x-1.5 justify-center"
							>
								<h1 className="text-base text-laal uppercase font-[900] font-serif">
									anime-Fig
								</h1>
							</Link>
						</div>
						<span className="mx-2.5 w-px h-[20px] py-px bg-dhusor  lg:block hidden" />
						<div className="flex items-end justify-start gap-x-2.5 text-ash">
							<Twitter
								className="cursor-pointer hover:text-laal"
								size={20}
							/>
							<Facebook
								className="cursor-pointer hover:text-laal"
								size={20}
							/>
							<Youtube
								className="cursor-pointer hover:text-laal"
								size={20}
							/>
							<Linkedin
								className="cursor-pointer hover:text-laal"
								size={20}
							/>
						</div>
					</div>
					{/* second div end */}
					<div className="flex items-center justify-center gap-x-1.5 h-full">
						<div className="hidden text-sm lg:block text-ash">
							<p className="flex gap-x-1.5 font-normal items-center justify-center">
								<PartyPopper
									size={20}
									className="text-laal"
								/>
								Get free delivery on orders over $100
								<PartyPopper
									size={20}
									className="text-laal"
								/>
							</p>
						</div>
						<span className="mx-2.5 w-px lg:block hidden h-[20px] py-px bg-dhusor " />
						{user ? (
							<>
								<div className="flex items-center justify-center gap-x-1.5">
									<img
										src={user?.photoURL}
										alt=""
										className="w-8 h-8 rounded-full"
									/>
									<p className="text-sm text-ash">{user?.displayName}</p>
								</div>
							</>
						) : (
							<div className="flex items-center text-ash duration-300 justify-center gap-x-1.5 text-sm">
								<Link
									className="font-normal flex hover:text-laal items-center justify-center gap-x-1.5"
									to="/auth/login"
								>
									<User2 size={20} /> Login
								</Link>
								<span className="mx-2.5 w-px h-[20px] py-px bg-dhusor " />
								<Link
									className="font-normal flex hover:text-laal items-center justify-center gap-x-1.5"
									to="/auth/register"
								>
									<Plus size={20} /> Create Account
								</Link>
							</div>
						)}
						<span className="mx-2.5 w-px h-[20px] py-px bg-dhusor " />
						{/* cart item below */}
						<div className="-ml-1.5 flex justify-center items-center gap-x-1.5">
							<Cart />
							<span className="flex items-center justify-center text-sm font-normal text-ash ">
								<DollarSign size={20} />
								{totalPrice.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>
			<Disclosure
				as="nav"
				className={`border-b bg-gradient-to-r from-[#e7230d] to-[#f4ae18] duration-100 fixed z-50 w-full border-black border-opacity-30 shadow-lg ${
					isScrolled ? "top-0" : "top-[45px]"
				}`}
			>
				{({ open }) => (
					<>
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-4">
							<div className="flex items-center justify-between h-16">
								<div className="flex items-center">
									<div
										className={`flex-shrink-0 text-white flex font-sans flex-col leading-3 items-end ${
											isScrolled ? "block" : "hidden"
										}`}
									>
										{/* <img
											className="w-9 h-9"
											src={img}
											alt="Your Company"
										/> */}
										<h2 className="text-2xl font-extrabold">ANIME</h2>
										<h3 className="text-lg font-extrabold leading-3">FIG</h3>
									</div>
									<span
										className={`mx-2.5 w-px h-[30px] py-px bg-dhusor lg:block hidden ${
											isScrolled ? "bg-opacity-100" : "bg-opacity-0 -mr-2.5"
										}`}
									/>
									<div className="hidden md:block">
										<div className="flex items-baseline ml-10 space-x-4">
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
																		<p className="mt-1 text-gray-600">
																			{item.description}
																		</p>
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
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="flex items-center gap-x-4">
										{/* search bar */}
										<div className="hidden md:block w-[24rem] ml-1">
											<Link
												to="/auth/login"
												className="relative w-full"
											>
												<div className="mt-1">
													<input
														type="search"
														name=""
														className="w-full pl-3 font-[300] bg-transparent border-b border-white placeholder:text-white focus:outline-none"
														placeholder="Search a product"
														id=""
													/>
												</div>
												<button className="absolute right-0 flex items-center pr-3 text-white transform -translate-y-1/2 cursor-pointer top-1/2">
													<Search size={20} />
												</button>
											</Link>
										</div>
										{/* Profile dropdown large device */}
										{isScrolled && (
											<Menu
												as="div"
												className="relative"
											>
												{user ? (
													<Menu.Button className="relative flex items-center max-w-xs text-sm bg-transparent rounded-full focus:outline-none">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">Open user menu</span>
														<img
															className="w-8 h-8 rounded-full ring-2 ring-white"
															src={user?.photoURL}
															alt=""
														/>
													</Menu.Button>
												) : (
													<Menu.Button className="relative flex items-center text-white bg-transparent rounded-full focus:outline-none">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">Open user menu</span>
														<UserCircle size={25} />
													</Menu.Button>
												)}
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-dhusor focus:outline-none">
														{user && (
															<div className="overflow-hidden border-b border-gray-200">
																<p className="block px-4 py-2 text-sm text-gray-700">
																	{user?.displayName}
																</p>
																<p className="block px-4 pb-2 text-sm text-gray-700">
																	{user?.email}
																</p>
															</div>
														)}
														{user && (
															<Menu.Item>
																<Link className="block px-4 py-2 text-sm text-ash hover:text-laal">
																	Profile
																</Link>
															</Menu.Item>
														)}
														{!user && (
															<Menu.Item>
																<Link
																	className="block px-4 py-2 text-sm text-ash hover:text-laal"
																	to="/auth/login"
																>
																	Sign In
																</Link>
															</Menu.Item>
														)}
														<Menu.Item>
															<Link className="block px-4 py-2 text-sm text-ash hover:text-laal">
																View Cart
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link className="block px-4 py-2 text-sm text-ash hover:text-laal">
																Checkout
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link className="block px-4 py-2 text-sm text-ash hover:text-laal">
																Settings
															</Link>
														</Menu.Item>
														{user && (
															<Menu.Item className="duration-300 border-t border-gray-200 hover:text-laal">
																<Link
																	onClick={handleLogOut}
																	className="block px-4 py-2 text-sm text-ash"
																>
																	Logout
																</Link>
															</Menu.Item>
														)}
													</Menu.Items>
												</Transition>
											</Menu>
										)}
										{isScrolled && (
											<button
												type="button"
												className="relative bg-transparent "
											>
												<span className="absolute -inset-1.5" />
												<span className="sr-only">View cart items</span>
												<Cart aria-hidden="true" />
											</button>
										)}
										{/* // ) : (
										// 	<>
										// 		<Link
										// 			to="/auth/login"
										// 			className="flex items-center justify-center gap-x-2"
										// 		>
										// 			<UserCircle /> Login
										// 		</Link>
										// 	</>
										// )}*/}
										{/* search bar */}
									</div>
								</div>
								<div className="flex -mr-2 md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<X
												className="block w-6 h-6"
												aria-hidden="true"
											/>
										) : (
											<MenuIcon
												className="block w-6 h-6"
												aria-hidden="true"
											/>
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="md:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								<Disclosure.Button
									as="p"
									className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md text-dhusor hover:bg-gray-700 hover:text-white"
								>
									Home
								</Disclosure.Button>
							</div>
							<div className="pt-4 pb-3 border-t border-gray-700">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<img
											className="w-10 h-10 rounded-full"
											src={user?.photoURL}
											alt=""
											loading="lazy"
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">
											{user?.displayName}
										</div>
										<div className="text-sm font-medium leading-none text-gray-400">
											{user?.email}
										</div>
									</div>

									{/* cart drawer */}
									<button
										type="button"
										className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View cart items</span>
										<Cart aria-hidden="true" />
									</button>
								</div>
								<div className="px-2 mt-3 space-y-1">
									<Disclosure.Button
										as="p"
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Profile
									</Disclosure.Button>
									<Disclosure.Button
										as="p"
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Settings
									</Disclosure.Button>
									<Disclosure.Button
										as="button"
										onClick={handleLogOut}
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Logout
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default Navbar;
