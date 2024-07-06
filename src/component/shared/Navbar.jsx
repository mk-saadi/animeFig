import { Link } from "react-router-dom";
import { useContext, useState, Fragment, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../provider/CartProvider";
import Cart from "./Cart";
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
	Menu,
	Transition,
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
	UserCircleIcon,
	LogOut,
	Settings,
	LogIn,
	ShoppingCart,
	ArrowRightFromLine,
} from "lucide-react";
import useScroll from "../hooks/Scroll";
import { useCategoriesState } from "../hooks/APIS";

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	const { cartItems, dispatch } = useCart();
	const isScrolled = useScroll("top-navbar");
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSeries, setIsOpenSeries] = useState(false);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [categories] = useCategoriesState();

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
	const [isOpenCart, setIsOpenCart] = useState(false);

	const toggleDrawer = () => setIsOpenCart(!isOpenCart);

	// const [hoveredCategory, setHoveredCategory] = useState(null);
	// const handleMouseEnter = (categoryId) => {
	// 	setHoveredCategory(categoryId);
	// };
	// const handleMouseLeave = () => {
	// 	setHoveredCategory(null);
	// };
	const [hoveredCategory, setHoveredCategory] = useState(null);
	const [initialImage, setInitialImage] = useState(null);

	useEffect(() => {
		// Find the category with the name "Figma" and set it as the initial image
		const figmaCategory = categories.find((category) => category.name === "Figma");
		if (figmaCategory) {
			setInitialImage(figmaCategory.img);
		}
	}, [categories]);

	const handleMouseEnter = (categoryId) => {
		setHoveredCategory(categoryId);
	};

	const handleMouseLeave = () => {
		setHoveredCategory(null);
	};

	return (
		<div className="w-full shadow-lg h-fit ">
			<div
				id="top-navbar"
				className={`bg-white overflow-hidden fixed w-full lg:w-full top-0 z-[30] h-[45px] transition-transform${
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
									<LogIn size={20} /> Login
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
						<div className=" flex justify-center items-center gap-x-1.5 text-ash">
							{/* <Cart /> */}
							<ShoppingCart size={22} />
							<span className="flex items-center justify-center text-sm font-normal">
								${totalPrice.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* second/bottom navbar */}
			<Disclosure
				as="nav"
				className={`border-b bg-gradient-to-r from-[#e7230d] to-[#f4ae18] duration-100 fixed z-50 w-full lg:w-full border-black border-opacity-30 shadow-lg ${
					isScrolled ? "top-0 left-0" : "top-[45px]"
				}`}
			>
				{({ open }) => (
					<>
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-4">
							<div className="flex items-center justify-between h-16">
								<div className="flex items-center gap-x-1.5 justify-start">
									<Link
										to="/"
										className={`flex-shrink-0 text-white select-none flex font-sans flex-col leading-3 items-end ${
											isScrolled ? "block duration-300 mr-2" : "hidden"
										}`}
									>
										<h2 className="text-2xl font-extrabold">ANIME</h2>
										<h3 className="text-lg font-extrabold leading-[8px]">FIG</h3>
									</Link>
									<span
										className={`mx-2.5 w-px h-[30px] py-px bg-dhusor lg:block hidden ${
											isScrolled ? "bg-opacity-100" : "bg-opacity-0 -mr-2"
										}`}
									/>
									<div className="hidden md:block">
										<div className="flex items-center justify-center gap-x-2.5">
											{/* TODO: dropdown will go here */}
											<div className="relative w-full">
												<button
													className="flex items-center justify-center p-0 text-white duration-300 gap-x-[2px] focus:outline-none"
													onMouseEnter={() => setIsOpen(true)}
													onMouseLeave={() => setIsOpen(false)}
												>
													Figures
													<ChevronDownIcon
														className={`w-5 h-5 duration-300 ${
															isOpen ? "mt-1" : ""
														}`}
													/>
												</button>
												<div
													className={`absolute w-full left-0 origin-top-left transition-all duration-300 ease-in-out ${
														isOpen
															? "opacity-100 transform translate-y-0"
															: "opacity-0 transform -translate-y-2 pointer-events-none"
													}`}
													onMouseEnter={() => setIsOpen(true)}
													onMouseLeave={() => setIsOpen(false)}
												>
													<div className="grid justify-between items-start grid-cols-5 mt-4 bg-white border px-6 h-[16rem] border-gray-200 rounded-md shadow-lg w-[30rem]">
														{/* category list component */}
														<div className="col-span-2">
															{categories.map((category) => (
																<div
																	key={category._id}
																	onMouseEnter={() =>
																		handleMouseEnter(category._id)
																	}
																	onMouseLeave={handleMouseLeave}
																	className="flex flex-col h-full text-sm"
																>
																	<Link
																		to={`/categories/${category.name}`}
																		className="block px-4 py-2 duration-300 text-ash hover:text-laal"
																		onClick={() => setIsOpen(false)}
																	>
																		{category.name}
																	</Link>
																</div>
															))}
														</div>
														{/* image component */}
														<div className="flex items-center justify-start w-full col-span-3 border border-laal h-fit">
															{hoveredCategory
																? categories.map(
																		(category) =>
																			category._id ===
																				hoveredCategory && (
																				<img
																					key={category._id}
																					src={category.img}
																					alt={category.name}
																					className="object-cover w-64 h-56"
																				/>
																			)
																  )
																: initialImage && (
																		<img
																			src={initialImage}
																			alt="Figma"
																			className="object-cover w-64 h-56"
																		/>
																  )}
														</div>
													</div>
												</div>
											</div>
											{/* series */}
											<div className="relative w-full">
												<button
													className="flex items-center justify-center p-0 text-white duration-300 gap-x-[2px] focus:outline-none"
													onMouseEnter={() => setIsOpenSeries(true)}
													onMouseLeave={() => setIsOpenSeries(false)}
												>
													Series
													<ChevronDownIcon
														className={`w-5 h-5 duration-300 ${
															isOpenSeries ? "mt-1" : ""
														}`}
													/>
												</button>
												<div
													className={`absolute w-full left-0 origin-top-left transition-all duration-300 ease-in-out ${
														isOpenSeries
															? "opacity-100 transform translate-y-0"
															: "opacity-0 transform -translate-y-2 pointer-events-none"
													}`}
													onMouseEnter={() => setIsOpenSeries(true)}
													onMouseLeave={() => setIsOpenSeries(false)}
												>
													<div className="mt-4 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg w-96 h-fit ">
														<a
															href="#"
															className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
														>
															Option 1
														</a>
														<a
															href="#"
															className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
														>
															Option 2
														</a>
														<a
															href="#"
															className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
														>
															Option 3
														</a>
													</div>
												</div>
											</div>
											{/* trending */}
											<div className="relative w-full">
												<div className="text-white duration-300 cursor-pointer hover:underline">
													<p>Trending</p>
												</div>
											</div>
											{/* contacts */}
											<div className="relative w-full">
												<div className="text-white duration-300 cursor-pointer hover:underline">
													<p>Contacts</p>
												</div>
											</div>
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
														className="w-full pl-3 font-[200] font-sans bg-transparent border-b border-white placeholder:text-white focus:outline-none text-base"
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
											<div className="relative w-fit">
												{/* Profile dropdown large device */}
												{user ? (
													<img
														className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-white"
														src={user?.photoURL}
														alt=""
														onMouseEnter={() => setIsOpenMenu(true)}
														onMouseLeave={() => setIsOpenMenu(false)}
													/>
												) : (
													<p
														onMouseEnter={() => setIsOpenMenu(true)}
														onMouseLeave={() => setIsOpenMenu(false)}
													>
														<UserCircleIcon className="text-white rounded-full cursor-pointer w-7 h-7" />
													</p>
												)}
												<div
													className={`absolute w-fit min-w-56 -right-1.5 origin-top-right transition-all duration-300 ease-in-out ${
														isOpenMenu
															? "opacity-100 transform translate-y-0"
															: "opacity-0 transform -translate-y-2 pointer-events-none"
													}`}
													onMouseEnter={() => setIsOpenMenu(true)}
													onMouseLeave={() => setIsOpenMenu(false)}
												>
													<div className="w-full mt-3 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg h-fit">
														{user && (
															<div className="overflow-hidden ">
																<p className="block px-4 py-2 text-sm text-gray-700">
																	{user?.displayName}
																</p>
																<p className="block px-4 pb-2 text-sm text-gray-700">
																	{user?.email}
																</p>
															</div>
														)}
														{user && (
															<Link className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal">
																<User size={20} />
																Profile
															</Link>
														)}
														{!user && (
															<Link
																className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal"
																to="/auth/login"
															>
																<LogIn size={20} />
																Login
															</Link>
														)}
														<Link className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal">
															<ShoppingCart size={20} />
															View Cart
														</Link>
														<Link className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal">
															<ArrowRightFromLine size={20} />
															Checkout
														</Link>
														<Link className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal">
															<Settings size={20} /> Settings
														</Link>
														{user && (
															<p
																onClick={handleLogOut}
																className="flex items-center justify-start px-4 py-2 text-sm duration-300 cursor-pointer gap-x-4 text-ash hover:text-laal"
															>
																<LogOut size={20} />
																Logout
															</p>
														)}
													</div>
												</div>
											</div>
										)}
										{isScrolled && (
											// <button
											// 	type="button"
											// 	className="relative bg-transparent "
											// >
											// 	<span className="absolute -inset-1.5" />
											// 	<span className="sr-only">View cart items</span>
											// 	<Cart aria-hidden="true" />
											// </button>
											<Cart
												isOpen={isOpenCart}
												onCloseCart={toggleDrawer}
											/>
										)}
									</div>
								</div>
								<div className="flex -mr-2 md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-white rounded-md bg-ash/10 focus:outline-none">
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
						<Disclosure.Panel className="md:hidden bg-ash">
							<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								<Disclosure.Button
									as="p"
									className="block px-3 py-2 text-base font-medium rounded-md text-dhusor hover:bg-gray-700 hover:text-white"
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
									{/* <button
										type="button"
										className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View cart items</span>
										<Cart aria-hidden="true" />
									</button> */}
									<div className="relative flex justify-end w-full">
										<Cart
											isOpen={isOpenCart}
											onCloseCart={toggleDrawer}
										/>
									</div>
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

// import { getAuth, deleteUser } from "firebase/auth";
// const auth = getAuth();
// const user = auth.currentUser;
// deleteUser(user)
// 	.then(() => {
// 		// User deleted.
// 	})
// 	.catch((error) => {
// 		// An error ocurred
// 		// ...
// 	});
