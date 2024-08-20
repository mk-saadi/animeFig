// import { useCart } from "../../provider/CartProvider";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

// const PaymentForm = () => {
// 	const { user } = useContext(AuthContext);
// 	const { cartItems, totalPrice, grandTotal, clearCart } = useCart();
// 	const stripe = useStripe();
// 	const elements = useElements();
// 	const [paymentStatus, setPaymentStatus] = useState(null);

// 	const [clientSecret, setClientSecret] = useState("");

// 	// Fetch the clientSecret when the component mounts or when grandTotal changes
// 	useEffect(() => {
// 		if (grandTotal > 0) {
// 			fetch(`${import.meta.env.VITE_URL}/payments/create-payment-intent`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					cartItems, // This is optional, but can be useful for logging or other backend logic
// 					grandTotal,
// 				}),
// 			})
// 				.then((res) => res.json())
// 				.then((data) => setClientSecret(data.clientSecret));
// 		}
// 	}, [grandTotal]);

// 	const handlePayment = async () => {
// 		if (!stripe || !elements || !clientSecret) return;

// 		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
// 			payment_method: {
// 				card: elements.getElement(CardElement),
// 				billing_details: {
// 					email: user.email,
// 				},
// 			},
// 		});

// 		if (error) {
// 			console.error("Payment failed:", error);
// 			setPaymentStatus("Payment failed");
// 			return;
// 		}

// 		if (paymentIntent) {
// 			console.log("Payment successful:", paymentIntent);
// 			setPaymentStatus("Payment successful");

// 			// Send payment data to your backend
// 			await fetch(`${import.meta.env.VITE_URL}/payments/payment-success`, {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					paymentIntentId: paymentIntent.id,
// 					userId: user._id,
// 					cartItems,
// 				}),
// 			});

// 			// Clear the cart in localStorage
// 			localStorage.removeItem("cartItems-animeFig");

// 			// Navigate to a success page or show a success message
// 		}
// 	};

// 	return (
// 		<form onSubmit={handlePayment}>
// 			<CardElement />
// 			<button
// 				type="submit"
// 				disabled={!stripe}
// 				className="w-full px-4 py-2 mt-4 font-bold text-white rounded bg-dhusor"
// 			>
// 				Pay ${grandTotal.toFixed(2)}
// 			</button>
// 			{paymentStatus && <p>{paymentStatus}</p>}
// 		</form>
// 	);
// };

// const Payment = () => (
// 	<Elements stripe={stripePromise}>
// 		<PaymentForm />
// 	</Elements>
// );

// export default Payment;

// const CheckOutForm = ({ price, cart }) => {
const CheckOutForm = ({ cartItems, user, grandTotal }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transaction, setTransaction] = useState("");

	useEffect(() => {
		if (grandTotal > 0) {
			axios
				.post(`${import.meta.env.VITE_URL}/payments/create-payment-intent`, { grandTotal })
				.then((res) => {
					console.log(res.data.clientSecret);
					setClientSecret(res.data.clientSecret);
				});
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		// if not present
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("error", error);
			setError(error.message);
		} else {
			setError("");
			console.log("payment method", paymentMethod);
		}

		setProcessing(true);

		const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					name: user?.displayName || "anonymous",
					email: user?.email || "anonymous@email.com",
				},
			},
		});

		if (confirmError) {
			console.log(confirmError);
			setError(confirmError.message);
		}

		console.log(paymentIntent);

		setProcessing(false);
		if (paymentIntent.status === "succeeded") {
			setTransaction(paymentIntent.id);
			// const transactionId = paymentIntent.id;
			const payment = {
				email: user?.email,
				transactionId: paymentIntent.id,
				grandTotal: grandTotal,
				date: new Date(),
				quantity: cart.length,
				orderStatus: "service pending",
				cartItems: cart.map((items) => items._id),
				menuItems: cart.map((items) => items.menuItemId),
				itemNames: cart.map((items) => items.name),
			};
			axios.post("/payments", payment).then((res) => {
				console.log(res.data);
				if (res.insertedId > 0) {
					Swal.fire("Good job!", "You clicked the button!", "success");
				}
			});
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full"
			>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "24px",
								color: "white",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
					className="p-2 my-8 rounded-sm input input-bordered input-info"
				/>
				<div className="flex justify-end">
					{/*  */}
					<button
						id="button"
						type="submit"
						disabled={!stripe || !clientSecret || processing}
						className="text-xl text-white rounded-sm btn btn-info hover:text-white"
					>
						Pay
					</button>
				</div>
			</form>
			{error && <p className="text-error">{error}</p>}
			{transaction && (
				<p className="text-success">
					Transaction complete <br />
					TransactionId: {transaction}
				</p>
			)}
		</>
	);
};

export default CheckOutForm;
