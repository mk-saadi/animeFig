import { useCart } from "../provider/CartProvider";
import { useContext } from "react";
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
		toggleProtectionFee,
		includeProtectionFee,
		shippingCost,
		grandTotal,
		totalPrice,
	} = useCart();

	const totalFigPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

	const cartItemsWithoutComingSoon = cartItems.filter((item) => item.figLabel === "Coming Soon");

	return (
		<>
			<div>
				<>
					<TopSec
						cartItemsWithoutComingSoon={cartItemsWithoutComingSoon}
						cartItems={cartItems}
					/>
				</>
				<div className="grid justify-between grid-cols-1 mt-8 lg:grid-cols-4">
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
							totalFigPrice={totalFigPrice}
							toggleProtectionFee={toggleProtectionFee}
							includeProtectionFee={includeProtectionFee}
							shippingCost={shippingCost}
							grandTotal={grandTotal}
							totalPrice={totalPrice}
						/>
					</>
				</div>
			</div>
		</>
	);
};

export default CheckOut;
