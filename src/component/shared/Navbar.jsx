import { Link } from "react-router-dom";
import img from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../provider/CartProvider";

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

	const navMenu = (
		<>
			<Link to="/">
				<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent">
					Home
				</button>{" "}
			</Link>
			<Link to="/allToys">
				<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent">
					All Figures
				</button>
			</Link>
			{user && (
				<>
					<Link to="/myToys">
						<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent text-accent">
							My Figures
						</button>
					</Link>
					<Link to="/addAToys">
						<button className="bg-transparent border-0 btn btn-sm hover:bg-transparent focus:bg-transparent text-accent">
							Add New Figures
						</button>
					</Link>
				</>
			)}
		</>
	);
	return (
		<div className="bg-base-100">
			<div className="py-3 navbar">
				<div className="pl-2 navbar-start sm:pl-6">
					<div className="dropdown">
						<label
							tabIndex={0}
							className="cursor-pointer lg:hidden"
						>
							<GiHamburgerMenu className="w-8 h-8 mr-4" />
						</label>
						<ul
							tabIndex={0}
							className="p-2 mt-3 rounded-sm shadow menu menu-compact dropdown-content bg-base-100 w-52"
						>
							{navMenu}
						</ul>
					</div>
					<Link
						to="/"
						className="flex flex-col items-center justify-center"
					>
						<img
							className="w-12 h-12"
							src={img}
							alt=""
						/>
					</Link>
				</div>
				<div className="hidden navbar-center lg:flex">
					<ul className="px-1 menu menu-horizontal">{navMenu}</ul>
				</div>
				<div className="pr-2 navbar-end sm:pr-6">
					{user ? (
						<div className="z-50 rounded-sm dropdown dropdown-end drop-shadow-md">
							<label
								tabIndex={0}
								className="mr-4 cursor-pointer"
							>
								<img
									className="object-cover w-12 h-12 mask mask-circle"
									src={user.photoURL}
									alt="profile image"
									onMouseEnter={() => setShowUserName(true)}
									onMouseLeave={() => setShowUserName(false)}
									title={showUserName ? user.displayName : ""}
								/>
							</label>
							<ul
								tabIndex={0}
								className="z-50 flex flex-col w-48 gap-2 p-2 mt-4 rounded-sm shadow menu dropdown-content bg-base-100"
							>
								<p className="text-sm">{user.displayName}</p>
								<hr className="mb-3" />
								<Link to="#">
									<button className="w-full text-xs text-white rounded-sm btn b btn-sm sm:text-sm">
										Profile
									</button>
								</Link>
								<Link to="/addDB2">
									<button className="w-full text-xs text-white rounded-sm btn b btn-sm sm:text-sm">
										Add To 2nd DB
									</button>
								</Link>
								<Link>
									<button
										className="w-full text-white rounded-sm btn btn-error"
										onClick={handleLogOut}
									>
										Log Out
									</button>
								</Link>
							</ul>
						</div>
					) : (
						<Link to="/login">
							<button className="text-white rounded-sm btn btn-info">Login</button>
						</Link>
					)}
				</div>
			</div>
			<div className="grid justify-center grid-cols-2 text-sm text-white bg-blue-300 shadow-md sm:flex">
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					New Figures
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Scale Figures
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Nendoroid & Mini Figures
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Free Standard Shipping
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Fate Series
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Gundam Series
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Saekano Series
				</p>
				<p className="px-4 py-2 duration-100 cursor-pointer sm:py-3 hover:bg-slate-600">
					Bonus Points
				</p>
			</div>
		</div>
	);
};

export default Navbar;
