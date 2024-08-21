import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "react-toast-master";

const CheckOutForm = ({ cartItems, user, grandTotal }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transaction, setTransaction] = useState("");
	const { toastMaster } = useToast();

	console.log(
		"cartItems:",
		cartItems.map((items) => items.figName)
	);

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

		setProcessing(false);
		if (paymentIntent.status === "succeeded") {
			setTransaction(paymentIntent.id);

			const payment = {
				email: user?.email,
				transactionId: paymentIntent.id,
				grandTotal: grandTotal.toFixed(2),
				date: new Date(),
				quantity: cartItems.length,
				orderStatus: "Figures Ordered",
				cartItems,
			};

			axios.post(`${import.meta.env.VITE_URL}/payments/payments_history`, payment).then((res) => {
				console.log(res.data);
				if (res.acknowledged === true) {
					toastMaster({
						type: "successDark",
						bg: "white",
						message: "You clicked the button!",
					});
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
