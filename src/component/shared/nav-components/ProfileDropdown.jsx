import {
	ArrowRightFromLine,
	LogIn,
	LogOut,
	Settings,
	ShoppingCart,
	User,
	UserCircleIcon,
	History,
} from "lucide-react";
import { useState } from "react";
import Cart from "../Cart";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ user, handleLogOut, isScrolled, toggleDrawer, isOpenCart }) => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<>
			{isScrolled && (
				<div className="relative w-fit">
					{/* Profile dropdown large device */}
					{user ? (
						<img
							className="w-8 h-8 rounded-full cursor-pointer"
							src={user?.photoURL}
							alt={user?.displayName}
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
						<div className="w-full mt-3 bg-white border divide-y rounded-md shadow-lg border-dhusor divide-gray-200/70 h-fit">
							{user && (
								<div className="overflow-hidden ">
									<p className="block px-4 py-2 text-sm text-gray-700">
										{user?.displayName}
									</p>
									<p className="block px-4 pb-2 text-sm text-gray-700">{user?.email}</p>
								</div>
							)}
							{user && (
								<Link
									className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal"
									to="/profile"
								>
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
							<Link
								className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal"
								to="/checkout"
							>
								<ShoppingCart size={20} />
								View Cart
							</Link>
							<Link
								className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal"
								to="/profile/browsing_history"
							>
								<History size={20} />
								Browsing History
							</Link>
							<Link
								className="flex items-center justify-start px-4 py-2 text-sm duration-300 gap-x-4 text-ash hover:text-laal"
								to="/profile/orders_progress"
							>
								<Settings size={20} /> Track Order
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
				<Cart
					isOpen={isOpenCart}
					onCloseCart={toggleDrawer}
				/>
			)}
		</>
	);
};

export default ProfileDropdown;
