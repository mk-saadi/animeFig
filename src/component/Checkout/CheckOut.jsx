import { useCart } from "../provider/CartProvider";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import FirstSec from "./checkout-component/FirstSec";
import SecondSec from "./checkout-component/SecondSec";
import TopSec from "./checkout-component/TopSec";

const CheckOut = () => {
	const { user } = useContext(AuthContext);
	const {
		cartItems,
		increaseQuantity,
		decreaseQuantity,
		removeFromCart,
		toggleProtection,
		totalPrice,
		shippingCost,
		protectionCost,
	} = useCart();

	const [isProtectionChecked, setIsProtectionChecked] = useState(false);
	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	const cartItemsWithoutComingSoon = cartItems.filter((item) => item.figLabel === "Coming Soon");

	const handleProtectionChange = (e) => {
		const isChecked = e.target.checked;
		setIsProtectionChecked(isChecked);
		toggleProtection(isChecked);
	};

	const finalTotalPrice = totalPrice + shippingCost + protectionCost;

	return (
		<>
			<div>
				<>
					<TopSec
						cartItemsWithoutComingSoon={cartItemsWithoutComingSoon}
						cartItems={cartItems}
					/>
				</>
				<div className="grid justify-between grid-cols-4 mt-8">
					{/* section 1 */}
					<>
						<FirstSec
							cartItems={cartItems}
							increaseQuantity={increaseQuantity}
							decreaseQuantity={decreaseQuantity}
							removeFromCart={removeFromCart}
						/>
					</>
					{/* section 2 */}
					<>
						<SecondSec
							user={user}
							handleProtectionChange={handleProtectionChange}
							isProtectionChecked={isProtectionChecked}
							finalTotalPrice={finalTotalPrice}
						/>
					</>
				</div>
			</div>
		</>
	);
};

export default CheckOut;
