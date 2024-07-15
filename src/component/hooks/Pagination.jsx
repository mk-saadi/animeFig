import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
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
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i + 1}
								onClick={() => handlePageChange(i + 1)}
								className={`px-2.5 focus:outline-none mx-1.5 rounded-md duration-300 ${
									currentPage === i + 1
										? "bg-holud shadow-md shadow-ash/30 text-ash"
										: "hover:bg-white/50"
								}`}
							>
								{i + 1}
							</button>
						))}
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
