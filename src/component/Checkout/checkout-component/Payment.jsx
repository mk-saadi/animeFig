import { useCart } from "../../provider/CartProvider";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

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

	const [isProtectionChecked, setIsProtectionChecked] = useState(false);
	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	return (
		<div>
			<p>Payment</p>
		</div>
	);
};

export default Payment;
