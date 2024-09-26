import {
	Menu as MenuIcon,
	Plus,
	Twitter,
	Facebook,
	Youtube,
	Linkedin,
	LogIn,
	ShoppingCart,
	Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../provider/CartProvider";

const TopNav = ({ user, isScrolled }) => {
	const { cartItems } = useCart();
	const totalPrice = cartItems.reduce((total, item) => total + item.figPrice, 0);

	return (
		<>
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
								Shipping Japan&apos;s finest OTAKU goods to the world!
								<Globe
									size={18}
									className="text-ash"
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
										className="object-cover w-8 h-8 rounded-full"
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
		</>
	);
};

export default TopNav;
