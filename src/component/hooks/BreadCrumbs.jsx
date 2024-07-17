import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	let breadcrumbPath = "";

	return (
		<div className="p-0 m-0 text-sm text-ash">
			<Link
				to="/"
				className="hover:underline"
			>
				Home
			</Link>
			{pathnames.map((link, index) => {
				breadcrumbPath += `/${decodeURIComponent(link)}`;
				const isLast = index === pathnames.length - 1;

				return (
					<span key={breadcrumbPath}>
						<ChevronRight
							className="inline-block mx-1"
							size={14}
						/>
						{isLast ? (
							<span>{decodeURIComponent(link)}</span>
						) : (
							<Link
								className="hover:underline"
								to={breadcrumbPath}
							>
								{decodeURIComponent(link)}
							</Link>
						)}
					</span>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
