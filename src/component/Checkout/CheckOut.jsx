import { Info, ShieldCheck, Trash2 } from "lucide-react";
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
						<h2 className="text-2xl flex justify-center items-center gap-x-2.5 font-medium text-kala">
							<div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
							Shopping Cart
						</h2>
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
					{/* section 2 */}
					<div className="w-full col-span-1 mt-2.5">
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center justify-start">
								<div className="text-blue-500">
									<ShieldCheck />
								</div>
								<div className="">
									<p className="ml-2 text-xs text-kala">Shipping protection</p>
									<p className="ml-2 text-[10px] text-ash">
										from Damage, Loss & Theft for{" "}
										<span className="text-kala text-[10.5px] font-medium">$80.30</span>
									</p>
								</div>
							</div>
							<div className="checkbox-wrapper">
								<input
									type="checkbox"
									id="styledCheckbox"
									className="checkbox-input"
								/>
								<label
									htmlFor="styledCheckbox"
									className="checkbox-label"
								></label>
							</div>
						</div>
						<div className="flex items-center justify-between text-2xl font-semibold text-kala">
							<p>Subtotal</p>
							<p>
								<span className="text-3xl">$</span>
								{totalFigPrice.toFixed(2)}
							</p>
						</div>
						<div className="">
							{/* <input
								type="checkbox"
								name=""
								id="taxes"
								className="checkbox-input"
							/>
							<label
								htmlFor="styledCheckbox"
								className="checkbox-label"
							></label>
							<label
								htmlFor="taxes"
								className="text-sm border"
							>
								I am aware of potential import taxes. Keep the invoice value at 100%
							</label> */}
							<div className="">
								<input
									type="checkbox"
									className="p-0 m-0 rounded-md checkbox border-dhusor checkbox-sm"
									id="taxes"
								/>
								<label
									className="border cursor-pointer"
									htmlFor="taxes"
								>
									<span className="label-text">
										I am aware of potential import taxes. Keep the invoice value at 100%
									</span>
								</label>
							</div>
						</div>
						<div className="">
							<input
								type="checkbox"
								name=""
								id="gift"
								className="checkbox-input"
							/>
							<label
								htmlFor="styledCheckbox"
								className="checkbox-label"
							></label>
							<label
								htmlFor="gift"
								className="ml-2 text-sm"
							>
								Mark as gift
							</label>
						</div>
						<div>
							<Link
								to="/payment"
								className="flex items-center justify-center w-full py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud"
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckOut;
