import React, { useEffect, useState } from "react";
import { ChevronRight, ShoppingCartIcon, Trash2, X } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import { Link } from "react-router-dom";

function Cart() {
	const [isOpen, setIsOpen] = useState(false);
	const { cartItems, removeFromCart } = useCart();

	const totalPrice = cartItems.reduce((total, item) => total + item.figPrice, 0);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// const handleRemove = (productId) => {
	// 	const storedCartItems = JSON.parse(localStorage.getItem("cartItems-animeFig")) || [];
	// 	const itemIndexToRemove = storedCartItems.findIndex((item) => item.productId === productId);
	// 	if (itemIndexToRemove !== -1) {
	// 		storedCartItems.splice(itemIndexToRemove, 1);
	// 		localStorage.setItem("cartItems-animeFig", JSON.stringify(storedCartItems));
	// 		// Dispatch the REMOVE_FROM_CART action to update the state
	// 		dispatch({ type: "REMOVE_FROM_CART", payload: productId });
	// 	}
	// };
	const handleRemove = (productId) => {
		removeFromCart(productId); // Use the removeFromCart function provided by the context
	};

	// Add or remove the class to disable/enable scrolling
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isOpen]);

	return (
		<div>
			<button
				className="relative flex items-center justify-start p-2 text-white duration-300 rounded-md bg-ash/15 hover:text-laal"
				onClick={() => setIsOpen(true)}
				// onMouseEnter={() => setIsOpen(true)}
			>
				<ShoppingCartIcon
					className="w-6 h-6"
					aria-hidden="true"
				/>
				{cartItems?.length > 0 && (
					<span className="absolute inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-md -top-2 -right-3 bg-laal">
						{cartItems?.length}
					</span>
				)}
			</button>

			{/* Drawer Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 backdrop-blur-[1.5px] ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsOpen(false)}
				// onMouseEnter={() => setIsOpen(false)}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 right-0 w-56 md:w-80 lg:w-96 xl:w-[28rem] h-full bg-white shadow-2xl transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="px-0 z-[999999] relative overflow-y-auto flex h-full flex-col">
					<div className="sticky top-0 flex items-center justify-between w-full px-4 py-2 bg-white border-b shadow-md shadow-ash/5 border-ash/20">
						<h2 className="text-lg font-medium text-ash">Shopping Cart</h2>
						<button
							className="p-2 duration-300 bg-transparent rounded text-ash hover:bg-ash/10 hover:text-laal"
							onClick={() => setIsOpen(false)}
						>
							<X
								// className="w-5 h-5"
								size={20}
								aria-hidden="true"
							/>
						</button>
					</div>
					{/* Cart Items */}
					<div className="flex flex-1 px-4 my-4 bg-white">
						<div className="flex flex-col gap-y-2.5">
							{cartItems.map((item) => (
								<div
									key={item.figId}
									className="flex items-center justify-between gap-x-4"
								>
									<div className="flex h-full items-start gap-x-1.5 justify-start">
										<Link
											to={`/figDetails/${item.figId}`}
											onClick={() => setIsOpen(false)}
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
													to={`/figDetails/${item.figId}`}
													className="text-base hover:underline line-clamp-1 text-ash"
													onClick={() => setIsOpen(false)}
												>
													{item.figName}
												</Link>
												<p className="text-sm text-ash/80">${item.figPrice}</p>
											</div>
											<p className="text-ash">Quantity: 1</p>
										</div>
									</div>
									<div className="">
										<button
											className="p-2 rounded-md hover:underline text-laal bg-laal/10"
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
					{/* Cart Footer */}
					<div className="sticky bottom-0 w-full bg-white border-t border-ash/20">
						<div className="flex flex-col items-start justify-center p-4">
							<div className="flex items-center justify-between w-full font-medium text-ash">
								<p>Total: </p>
								<p>${totalPrice.toFixed(2)}</p>
							</div>
							<p className="text-sm text-ash/70">Shipping and taxes calculated at checkout.</p>
							<div className="flex items-center justify-center w-full mt-2">
								<button className="flex items-center justify-center w-full p-2 text-sm rounded-md shadow-md gap-x-1 text-ash bg-holud">
									Checkout
								</button>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<button className="flex items-center justify-center w-full p-2 text-sm rounded-md shadow-md gap-x-1 text-ash">
								or{" "}
								<span
									className="flex hover:underline "
									onClick={() => setIsOpen(false)}
								>
									Continue Shopping <ChevronRight size={20} />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
