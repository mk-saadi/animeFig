import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Disclosure } from "@headlessui/react";
import { X, Menu as MenuIcon } from "lucide-react";
import useScroll from "../hooks/Scroll";
import Popovers from "./nav-components/Popovers";
import ProfileDropdown from "./nav-components/ProfileDropdown";
import TopNav from "./nav-components/TopNav";
import SearchBox from "./nav-components/SearchBox";
import MobileCom from "./nav-components/MobileCom";

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
											isScrolled ? "block duration-300 mr-2" : "block lg:hidden"
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
						<>
							<MobileCom
								user={user}
								isOpenCart={isOpenCart}
								toggleDrawer={toggleDrawer}
								handleLogOut={handleLogOut}
							/>
						</>
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
