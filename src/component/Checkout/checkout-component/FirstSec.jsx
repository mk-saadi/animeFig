import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const FirstSec = ({ cartItems, decreaseQuantity, increaseQuantity, removeFromCart }) => {
	const handleRemove = (productId) => {
		removeFromCart(productId);
	};

	return (
		<>
			{cartItems.length === 0 && (
				<div className="flex flex-col col-span-3">
					<h2 className="text-lg font-medium text-ash">Cart is empty.</h2>
				</div>
			)}
			<div className="flex flex-col order-2 col-span-3 lg:order-1">
				{cartItems.length > 0 && (
					<div className="flex flex-1 px-4 my-4 bg-white">
						<div className="flex flex-col divide-y-[1px] divide-dhusor/70">
							{cartItems.map((item) => (
								<div
									key={item.figId}
									className="flex items-center py-2.5 justify-between gap-x-4"
								>
									<div className="flex h-full items-start gap-x-1.5 justify-start">
										<Link
											to={`/collections/${item.figLink}`}
											className="flex-shrink-0 h-32 overflow-hidden rounded-md w-28"
										>
											<img
												src={item.figImg}
												className="object-cover object-center w-full h-full"
											/>
										</Link>
										<div className="flex flex-col h-full py-1.5">
											<div className="flex flex-col flex-1 gap-y-1">
												<p className="px-2 py-[2px] text-xs text-white rounded-sm w-fit bg-blue-500">
													{item?.figLabel}
												</p>
												<Link
													to={`/collections/${item.figLink}`}
													className="text-sm lg:text-base lg:line-clamp-3 line-clamp-2 hover:underline text-kala"
												>
													{item.figName}
												</Link>
											</div>
											{/* quantity and delete section */}
											<div className="flex items-center gap-x-2.5 justify-start">
												<div className="flex items-center border rounded-md w-fit gap-x-2">
													<div className="flex py-1.5 items-center divide-x-[1px] text-ash">
														<button
															onClick={() =>
																decreaseQuantity(item.figId, item.figPrice)
															}
															className="px-3 duration-300 rounded-md focus:outline-0 hover:text-laal text-ash"
														>
															-
														</button>
														<p className="px-1 lg:px-4">{item.quantity}</p>
														<button
															className="px-3 duration-300 rounded-md focus:outline-0 hover:text-laal text-ash"
															onClick={() =>
																increaseQuantity(item.figId, item.figPrice)
															}
														>
															+
														</button>
													</div>
												</div>
												<div>
													<button
														className="p-3 duration-300 rounded-md hover:text-laal text-ash"
														onClick={() => handleRemove(item.figId)}
														title="Remove from cart"
													>
														<Trash2 size={20} />
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="mr-10">
										<p className="text-base text-kala">
											<span className="text-lg">$</span>
											{item.figPrice}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FirstSec;
