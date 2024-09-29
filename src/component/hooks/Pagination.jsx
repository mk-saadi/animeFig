import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
	const MAX_VISIBLE_PAGES = 4;
	const halfVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);

	let startPage, endPage;
	const showStartEllipsis = currentPage > 3;
	const showEndEllipsis = currentPage < totalPages - 2;

	if (currentPage <= halfVisiblePages + 1) {
		startPage = 1;
		endPage = Math.min(MAX_VISIBLE_PAGES, totalPages - 1);
	} else if (currentPage >= totalPages - halfVisiblePages) {
		startPage = Math.max(totalPages - MAX_VISIBLE_PAGES + 1, 2);
		endPage = totalPages - 1;
	} else {
		startPage = currentPage - halfVisiblePages + 1;
		endPage = currentPage + halfVisiblePages - 1;
	}

	const renderPageButton = (pageNum) => (
		<button
			key={pageNum}
			onClick={() => handlePageChange(pageNum)}
			className={`px-2 lg:px-2.5 focus:outline-none mx-1 lg:mx-1.5 rounded-md duration-300 ${
				currentPage === pageNum ? "bg-holud shadow-md shadow-ash/30 text-ash" : "hover:bg-white/50"
			}`}
		>
			{pageNum}
		</button>
	);

	const renderEllipsis = (key, pageToGo) => (
		<button
			key={key}
			className="px-1 lg:px-2.5 focus:outline-none mx-0 lg:mx-1.5 rounded-md text-ash hover:bg-white/50"
			onClick={() => handlePageChange(pageToGo)}
		>
			...
		</button>
	);

	return (
		<div className="flex items-center justify-center w-full mt-12 overflow-hidden">
			<div className="flex items-center justify-center lg:p-2 py-2 w-fit gap-x-[2px] lg:gap-x-3">
				<button
					onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}
					className={`p-px lg:p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
            ${currentPage === 1 ? "bg-[#e9e9e9]" : "bg-holud"}`}
				>
					<ChevronLeft />
				</button>

				{renderPageButton(1)}
				{showStartEllipsis && renderEllipsis("start-ellipsis", Math.max(currentPage - 2, 2))}

				{Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
					.filter((pageNum) => pageNum !== 1 && pageNum !== totalPages)
					.map(renderPageButton)}

				{showEndEllipsis && renderEllipsis("end-ellipsis", Math.min(currentPage + 2, totalPages - 1))}
				{totalPages > 1 && renderPageButton(totalPages)}

				<button
					className={`p-px lg:p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
            ${currentPage === totalPages ? "bg-[#e9e9e9]" : "bg-holud"}`}
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
				>
					<ChevronRight className="" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
