import { Trash2 } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { Link } from "react-router-dom";

const CheckOut = () => {
	const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	const handleRemove = (productId) => {
		removeFromCart(productId);
	};

	return (
		<div className="flex flex-row">
			<div>
				{cartItems.length === 0 && <h2 className="text-lg font-medium text-ash">Cart is empty.</h2>}
			</div>
			<div>
				{cartItems.length > 0 && (
					<div className="flex flex-1 px-4 my-4 bg-white">
						<div className="flex flex-col gap-y-2.5">
							{cartItems.map((item) => (
								<div
									key={item.figId}
									className="flex items-center justify-between gap-x-4"
								>
									<div className="flex h-full items-start gap-x-1.5 justify-start">
										<Link
											to={`/collections/${item.figLink}`}
											className="flex-shrink-0 w-24 overflow-hidden rounded-md h-28"
										>
											<img
												src={item.figImg}
												className="object-cover object-center w-full h-full"
											/>
										</Link>
										<div className="flex flex-col h-full py-1.5">
											<div className="flex flex-col flex-1 gap-y-1">
												<Link
													to={`/collections/${item.figLink}`}
													className="text-base hover:underline line-clamp-1 text-ash"
												>
													{item.figName}
												</Link>
												<p className="text-sm text-ash/80">${item.figPrice}</p>
											</div>
											<div className="flex items-center gap-x-2">
												<div className="flex items-center gap-x-2">
													<button
														onClick={() =>
															decreaseQuantity(item.figId, item.figPrice)
														}
													>
														-
													</button>
													<p>{item.quantity}</p>
													<button
														onClick={() =>
															increaseQuantity(item.figId, item.figPrice)
														}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="">
										<button
											className="p-2 duration-300 rounded-md hover:text-laal text-ash bg-ash/5 hover:bg-ash/10"
											onClick={() => handleRemove(item.figId)}
											title="Remove from cart"
										>
											<Trash2 size={24} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<div>{totalFigPrice.toFixed(2)}</div>
		</div>
	);
};

export default CheckOut;
