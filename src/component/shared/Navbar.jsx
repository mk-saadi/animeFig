import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import Cart from "./Cart";
import { Disclosure } from "@headlessui/react";
import { X, Menu as MenuIcon } from "lucide-react";
import useScroll from "../hooks/Scroll";
import Popovers from "./nav-components/Popovers";
import ProfileDropdown from "./nav-components/ProfileDropdown";
import TopNav from "./nav-components/TopNav";
import SearchBox from "./nav-components/SearchBox";

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	const isScrolled = useScroll("top-navbar");

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const [isOpenCart, setIsOpenCart] = useState(false);

	const toggleDrawer = () => setIsOpenCart(!isOpenCart);

	return (
		<div className="w-full shadow-lg h-fit ">
			<TopNav
				user={user}
				isScrolled={isScrolled}
			/>
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
									<>
										<Popovers />
									</>
									<Link to={"/addAToys"}>Add</Link>
								</div>
								<div className="hidden md:block">
									<div className="flex items-center gap-x-4">
										{/* search bar */}
										<SearchBox />
										{/* Profile dropdown large device */}
										<ProfileDropdown
											user={user}
											handleLogOut={handleLogOut}
											isScrolled={isScrolled}
											toggleDrawer={toggleDrawer}
											isOpenCart={isOpenCart}
										/>
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
