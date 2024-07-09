import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	let breadcrumbPath = "";

	return (
		<div className="breadcrumbs">
			<Link to="/">Home</Link>
			{pathnames.map((name, index) => {
				breadcrumbPath += `/${decodeURIComponent(name)}`; // Decode encoded spaces
				const isLast = index === pathnames.length - 1;

				return isLast ? (
					<span key={breadcrumbPath}> / {decodeURIComponent(name)}</span>
				) : (
					<span key={breadcrumbPath}>
						{" "}
						/ <Link to={breadcrumbPath}>{decodeURIComponent(name)}</Link>
					</span>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
