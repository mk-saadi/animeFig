import React, { useState, useEffect } from "react";

const Navbar1 = () => {
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
		<nav>
			<div
				id="top-navbar"
				className={`bg-gray-500 p-2 fixed w-full top-0 z-10 transition-transform duration-300 ${
					isScrolled ? "-translate-y-full" : "translate-y-0"
				}`}
			>
				<ul className="flex justify-between">
					<li>logo</li>
					<li>products</li>
					<li>collection</li>
					<li>new</li>
					<li>cart</li>
				</ul>
			</div>

			<div
				className={`bg-gray-800 text-white p-2 z-50 fixed w-full transition-all duration-300 ${
					isScrolled ? "top-0" : "top-[40px]"
				}`}
			>
				<ul className="flex justify-between">
					<li>search</li>
					<li>login</li>
					<li>register</li>

					{/* only show cart when the first div is hidden */}
					{isScrolled && <li>cart</li>}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar1;
