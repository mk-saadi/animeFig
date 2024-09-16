import { useState, useEffect } from "react";

const useScroll = (elementId) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		/**
		 * Handles the scroll event and updates the scrolled state based on the element's position.
		 *
		 * @return {void}
		 */
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
