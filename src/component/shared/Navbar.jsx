import { Link } from "react-router-dom";
import img from "../../assets/img.png";
import { useContext, useState, Fragment } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../provider/CartProvider";
import Cart from "./Cart";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { X, Menu as MenuIcon, UserCircle, Search } from "lucide-react";
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

	return (
		<div className="fixed top-0 z-40 w-full shadow-md h-fit">
			<Disclosure
				as="nav"
				className="bg-gray-200 border-b border-blue-400/50"
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
												<div className="-mt-1.5">
													<InputField
														type="email"
														id="email"
														name="email"
														placeholder="Search a product"
													/>
												</div>
												<button className="absolute flex items-center pr-3 transform -translate-y-1/2 cursor-pointer right-1 top-1/2">
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
