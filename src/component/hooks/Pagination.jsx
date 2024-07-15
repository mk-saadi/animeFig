import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
	const getPaginationButtons = () => {
		let buttons = [];

		if (totalPages <= 6) {
			// If the total pages are 7 or less, display all pages
			buttons = Array.from({ length: totalPages }, (_, i) => i + 1);
		} else {
			if (currentPage <= 4) {
				// Display the first 4 pages and the last 2 pages
				buttons = [1, 2, 3, 4, 5, "...", totalPages];
			} else if (currentPage > totalPages - 4) {
				// Display the first 2 pages and the last 4 pages
				buttons = [
					1,
					"...",
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				];
			} else {
				// Display the first page, the current page and the surrounding pages, and the last page
				buttons = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
			}
		}

		return buttons;
	};

	return (
		<>
			<div className="flex items-center justify-center w-full mt-4 overflow-hidden">
				<div className="flex items-center justify-center p-2 w-fit gap-x-3">
					<button
						onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
						disabled={currentPage === 1}
						className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
									${currentPage === 1 ? "bg-[#e9e9e9]" : "bg-holud"}
									`}
					>
						<ChevronLeft />
					</button>
					<div className="bg-[#e9e9e9] p-1 rounded-md focus:outline-0 shadow-inner flex justify-center items-center text-ash">
						{getPaginationButtons().map((page, index) =>
							page === "..." ? (
								<span
									key={index}
									className="px-2.5 mx-1.5"
								>
									...
								</span>
							) : (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`px-2.5 focus:outline-none mx-1.5 rounded-md duration-300 ${
										currentPage === page
											? "bg-holud shadow-md shadow-ash/30 text-ash"
											: "hover:bg-white/50"
									}`}
								>
									{page}
								</button>
							)
						)}
					</div>
					<button
						className={`p-1 focus:outline-none rounded-full shadow-md shadow-ash/25 text-ash
									${currentPage === totalPages ? "bg-[#e9e9e9]" : "bg-holud"}
									`}
						disabled={currentPage === totalPages}
						onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
					>
						<ChevronRight />
					</button>
				</div>
			</div>
		</>
	);
};

export default Pagination;
