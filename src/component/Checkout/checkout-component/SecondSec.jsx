import { PlusIcon, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const SecondSec = ({ user, handleProtectionChange, isProtectionChecked, finalTotalPrice }) => {
	return (
		<>
			<div className="w-full col-span-1 mt-2.5">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center justify-start">
						<div className="text-blue-500">
							<ShieldCheck />
						</div>
						<div className="">
							<p className="ml-2 text-sm text-kala">Shipping protection</p>
							<p className="ml-2 text-[12px] text-ash">
								from Damage, Loss & Theft for{" "}
								<span className="text-xs font-medium text-kala">$80.30</span>
							</p>
						</div>
					</div>
					<div className="">
						<input
							type="checkbox"
							className="-mb-1 rounded-md checkbox border-dhusor checkbox-sm"
							id="protection"
							onChange={handleProtectionChange}
							checked={isProtectionChecked}
						/>
					</div>
				</div>
				<div className="text-sm text-ash">
					<p>Shipping cost: $17.30</p>
				</div>
				<div className="flex items-center justify-between text-2xl font-semibold text-kala">
					<p>Grand Total</p>
					<p>
						<span className="text-3xl">$</span>
						{finalTotalPrice.toFixed(2)}
					</p>
				</div>
				{/* check-marks section */}
				<div className="flex flex-col items-start my-3 gap-y-2">
					<div className="">
						<div className="">
							<input
								type="checkbox"
								className="-mb-1 rounded-md checkbox border-dhusor checkbox-sm"
								id="taxes"
							/>
							<label
								className="ml-2 cursor-pointer"
								htmlFor="taxes"
							>
								<span className="text-sm label-text text-ash">
									I am aware of potential import taxes. Keep the invoice value at 100%
								</span>
							</label>
						</div>
					</div>
					<div className="">
						<div className="">
							<input
								type="checkbox"
								className="-mb-1 rounded-md checkbox border-dhusor checkbox-sm"
								id="gift"
							/>
							<label
								className="ml-2 cursor-pointer"
								htmlFor="gift"
							>
								<span className="text-sm text-ash label-text">Mark as gift</span>
							</label>
						</div>
					</div>
				</div>
				<div>
					{user && (
						<Link
							to="/payment"
							className="flex items-center justify-center w-full py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud"
						>
							Proceed to Checkout
						</Link>
					)}
					{!user && (
						<Link
							to="/auth/login"
							className="flex items-center justify-center w-full py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white gap-x-1 bg-holud"
						>
							Proceed to Checkout
						</Link>
					)}
				</div>
				<div className="flex flex-col mt-4 gap-y-2 text-ash">
					<p className="flex items-center justify-start text-sm duration-300 cursor-pointer gap-x-2 hover:text-laal">
						<PlusIcon size={18} /> Leave a note about your order
					</p>
					<p className="mt-2 text-sm">
						By placing an order, you agree to our{" "}
						<span className="underline cursor-pointer hover:text-laal">terms and conditions</span>
					</p>
				</div>
				<div>
					{/* Cart items and other components */}

					<label htmlFor="protection">Add Protection for $80.30</label>

					{/* <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
					<p>Protection Cost: ${protectionCost.toFixed(2)}</p> */}
					<p>Grand Total: ${finalTotalPrice.toFixed(2)}</p>
				</div>
			</div>
		</>
	);
};

export default SecondSec;
