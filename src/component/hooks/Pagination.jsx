// import { ChevronLeft, ChevronRight } from "lucide-react";

// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
// 	const MAX_VISIBLE_PAGES = 4; // Adjust this value as needed
// 	const MIN_VISIBLE_PAGES_AT_START_END = 3; // Minimum pages to show at beginning and end

// 	// Calculate page number ranges for rendering
// 	const halfVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);

// 	let startPage;
// 	let endPage;

// 	if (totalPages <= MAX_VISIBLE_PAGES) {
// 		// Render all pages if total pages are less than or equal to max visible pages
// 		startPage = 1;
// 		endPage = totalPages;
// 	} else if (currentPage <= halfVisiblePages + MIN_VISIBLE_PAGES_AT_START_END) {
// 		// Show first few pages and ellipsis at the end
// 		startPage = 1;
// 		endPage = Math.min(currentPage + halfVisiblePages, totalPages);
// 	} else if (currentPage >= totalPages - halfVisiblePages - MIN_VISIBLE_PAGES_AT_START_END) {
// 		// Show ellipsis at the beginning and last few pages
// 		startPage = Math.max(currentPage - halfVisiblePages, MIN_VISIBLE_PAGES_AT_START_END + 1);
// 		endPage = totalPages;
// 	} else {
// 		// Show ellipsis in the middle, first page, and last page
// 		startPage = Math.max(currentPage - halfVisiblePages, MIN_VISIBLE_PAGES_AT_START_END + 1);
// 		endPage = Math.min(currentPage + halfVisiblePages, totalPages - MIN_VISIBLE_PAGES_AT_START_END);
// 	}

// 	return (
// 		<>
// 			<div className="flex items-center justify-center w-full mt-4 overflow-hidden">
// 				<div className="flex items-center justify-center p-2 w-fit gap-x-3">
// 					<button
// 						onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
// 						disabled={currentPage === 1}
// 						className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
//               ${currentPage === 1 ? "bg-[#e9e9e9]" : "bg-holud"}
//               `}
// 					>
// 						<ChevronLeft />
// 					</button>
// 					{/* Render page numbers dynamically with ellipses */}
// 					{startPage > 3 && ( // Show ellipsis if start page is not 1, 2, or 3
// 						<button
// 							key="ellipsis-before"
// 							className="px-2.5 focus:outline-none mx-1.5 rounded-md text-ash hover:bg-white/50"
// 							onClick={() => handlePageChange(2)} // Click on ellipsis to go to page 2
// 						>
// 							...
// 						</button>
// 					)}
// 					{Array.from({ length: endPage - startPage + 1 }, (_, i) => (
// 						<button
// 							key={startPage + i}
// 							onClick={() => handlePageChange(startPage + i)}
// 							className={`px-2.5 focus:outline-none mx-1.5 rounded-md duration-300 ${
// 								currentPage === startPage + i
// 									? "bg-holud shadow-md shadow-ash/30 text-ash"
// 									: "hover:bg-white/50"
// 							}`}
// 						>
// 							{startPage + i}
// 						</button>
// 					))}
// 					{endPage < totalPages && ( // Show ellipsis if end page is not total
// 						<button
// 							key="ellipsis-after"
// 							className="px-2.5 focus:outline-none mx-1.5 rounded-md text-ash hover:bg-white/50"
// 							onClick={() => handlePageChange(totalPages - 1)} // Click on ellipsis to go to second-last page
// 						>
// 							...
// 						</button>
// 					)}
// 					<button
// 						className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
//               ${currentPage === totalPages ? "bg-[#e9e9e9]" : "bg-holud"}
//               `}
// 						disabled={currentPage === totalPages}
// 						onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
// 					>
// 						<ChevronRight />
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Pagination;

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
			className={`px-2.5 focus:outline-none mx-1.5 rounded-md duration-300 ${
				currentPage === pageNum ? "bg-holud shadow-md shadow-ash/30 text-ash" : "hover:bg-white/50"
			}`}
		>
			{pageNum}
		</button>
	);

	const renderEllipsis = (key, pageToGo) => (
		<button
			key={key}
			className="px-2.5 focus:outline-none mx-1.5 rounded-md text-ash hover:bg-white/50"
			onClick={() => handlePageChange(pageToGo)}
		>
			...
		</button>
	);

	return (
		<div className="flex items-center justify-center w-full mt-4 overflow-hidden">
			<div className="flex items-center justify-center p-2 w-fit gap-x-3">
				<button
					onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}
					className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
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
					className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
            ${currentPage === totalPages ? "bg-[#e9e9e9]" : "bg-holud"}`}
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
