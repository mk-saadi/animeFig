import "./footer.css";
import image from "../../assets/img.png";
import gur from "../../assets/gur.png";
import { Facebook, Instagram, Linkedin, Bird } from "lucide-react";

const Footer = () => {
	return (
		<div className="relative inner-shadow">
			<div className="footing">
				<div className="text-center bg-gray-600 bg-opacity-50 py-14">
					<img
						src={gur}
						alt=""
						className="w-24 h-24 mx-auto pointer-events-none select-none grayscale"
					/>
					<h4 className="mb-6 text-2xl font-bold text-gray-300">Authenticity Guaranteed</h4>
					<p className="text-xs text-gray-400 sm:text-sm">
						Shipping Japan's finest OTAKU goods to the world! <br /> That is the AnimeFig's Shop
						mission!
					</p>
					<p className="text-xs text-gray-400 sm:text-sm">
						To live up to it, AnimeFig's experienced buyers carefully select high-quality,
						<br />
						beautifully designed products that are always authentic.
					</p>
				</div>
				<footer className="p-10 text-gray-400 bg-gray-800 footer bg-opacity-70">
					<div>
						<img
							src={image}
							alt=""
							className="w-24 h-24 drop-shadow-md"
						/>
						<p>
							AnimeFig Private Inc.
							<br />
							Shipping Exquisite Merch SInce 2009.
						</p>
					</div>
					<div className="order-3">
						<span className="footer-title">Social</span>
						<a
							className="flex items-center justify-center gap-1 link link-hover"
							href="#"
						>
							<Facebook />
							Facebook
						</a>
						<a
							className="flex items-center justify-center gap-1 link link-hover"
							href="#"
						>
							<Instagram /> Instagram
						</a>
						<a
							className="flex items-center justify-center gap-1 link link-hover"
							href="#"
						>
							<Bird />
							Twitter
						</a>
						<a
							className="flex items-center justify-center gap-1 link link-hover"
							href="#"
						>
							<Linkedin />
							LinkedIn
						</a>
					</div>
					<div className="order-2">
						<span className="footer-title">Company</span>
						<a className="link link-hover">About us</a>
						<a className="link link-hover">Contact</a>
						<a className="link link-hover">Jobs</a>
						<a className="link link-hover">Press kit</a>
					</div>
					<div className="order-1">
						<span className="footer-title">Legal</span>
						<a className="link link-hover">Terms of use</a>
						<a className="link link-hover">Privacy policy</a>
						<a className="link link-hover">Cookie policy</a>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default Footer;
