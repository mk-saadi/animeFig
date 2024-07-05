// import { Fragment, useEffect, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { ShoppingBag, X } from "lucide-react";
// import { useCart } from "../provider/CartProvider";
// import useScroll from "../hooks/Scroll";

// const Cart = () => {
// 	const [open, setOpen] = useState(false);

// 	const { cartItems } = useCart();

// 	// const cartPrice = cartItems.map((ca) => ca.productPrice);

// 	// const totalCartPrice = cartPrice.reduce((accumulator, price) => {
// 	// 	return accumulator + price;
// 	// }, 0);

// 	// const allQuantity = cartItems.map((ca) => ca.quantity);
// 	// console.log("allQuantity: ", allQuantity);

// 	const handleRemove = (productId) => {
// 		const storedCartItems = JSON.parse(localStorage.getItem("cartItems-animeFig")) || [];

// 		const itemIndexToRemove = storedCartItems.findIndex((item) => item.productId === productId);

// 		if (itemIndexToRemove !== -1) {
// 			storedCartItems.splice(itemIndexToRemove, 1);

// 			localStorage.setItem("cartItems-animeFig", JSON.stringify(storedCartItems));

// 			// Dispatch the REMOVE_FROM_CART action to update the state
// 			dispatch({ type: "REMOVE_FROM_CART", payload: productId });
// 		}
// 	};

// 	const isScrolled = useScroll("top-navbar");

// 	return (
// 		<>
// 			<>
// 				<button
// 					type="button"
// 					className={`relative flex items-center justify-start duration-300 bg-transparent  ${
// 						isScrolled ? "text-white hover:text-laal" : "hover:text-laal text-ash"
// 					}`}
// 					onClick={() => setOpen(true)}
// 				>
// 					<span className="absolute -inset-1.5" />
// 					<span className="sr-only">open cart</span>
// 					<ShoppingBag
// 						className="w-6 h-6"
// 						aria-hidden="true"
// 					/>
// 				</button>
// 			</>
// 			<Transition.Root
// 				show={open}
// 				as={Fragment}
// 			>
// 				<Dialog
// 					as="div"
// 					className="relative z-50"
// 					onClose={setOpen}
// 				>
// 					<Transition.Child
// 						as={Fragment}
// 						enter="ease-in-out duration-500"
// 						enterFrom="opacity-0"
// 						enterTo="opacity-100"
// 						leave="ease-in-out duration-500"
// 						leaveFrom="opacity-100"
// 						leaveTo="opacity-0"
// 					>
// 						<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
// 					</Transition.Child>

// 					<div className="fixed inset-0 overflow-hidden">
// 						<div className="absolute inset-0 overflow-hidden">
// 							<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
// 								<Transition.Child
// 									as={Fragment}
// 									enter="transform transition ease-in-out duration-500 sm:duration-700"
// 									enterFrom="translate-x-full"
// 									enterTo="translate-x-0"
// 									leave="transform transition ease-in-out duration-500 sm:duration-700"
// 									leaveFrom="translate-x-0"
// 									leaveTo="translate-x-full"
// 								>
// 									<Dialog.Panel className="w-screen max-w-md pointer-events-auto">
// 										<div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
// 											<div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
// 												<div className="flex items-start justify-between">
// 													<Dialog.Title className="text-lg font-medium text-gray-900">
// 														Shopping cart
// 													</Dialog.Title>
// 													<div className="flex items-center ml-3 h-7">
// 														<button
// 															type="button"
// 															className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
// 															onClick={() => setOpen(false)}
// 														>
// 															<span className="absolute -inset-0.5" />
// 															<span className="sr-only">Close panel</span>
// 															<X
// 																className="w-6 h-6"
// 																aria-hidden="true"
// 															/>
// 														</button>
// 													</div>
// 												</div>

// 												<div className="mt-8">
// 													<div className="flow-root">
// 														<ul
// 															role="list"
// 															className="-my-6 divide-y divide-gray-200"
// 														>
// 															{/* {products.map((product) => (
// 															<li
// 																key={product.id}
// 																className="flex py-6"
// 															>
// 																<div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
// 																	<img
// 																		src={product.imageSrc}
// 																		alt={product.imageAlt}
// 																		className="object-cover object-center w-full h-full"
// 																	/>
// 																</div>

// 																<div className="flex flex-col flex-1 ml-4">
// 																	<div>
// 																		<div className="flex justify-between text-base font-medium text-gray-900">
// 																			<h3>
// 																				<a href={product.href}>
// 																					{product.name}
// 																				</a>
// 																			</h3>
// 																			<p className="ml-4">
// 																				{product.price}
// 																			</p>
// 																		</div>
// 																		<p className="mt-1 text-sm text-gray-500">
// 																			{product.color}
// 																		</p>
// 																	</div>
// 																	<div className="flex items-end justify-between flex-1 text-sm">
// 																		<p className="text-gray-500">
// 																			Qty {product.quantity}
// 																		</p>

// 																		<div className="flex">
// 																			<button
// 																				type="button"
// 																				className="font-medium text-indigo-600 hover:text-indigo-500"
// 																			>
// 																				Remove
// 																			</button>
// 																		</div>
// 																	</div>
// 																</div>
// 															</li>
// 														))} */}
// 														</ul>
// 													</div>
// 												</div>
// 											</div>

// 											<div className="px-4 py-6 border-t border-gray-200 sm:px-6">
// 												<div className="flex justify-between text-base font-medium text-gray-900">
// 													<p>Subtotal</p>
// 													<p>$262.00</p>
// 												</div>
// 												<p className="mt-0.5 text-sm text-gray-500">
// 													Shipping and taxes calculated at checkout.
// 												</p>
// 												<div className="mt-6">
// 													<a
// 														href="#"
// 														className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
// 													>
// 														Checkout
// 													</a>
// 												</div>
// 												<div className="flex justify-center mt-6 text-sm text-center text-gray-500">
// 													<p>
// 														or{" "}
// 														<button
// 															type="button"
// 															className="font-medium text-indigo-600 hover:text-indigo-500"
// 															onClick={() => setOpen(false)}
// 														>
// 															Continue Shopping
// 															<span aria-hidden="true"> &rarr;</span>
// 														</button>
// 													</p>
// 												</div>
// 											</div>
// 										</div>
// 									</Dialog.Panel>
// 								</Transition.Child>
// 							</div>
// 						</div>
// 					</div>
// 				</Dialog>
// 			</Transition.Root>
// 		</>
// 	);
// };
// export default Cart;

import React, { useEffect, useState } from "react";
import useScroll from "../hooks/Scroll";
import { ShoppingBag } from "lucide-react";

function Cart() {
	const [isOpen, setIsOpen] = useState(false);
	const isScrolled = useScroll("top-navbar");

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

	return (
		<div>
			<button
				className={`relative flex items-center justify-start duration-300 bg-transparent  ${
					isScrolled ? "text-white hover:text-laal" : "hover:text-laal text-ash"
				}`}
				onClick={() => setIsOpen(true)}
			>
				<ShoppingBag
					className="w-6 h-6"
					aria-hidden="true"
				/>
			</button>

			{/* Drawer Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 backdrop-blur-sm ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsOpen(false)}
			/>

			{/* Drawer */}
			<div
				className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="p-4 z-[999999]">
					<button
						className="p-2 text-white bg-red-500 rounded"
						onClick={() => setIsOpen(false)}
					>
						Close Drawer
					</button>
					<div className="mt-4">
						<p>This is the content of the drawer.</p>
						{/* Add your content here */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
