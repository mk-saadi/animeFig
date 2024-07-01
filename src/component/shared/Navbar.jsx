import { Link } from "react-router-dom";
import img from "../../assets/img.png";
import { useContext, useState, Fragment, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../provider/CartProvider";
import Cart from "./Cart";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { X, Menu as MenuIcon, UserCircle, Search, Plus, User2, PartyPopper, DollarSign } from "lucide-react";
import InputField from "../hooks/InputField";

const navigation = [
	{ name: "Home", to: "#", current: true },
	{ name: "Shop", to: "#", current: false },
	{ name: "News", to: "#", current: false },
	{ name: "Gallery", to: "#", current: false },
];
const userNavigation = [
	{ name: "Your Profile", to: "#" },
	{ name: "Settings", to: "#" },
	{ name: "Sign out", to: "#" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	console.log("user: ", user);
	const [showUserName, setShowUserName] = useState(false);
	const { cartItems, dispatch } = useCart();

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

	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const topNavbarHeight = document.getElementById("top-navbar").offsetHeight;
			if (window.scrollY > topNavbarHeight) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="w-full shadow-lg h-fit">
			<div
				id="top-navbar"
				className={`bg-white overflow-hidden fixed w-full top-0 z-[30] h-[45px] transition-transform${
					isScrolled ? "-translate-y-full" : "translate-y-0"
				}`}
			>
				<div className="flex items-center justify-between h-full mx-8">
					<Link
						to="/"
						className="flex items-center gap-x-1.5 justify-center"
					>
						<img
							src={img}
							alt="logo"
							className="w-9 h-9"
						/>
						<h1 className="text-base text-ash">animeFig</h1>
					</Link>
					<div className="flex items-center justify-center gap-x-1.5 h-full">
						<div className="text-sm font-medium text-ash">
							<p className="flex gap-x-1.5 items-center justify-center">
								<PartyPopper
									size={20}
									className="text-nill"
								/>
								Get free delivery on orders over $100
								<PartyPopper
									size={20}
									className="text-nill"
								/>
							</p>
						</div>
						<span className="mx-2.5 w-px h-[20px] py-px bg-gray-300" />
						<div className="flex items-center text-ash duration-300 justify-center gap-x-1.5 text-sm">
							<Link
								className="flex hover:text-nill items-center justify-center gap-x-1.5"
								to="/auth/login"
							>
								<User2 size={20} /> Login
							</Link>
							<span className="mx-2.5 w-px h-[20px] py-px bg-gray-300" />
							<Link
								className="flex hover:text-nill items-center justify-center gap-x-1.5"
								to="/auth/register"
							>
								<Plus size={20} /> Create Account
							</Link>
						</div>
						<span className="mx-2.5 w-px h-[20px] py-px bg-gray-300" />
						{/* cart item below */}
						<div className="-ml-1.5 flex justify-center items-center gap-x-1.5">
							<Cart />
							<span className="flex items-center justify-center text-sm text-ash ">
								<DollarSign size={20} />
								{totalPrice.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>
			<Disclosure
				as="nav"
				className={`border-b bg-gradient-to-r from-[#2772c2] to-blue-400 duration-100  fixed z-50 w-full border-blue-600/50 ${
					isScrolled ? "top-0" : "top-[45px]"
				}`}
				// className="bg-[#60acfb] border-b border-blue-600/50"
				// className="border-b bg-gradient-to-r from-[#2772c2] to-blue-400 border-blue-600/50"
			>
				{({ open }) => (
					<>
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-4">
							<div className="flex items-center justify-between h-16">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<img
											className="w-8 h-8"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/>
									</div>
									<div className="hidden md:block">
										<div className="flex items-baseline ml-10 space-x-4">
											{/* {navigation.map((item) => (
												<Link
													key={item.name}
													to={item.to}
													className={classNames(
														item.current
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"rounded-md px-3 py-2 text-sm font-medium"
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</Link>
											))} */}
											c
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="flex items-center ml-4 gap-x-3 md:ml-6">
										<button
											type="button"
											className="relative bg-transparent rounded-full hover:text-white focus:outline-none "
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">View cart items</span>
											<Cart aria-hidden="true" />
										</button>
										{/* Profile dropdown large device */}
										{user ? (
											<Menu
												as="div"
												className="relative"
											>
												<div>
													<Menu.Button className="relative flex items-center max-w-xs text-sm bg-transparent rounded-full focus:outline-none">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">Open user menu</span>
														<img
															className="w-8 h-8 rounded-full"
															src={user?.photoURL}
															alt=""
														/>
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<Link className="block px-4 py-2 text-sm text-gray-700">
																Profile
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link className="block px-4 py-2 text-sm text-gray-700">
																Settings
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																onClick={handleLogOut}
																className="block px-4 py-2 text-sm text-gray-700"
															>
																Logout
															</Link>
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>
										) : (
											<>
												<Link
													to="/auth/login"
													className="flex items-center justify-center gap-x-2"
												>
													<UserCircle /> Login
												</Link>
											</>
										)}
										{/* search bar */}
										<div className="hidden md:block w-[24rem] ml-1">
											<Link
												to="/auth/login"
												className="relative w-full"
											>
												<div className="mt-1">
													{/* <InputField
														type="text"
														id="email"
														name="email"
														placeholder="Search a product"
													/> */}
													<input
														type="search"
														name=""
														className="w-full pl-3 bg-transparent border-b border-gray-800"
														placeholder="Search a product"
														id=""
													/>
												</div>
												<button className="absolute right-0 flex items-center pr-3 transform -translate-y-1/2 cursor-pointer top-1/2">
													<Search />
												</button>
											</Link>
										</div>
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
									className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
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
