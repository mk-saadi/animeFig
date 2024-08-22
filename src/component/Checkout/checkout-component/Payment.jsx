import { useCart } from "../../provider/CartProvider";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
// import CheckoutForm from "./PaymentForm";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
	const { user } = useContext(AuthContext);
	const {
		cartItems,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		toggleProtectionFee,
		includeProtectionFee,
		shippingCost,
		grandTotal,
		totalPrice,
	} = useCart();

	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	return (
		<div className="w-full overflow-x-hidden bg-white">
			<div className="flex w-full border border-dhusor">
				<h1
					className={`flex-shrink-0 pb-2 text-gradient select-none flex font-sans flex-col leading-3 items-end`}
				>
					<h2 className="text-2xl font-extrabold">ANIME</h2>
					<h3 className="text-lg font-extrabold leading-[8px]">FIG</h3>
				</h1>
			</div>

			<div className="grid justify-between min-h-screen grid-cols-5 mx-28">
				{/* section 1 */}
				<div className="col-span-3 py-12 pr-8 border-r">
					<h3 className="flex items-center justify-start mb-3 text-xl font-medium gap-x-2 text-ash">
						<div className="w-7 h-1 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
						Payment
					</h3>
					<Elements
						stripe={stripePromise}
						className="w-full"
					>
						<PaymentForm
							grandTotal={grandTotal}
							user={user}
							cartItems={cartItems}
						/>
					</Elements>
				</div>
				{/* section 2 */}
				<div className="col-span-2 pt-12 pl-8">
					<h3 className="flex items-center justify-start mb-3 text-xl font-medium gap-x-2 text-ash">
						<div className="w-7 h-1 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
						Selected Figures
					</h3>
					<div className="flex flex-col col-span-3">
						{cartItems.length > 0 && (
							<div className="flex flex-1 mb-4 bg-white">
								<div className="flex flex-col divide-y-[1px] divide-dhusor/70">
									{cartItems.map((item) => (
										<div
											key={item.figId}
											className="flex items-center py-2.5 justify-between gap-x-4"
										>
											<div className="flex h-full items-start gap-x-1.5 justify-start">
												<div className="relative">
													<div className="flex-shrink-0 w-16 h-20 overflow-hidden rounded-md">
														<img
															src={item.figImg}
															className="object-cover object-center w-full h-full"
														/>
													</div>
													<p className="absolute bg-ash/70 text-sm h-5 w-5 flex justify-center items-center rounded-full shadow-xl text-white -top-1.5 -right-1.5">
														<span>{item.quantity}</span>
													</p>
												</div>
												<div className="flex flex-col h-full py-1.5">
													<div className="flex flex-col flex-1 gap-y-1">
														<p className="text-sm text-kala line-clamp-2">
															{item.figName}
														</p>
														<p className="text-xs rounded-sm text-ash w-fit">
															{item?.figLabel}
														</p>
													</div>
												</div>
											</div>
											<div className="mr-10">
												<p className="text-sm text-ash">
													<span className="text-base">$</span>
													{item.figPrice}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
						<div>
							<p>Shipping Protection: $80.30</p>
							<p>Shipping Cost: $17.30</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
