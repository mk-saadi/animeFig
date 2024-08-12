import { Info, Trash2 } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { Link } from "react-router-dom";

const CheckOut = () => {
	const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
	const cartItemsWithoutComingSoon = cartItems.filter((item) => item.figLabel === "Coming Soon");
	console.log("cartItemsWithoutComingSoon: ", cartItemsWithoutComingSoon);

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
						{cartItemsWithoutComingSoon.length > 0 && (
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
				<div className="grid justify-between grid-cols-4 mt-8">
					{cartItems.length === 0 && (
						<div className="flex flex-col col-span-3">
							<h2 className="text-lg font-medium text-ash">Cart is empty.</h2>
						</div>
					)}
					<div className="flex flex-col col-span-3">
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
															className="text-base hover:underline text-kala"
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
																		decreaseQuantity(
																			item.figId,
																			item.figPrice
																		)
																	}
																	className="px-3 duration-300 rounded-md focus:outline-0 hover:text-laal text-ash"
																>
																	-
																</button>
																<p className="px-4">{item.quantity}</p>
																<button
																	className="px-3 duration-300 rounded-md focus:outline-0 hover:text-laal text-ash"
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
											<div className="">
												<p className="text-sm text-ash/80">${item.figPrice}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					{/* section 2 */}
					<div className="w-full col-span-1 border">
						<div className="flex items-center justify-between text-2xl font-semibold text-kala">
							<p>Subtotal</p>
							<p>${totalFigPrice.toFixed(2)}</p>
						</div>
						<div className="">
							<input
								type="checkbox"
								name=""
								id="taxes"
							/>
							<label
								htmlFor="taxes"
								className="ml-2 text-sm"
							>
								I am aware of potential import taxes. Keep the invoice value at 100%
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckOut;
