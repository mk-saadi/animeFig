import { Info, Trash2 } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { Link } from "react-router-dom";

const CheckOut = () => {
	const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
	const cartItemsWithoutComingSoon = cartItems.filter((item) => item.figLabel === "Coming Soon");

	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	const handleRemove = (productId) => {
		removeFromCart(productId);
	};

	return (
		<>
			<div>
				<div className="flex flex-col items-center justify-center">
					<div className="mb-[1rem]">
						<h2 className="text-2xl font-medium text-kala">Shopping Cart</h2>
					</div>
					<div className="flex flex-col items-center justify-center gap-y-3">
						{cartItemsWithoutComingSoon && (
							<div className="px-4 py-2 text-laal/70 text-center flex justify-start gap-x-1.5 items-center rounded-md bg-holud/15 w-full">
								<Info size={17} />
								<p className="text-sm">
									You have a pre-order item in your cart. Keep in mind that your order will
									be shipped together on release date. If thats not your intention, please
									make a second order.
								</p>
							</div>
						)}
						{cartItems.length >= 3 && (
							<div className="px-4 py-2 text-laal/70 text-center flex justify-start gap-x-1.5 items-center rounded-md bg-holud/15 w-full">
								<Info size={17} />
								<p className="text-sm">
									You have 3 or more items in your cart. Due to shipping size limitations
									your order might have to be split up over several parcels. Additional
									shipping fees can occur.
								</p>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-row mt-8">
					<div>
						{cartItems.length === 0 && (
							<h2 className="text-lg font-medium text-ash">Cart is empty.</h2>
						)}
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
														<p className="text-sm text-ash/80">
															${item.figPrice}
														</p>
													</div>
													<div className="flex items-center gap-x-2">
														<div className="flex items-center gap-x-2">
															<button
																onClick={() =>
																	decreaseQuantity(
																		item.figId,
																		item.figPrice
																	)
																}
															>
																-
															</button>
															<p>{item.quantity}</p>
															<button
																onClick={() =>
																	increaseQuantity(
																		item.figId,
																		item.figPrice
																	)
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
			</div>
		</>
	);
};

export default CheckOut;
