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

			<div className="grid justify-between grid-cols-5 mx-12">
				{/* section 1 */}
				<div className="col-span-3">
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
				<div className="col-span-2">
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
												<div className="flex-shrink-0 h-32 overflow-hidden rounded-md w-28">
													<img
														src={item.figImg}
														className="object-cover object-center w-full h-full"
													/>
												</div>
												<div className="flex flex-col h-full py-1.5">
													<div className="flex flex-col flex-1 gap-y-1">
														<p className="px-2 py-[2px] text-xs text-white rounded-sm w-fit bg-blue-500">
															{item?.figLabel}
														</p>
														<p className="text-base text-kala">{item.figName}</p>
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
				</div>
			</div>
		</div>
	);
};

export default Payment;
