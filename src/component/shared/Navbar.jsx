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
// import { Bars3Icon, BellIcon, X } from "@heroicons/react/24/outline";
import { X, Menu as MenuIcon } from "lucide-react";

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
		// <div className="bg-base-100">
		// 	<div className="py-3 navbar">
		// 		<div className="pl-2 navbar-start sm:pl-6">
		// 			<div className="dropdown">
		// 				<label
		// 					tabIndex={0}
		// 					className="cursor-pointer lg:hidden"
		// 				>
		// 					<GiHamburgerMenu className="w-8 h-8 mr-4" />
		// 				</label>
		// 				<ul
		// 					tabIndex={0}
		// 					className="p-2 mt-3 rounded-sm shadow menu menu-compact dropdown-content bg-base-100 w-52"
		// 				>
		// 					{navMenu}
		// 				</ul>
		// 			</div>
		// 			<Link
		// 				to="/"
		// 				className="flex flex-col items-center justify-center"
		// 			>
		// 				<img
		// 					className="w-12 h-12"
		// 					src={img}
		// 					alt=""
		// 				/>
		// 			</Link>
		// 		</div>
		// 		<div className="hidden navbar-center lg:flex">
		// 			<ul className="px-1 menu menu-horizontal">{navMenu}</ul>
		// 		</div>
		// 		<div className="pr-2 navbar-end sm:pr-6">
		// 			{user ? (
		// 				<div className="z-50 rounded-sm dropdown dropdown-end drop-shadow-md">
		// 					<label
		// 						tabIndex={0}
		// 						className="mr-4 cursor-pointer"
		// 					>
		// 						<img
		// 							className="object-cover w-12 h-12 mask mask-circle"
		// 							src={user.photoURL}
		// 							alt="profile image"
		// 							onMouseEnter={() => setShowUserName(true)}
		// 							onMouseLeave={() => setShowUserName(false)}
		// 							title={showUserName ? user.displayName : ""}
		// 						/>
		// 					</label>
		// 					<ul
		// 						tabIndex={0}
		// 						className="z-50 flex flex-col w-48 gap-2 p-2 mt-4 rounded-sm shadow menu dropdown-content bg-base-100"
		// 					>
		// 						<p className="text-sm">{user.displayName}</p>
		// 						<hr className="mb-3" />
		// 						<Link to="#">
		// 							<button className="w-full text-xs text-white rounded-sm btn b btn-sm sm:text-sm">
		// 								Profile
		// 							</button>
		// 						</Link>
		// 						<Link to="/addDB2">
		// 							<button className="w-full text-xs text-white rounded-sm btn b btn-sm sm:text-sm">
		// 								Add To 2nd DB
		// 							</button>
		// 						</Link>
		// 						<Link>
		// 							<button
		// 								className="w-full text-white rounded-sm btn btn-error"
		// 								onClick={handleLogOut}
		// 							>
		// 								Log Out
		// 							</button>
		// 						</Link>
		// 					</ul>
		// 				</div>
		// 			) : (
		// 				<Link
		// 					to="/login"
		// 					className="relative flex items-center justify-center px-8 py-1 mt-6 overflow-hidden text-lg font-bold duration-300 bg-gray-900 border-2 border-yellow-500 rounded-md shadow-lg cursor-pointer form-control shadow-amber-800 group hover:shadow-amber-800 active:scale-95"
		// 				>
		// 					<span className="text-white duration-300 cursor-pointer group-hover:-translate-y-10 whitespace-nowrap">
		// 						Login
		// 					</span>
		// 					<span className="absolute py-2 text-gray-900 duration-300 translate-y-10 bg-white cursor-pointer px-44 group-hover:translate-y-0 whitespace-nowrap">
		// 						?
		// 					</span>
		// 				</Link>
		// 			)}
		// 		</div>
		// 	</div>
		// 	<div className="grid justify-center grid-cols-2 text-sm text-white bg-blue-300 shadow-md sm:flex">
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			New Figures
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Scale Figures
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Nendoroid & Mini Figures
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Free Standard Shipping
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Fate Series
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Gundam Series
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Saekano Series
		// 		</p>
		// 		<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
		// 			Bonus Points
		// 		</p>
		// 	</div>
		// </div>

		<div className="min-h-full">
			<Disclosure
				as="nav"
				className="bg-gray-800 border-b border-blue-400/50"
			>
				{({ open }) => (
					<>
						<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
											<Link
												className="px-3 py-2 text-sm font-medium rounded-md"
												to="/"
											>
												Home
											</Link>
											<Link className="px-3 py-2 text-sm font-medium rounded-md">
												Shop
											</Link>
											<Link className="px-3 py-2 text-sm font-medium rounded-md">
												New Items
											</Link>
											<Link className="px-3 py-2 text-sm font-medium rounded-md">
												Best Items
											</Link>
											<Link className="px-3 py-2 text-sm font-medium rounded-md">
												Gallery
											</Link>
											<Link className="px-3 py-2 text-sm font-medium rounded-md">
												Used Figures
											</Link>
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="flex items-center ml-4 md:ml-6">
										<button
											type="button"
											className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">View notifications</span>
											<Cart aria-hidden="true" />
										</button>

										{/* Profile dropdown */}
										<Menu
											as="div"
											className="relative ml-3"
										>
											<div>
												<Menu.Button className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
													{/* {userNavigation.map((item) => (
														<Menu.Item key={item.name}>
															{({ active }) => (
																<Link
																	to={item.to}
																	className={classNames(
																		active ? "bg-gray-100" : "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}
																>
																	{item.name}
																</Link>
															)}
														</Menu.Item>
													))} */}
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
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as="p"
										to={item.to}
										className={classNames(
											item.current
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"block rounded-md px-3 py-2 text-base font-medium"
										)}
										aria-current={item.current ? "page" : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
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
									{/* {userNavigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="p"
											to={item.to}
											className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
										>
											{item.name}
										</Disclosure.Button>
									))} */}
									<Disclosure.button
										as="p"
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Profile
									</Disclosure.button>
									<Disclosure.button
										as="p"
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Settings
									</Disclosure.button>
									<Disclosure.button
										as="button"
										onClick={handleLogOut}
										className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
									>
										Logout
									</Disclosure.button>
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
