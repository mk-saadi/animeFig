/* -------------------------------------------------------------------------- */
//                     !!! DO NOT TOUCH THIS COMPONENT !!!                    //
/* -------------------------------------------------------------------------- */

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { figId, figPrice } = action.payload;
			const existingProductIndex = state.cartItems.findIndex((item) => item.figId === figId);

			if (existingProductIndex !== -1) {
				const updatedCart = [...state.cartItems];
				const existingProduct = updatedCart[existingProductIndex];
				updatedCart[existingProductIndex] = {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
					totalPrice: (existingProduct.quantity + 1) * figPrice,
				};

				localStorage.setItem("cartItems-animeFig", JSON.stringify(updatedCart));

				return {
					...state,
					cartItems: updatedCart,
					totalPrice: state.totalPrice + figPrice,
				};
			} else {
				const newProduct = {
					...action.payload,
					quantity: 1,
					totalPrice: figPrice,
				};
				const updatedCart = [...state.cartItems, newProduct];

				localStorage.setItem("cartItems-animeFig", JSON.stringify(updatedCart));

				return {
					...state,
					cartItems: updatedCart,
					totalPrice: state.totalPrice + figPrice,
				};
			}
		}
		case "INCREASE_QUANTITY": {
			const { figId, figPrice } = action.payload;
			const updatedCart = state.cartItems.map((item) =>
				item.figId === figId
					? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * figPrice }
					: item
			);
			const updatedTotalPrice = state.totalPrice + figPrice;
			localStorage.setItem("cartItems-animeFig", JSON.stringify(updatedCart));
			return {
				...state,
				cartItems: updatedCart,
				totalPrice: updatedTotalPrice,
			};
		}
		case "DECREASE_QUANTITY": {
			const { figId, figPrice } = action.payload;
			const updatedCart = state.cartItems.map((item) =>
				item.figId === figId && item.quantity > 1
					? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * figPrice }
					: item
			);
			const updatedTotalPrice = state.totalPrice - figPrice;
			localStorage.setItem("cartItems-animeFig", JSON.stringify(updatedCart));
			return {
				...state,
				cartItems: updatedCart,
				totalPrice: updatedTotalPrice,
			};
		}
		case "REMOVE_FROM_CART": {
			const itemToRemove = state.cartItems.find((item) => item.figId === action.payload);
			const updatedCart = state.cartItems.filter((item) => item.figId !== action.payload);
			const updatedTotalPrice = state.totalPrice - (itemToRemove?.totalPrice || 0);
			localStorage.setItem("cartItems-animeFig", JSON.stringify(updatedCart));
			return {
				...state,
				cartItems: updatedCart,
				totalPrice: updatedTotalPrice,
			};
		}
		// delete code below
		case "TOGGLE_PROTECTION_FEE": {
			const protectionFee = 0;
			return {
				...state,
				includeProtectionFee: !state.includeProtectionFee,
				totalPrice: state.includeProtectionFee
					? state.totalPrice - protectionFee
					: state.totalPrice + protectionFee,
			};
		}
		case "SET_SHIPPING_COST": {
			return {
				...state,
				shippingCost: action.payload,
			};
		}
		default:
			return state;
	}
};

const CartProvider = ({ children }) => {
	const storedCartItems = JSON.parse(localStorage.getItem("cartItems-animeFig")) || [];
	const storedTotalPrice = storedCartItems.reduce(
		(total, item) => total + (item.totalPrice || item.figPrice * item.quantity),
		0
	);

	const [state, dispatch] = useReducer(cartReducer, {
		cartItems: storedCartItems,
		totalPrice: storedTotalPrice,
		// delete code below
		includeProtectionFee: false,
		shippingCost: 17.3, // Fixed shipping cost
	});

	const addToCart = (item) => {
		dispatch({ type: "ADD_TO_CART", payload: item });
	};

	const increaseQuantity = (figId, figPrice) => {
		dispatch({ type: "INCREASE_QUANTITY", payload: { figId, figPrice } });
	};

	const decreaseQuantity = (figId, figPrice) => {
		dispatch({ type: "DECREASE_QUANTITY", payload: { figId, figPrice } });
	};

	const removeFromCart = (productId) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: productId });
	};

	useEffect(() => {
		localStorage.setItem("cartItems-animeFig", JSON.stringify(state.cartItems));
	}, [state.cartItems]);

	// delete code below
	const toggleProtectionFee = () => {
		dispatch({ type: "TOGGLE_PROTECTION_FEE" });
	};

	useEffect(() => {
		dispatch({ type: "SET_SHIPPING_COST", payload: 17.3 });
	}, []);

	const grandTotal = state.totalPrice + state.shippingCost + (state.includeProtectionFee ? 80.3 : 0);

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				increaseQuantity,
				decreaseQuantity,
				removeFromCart,
				toggleProtectionFee,
				grandTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}

	const {
		cartItems,
		totalPrice,
		addToCart,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		toggleProtectionFee,
		includeProtectionFee,
		shippingCost,
		grandTotal,
	} = context;

	const isItemInCart = (figId) => {
		return cartItems.some((item) => item.figId === figId);
	};

	return {
		...context,
		isItemInCart,
		addToCart,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		toggleProtectionFee,
		includeProtectionFee,
		shippingCost,
		grandTotal,
		totalPrice,
	};
};

export { CartProvider, useCart };
