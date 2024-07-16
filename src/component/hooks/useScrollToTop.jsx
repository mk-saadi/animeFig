import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		const rootElement = document.getElementById("root");
		if (rootElement) {
			rootElement.scrollIntoView({ behavior: "smooth" });
		}
	}, [pathname]);
}
