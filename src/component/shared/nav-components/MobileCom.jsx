import { Disclosure } from "@headlessui/react";
import Cart from "../Cart";
import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "lucide-react";

const MobileCom = ({ user, isOpenCart, toggleDrawer, handleLogOut }) => {
	return (
		<Disclosure.Panel className="bg-white md:hidden">
			<div className="flex flex-col px-2 pt-2 pb-3 space-y-1 text-sm mobile-nav text-kala">
				<NavLink
					to="/"
					as="a"
					className="block w-full px-2 py-1 font-medium "
				>
					Home
				</NavLink>
				<NavLink
					to="/collections"
					as="a"
					className="block w-full px-2 py-1 font-medium "
				>
					Collections
				</NavLink>
				<NavLink
					to="/checkout"
					as="a"
					className="block w-full px-2 py-1 font-medium "
				>
					View Cart
				</NavLink>
				<NavLink
					to="/browsing_history"
					as="a"
					className="block w-full px-2 py-1 font-medium "
				>
					Browsing History
				</NavLink>
			</div>
			<div className="pt-4 pb-3 border-t border-gray-700">
				<div className="flex items-center px-5">
					<div className="flex-shrink-0">
						{/* <img
							className="object-cover w-10 h-10 rounded-full"
							src={user?.photoURL}
							alt=""
							loading="lazy"
						/> */}
						{user ? (
							<img
								className="object-cover w-8 h-8 rounded-full cursor-pointer"
								src={user?.photoURL}
								alt={user?.displayName}
							/>
						) : (
							<p>
								<UserCircleIcon className="rounded-full cursor-pointer text-ash w-7 h-7" />
							</p>
						)}
					</div>
					<div className="ml-3">
						<div className="text-base font-medium leading-none text-kala">
							{user?.displayName}
						</div>
						<div className="text-sm font-medium leading-none text-ash">{user?.email}</div>
					</div>
					{/* cart drawer */}
					<div className="relative flex justify-end w-full">
						<Cart
							isOpen={isOpenCart}
							onCloseCart={toggleDrawer}
						/>
					</div>
				</div>
				<div className="flex flex-col px-2 pt-2 pb-3 space-y-1 text-sm mobile-nav text-kala">
					{user ? (
						<NavLink
							to="/profile"
							className="block w-full px-2 py-1 font-medium "
						>
							Profile
						</NavLink>
					) : (
						<NavLink
							to="/auth/login"
							className="block w-full px-2 py-1 font-medium "
						>
							Login
						</NavLink>
					)}
					<NavLink
						to="/orders_progress"
						className="block w-full px-2 py-1 font-medium "
					>
						Track Order
					</NavLink>
					<button
						onClick={handleLogOut}
						className="block px-2 py-1 font-medium w-fit text-ash"
					>
						Logout
					</button>
				</div>
			</div>
		</Disclosure.Panel>
	);
};

export default MobileCom;
