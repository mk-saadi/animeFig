import { useState, useEffect } from "react";

const useScroll = (elementId) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const element = document.getElementById(elementId);
			if (element) {
				const topNavbarHeight = element.offsetHeight;
				if (window.scrollY > topNavbarHeight) {
					setIsScrolled(true);
				} else {
					setIsScrolled(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [elementId]);

	return isScrolled;
};

export default useScroll;
