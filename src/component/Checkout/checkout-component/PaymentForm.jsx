import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "react-toast-master";
import InputField from "../../hooks/InputField";
import { CreditCard } from "lucide-react";
import { Navigate } from "react-router-dom";

const cardElementOptions = {
	style: {
		base: {
			color: "#374151 ",
			fontSize: "20px",
			"::placeholder": {
				color: "#9CA3AF",
			},
			backgroundColor: "transparent",
			fontFamily: "Poppins",
			fontWeight: "500",
		},
		invalid: {
			color: "#e7230d",
		},
	},
};

const CheckOutForm = ({ cartItems, user, grandTotal }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState("");
	const [clientSecret, setClientSecret] = useState("");
	const [processing, setProcessing] = useState(false);
	const [transaction, setTransaction] = useState("");
	const { toastMaster } = useToast();

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

		const form = event.target;
		const address = form.address.value;
		const city = form.city.value;
		const state = form.state.value;
		const country = form.country.value;
		const zip = form.zip.value;
		const phone = form.phone.value;
		const deliverName = form.name.value;
		const deliverEmail = form.email.value;
		const apartment = form.apartment.value;

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
				address,
				city,
				state,
				country,
				zip,
				phone,
				deliverName,
				deliverEmail,
				apartment,
			};

			axios.post(`${import.meta.env.VITE_URL}/payments/payments_history`, payment).then((res) => {
				console.log(res.data);
				if (res.acknowledged === true) {
					toastMaster({
						type: "successDark",
						bg: "white",
						message: "You clicked the button!",
					});
					Navigate("/order_progress");
				}
			});
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full p-1"
			>
				<div className="flex flex-col gap-y-5">
					<div>
						<h3 className="mb-2 text-lg text-ash">Contact</h3>
						<div className="flex flex-col gap-y-2.5">
							<InputField
								// label="Your Email"
								type="email"
								id="email"
								name="email"
								placeholder={"Your Email"}
								defaultValue={user?.email}
							/>
							<div className="flex">
								<input
									type="checkbox"
									className="-mb-1 rounded-md checkbox border-dhusor checkbox-sm"
									id="news"
								/>
								<label
									className="ml-2 cursor-pointer"
									htmlFor="news"
								>
									<span className="text-sm label-text text-ash">
										Email me with news and offers
									</span>
								</label>
							</div>
						</div>
					</div>
					<div>
						<h3 className="mb-2 text-lg text-ash">Delivery</h3>
						<div className="flex flex-col gap-y-5">
							<>
								<select
									className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg border-dhusor shadow-gray-700/10 text-ash/70 focus:outline-none focus:ring-2 focus:ring-ash select"
									name="country"
									required
								>
									<option
										disabled
										selected
									>
										Country/Region
									</option>
									<option>Argentina</option>
									<option>Bangladesh</option>
									<option>China</option>
									<option>Japan</option>
									<option>Philippines</option>
								</select>
							</>
							<>
								<InputField
									type="name"
									id="name"
									name="name"
									defaultValue={user?.displayName}
									placeholder={"Your Name"}
									required={true}
								/>
							</>
							<>
								<InputField
									type="text"
									id="address"
									name="address"
									placeholder={"Address"}
									required={true}
								/>
							</>
							<>
								<InputField
									type="text"
									id="apartment"
									name="apartment"
									placeholder={"Apartment, suite, etc. (optional)"}
								/>
							</>
							<div className="grid grid-cols-3 gap-x-2.5">
								<InputField
									type="text"
									id="city"
									name="city"
									placeholder={"City"}
									required={true}
								/>
								<InputField
									type="text"
									id="state"
									name="state"
									placeholder={"State"}
									required={true}
								/>
								<InputField
									type="text"
									id="zip"
									name="zip"
									placeholder={"Zip Code"}
									required={true}
								/>
							</div>
							<div className="flex flex-col gap-y-2.5">
								<InputField
									type="text"
									id="phone"
									name="phone"
									placeholder={"Phone (optional)"}
								/>
								<div className="flex">
									<input
										type="checkbox"
										className="-mb-1 rounded-md checkbox border-dhusor checkbox-sm"
										id="save"
									/>
									<label
										className="ml-2 cursor-pointer"
										htmlFor="save"
									>
										<span className="text-sm label-text text-ash">
											Save this information for next time
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-y-2.5">
						<CardElement
							options={cardElementOptions}
							className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg border-dhusor shadow-gray-900/10 focus:outline-none focus:ring-2 focus:ring-ash"
						/>
						<div className="flex">
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
									Use shipping address as billing address
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="flex justify-end mt-10">
					{/*  */}
					<button
						id="button"
						type="submit"
						disabled={!stripe || !clientSecret || processing}
						className="flex items-center gap-x-2.5 justify-center w-full py-1.5 text-base font-semibold text-white duration-300 rounded-md shadow-lg shadow-ash/25 hover:scale-105 hover:text-white bg-holud"
					>
						Pay Now <CreditCard />
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
