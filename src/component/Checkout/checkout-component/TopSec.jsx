import { Info } from "lucide-react";
import React from "react";

const TopSec = ({ cartItemsWithoutComingSoon, cartItems }) => {
	return (
		<>
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
								You have a pre-order item in your cart. Keep in mind that your order will be
								shipped together on release date. If thats not your intention, please make a
								second order.
							</p>
						</div>
					)}
					{cartItems.length >= 3 && (
						<div className="px-4 py-2 text-laal/70 text-center flex justify-start gap-x-1.5 items-center rounded-md bg-holud/15 w-full">
							<Info size={17} />
							<p className="text-sm">
								You have 3 or more items in your cart. Due to shipping size limitations your
								order might have to be split up over several parcels. Additional shipping fees
								can occur.
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TopSec;
