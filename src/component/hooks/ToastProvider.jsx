import { createContext, useState, useContext } from "react";
import { Slide } from "react-awesome-reveal";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbAlertSquareFilled } from "react-icons/tb";
import { IoCheckbox } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
	const [toastType, setToastType] = useState("");
	const [toastMessage, setToastMessage] = useState("");
	const [confirmResolve, setConfirmResolve] = useState(null);
	const [toastTimeout, setToastTimeout] = useState(null);
	const [toastFooter, setToastFooter] = useState(null);

	// const showToast = (type, message, footer = null) => {
	// 	setToastType(type);
	// 	setToastMessage(message);
	// 	setToastFooter(footer);

	// 	if (type === "success" || type === "error" || type === "info") {
	// 		setToastTimeout(setTimeout(() => hideToast(), 3000));
	// 	}
	// 	if (type === "confirm") {
	// 		return new Promise((resolve) => {
	// 			setConfirmResolve(() => resolve);
	// 		});
	// 	}
	// };

	const showToast = (toast) => {
		const { type, message, footer = null } = toast;
		setToastType(type);
		setToastMessage(message);
		setToastFooter(footer);

		if (type === "success" || type === "error" || type === "info") {
			setToastTimeout(setTimeout(() => hideToast(), 3000));
		}
		if (type === "confirm") {
			return new Promise((resolve) => {
				setConfirmResolve(() => resolve);
			});
		}
	};

	const hideToast = () => {
		setToastType("");
		setToastMessage("");
		clearTimeout(toastTimeout);
	};

	const handleConfirm = () => {
		if (confirmResolve) {
			confirmResolve(true);
		}
		hideToast();
	};

	const handleCancel = () => {
		if (confirmResolve) {
			confirmResolve(false);
		}
		hideToast();
	};

	const toastClasses = {
		success: "border-[1px] border-[#2d5e2e] text-[#98bc62] bg-green-50",
		error: "border-[1px] border-red-400 text-red-400 bg-red-50",
		loading: "border-[1px] border-[#a16c46] text-[#fab07a] bg-amber-50",
		info: "border-[1px] border-[#54B4D3] text-[#54B4D3] bg-sky-50",
		infoStay: "border-[1px] border-[#54B4D3] text-[#54B4D3] bg-blue-50",
		confirm: "border-[1px] border-gray-700 text-gray-700 bg-gray-50",
	};

	const iconComponent = {
		success: <IoCheckbox />,
		error: <TbAlertSquareFilled />,
		loading: <BiLoaderCircle className="animate-spin" />,
		info: <BsFillInfoSquareFill />,
		infoStay: <BsFillInfoSquareFill />,
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			<>
				{children}
				{toastType && (
					<Slide
						direction="down"
						className="fixed z-50 flex justify-center w-full transform toast-animation md:justify-center left:4 md:left:auto top-4 md:bottom-auto md:right-0 md:-translate-x-1/2 md:top-5"
						style={{ zIndex: "999999" }}
					>
						<div
							// className={`flex flex-col bg-white  rounded-md shadow-md drop-shadow-md ${toastClasses[toastType]}`}
							className={`flex flex-col rounded-lg shadow-md drop-shadow-md  ${toastClasses[toastType]}`}
							onMouseEnter={() => {
								if (toastType !== "confirm" && toastType !== "infoStay") {
									clearTimeout(toastTimeout);
								}
							}}
							onMouseLeave={() => {
								if (toastType !== "confirm" && toastType !== "infoStay") {
									setToastTimeout(setTimeout(() => hideToast(), 1000));
								}
							}}
						>
							<div className=" font-semibold md:px-12 md:py-2.5  px-2.5 py-1">
								<div className="flex flex-col items-center justify-center gap-y-3">
									<div className="">
										<p className="flex flex-row items-center justify-center text-sm font-semibold gap-x-4 md:text-base lg:text-lg">
											<span className="text-lg md:text-2xl">
												{iconComponent[toastType]}
											</span>
											{toastMessage}
										</p>
									</div>

									{/* {toastType !== "confirm" && (
										<div className="px-1.5 md:px-2.5 mt-1 duration-200 bg-gray-200 hover:bg-gray-300/70 py-px md:py-1 rounded-sm text-gray-800 text-sm md:text-base lg:text-lg">
											<button onClick={hideToast}>Close</button>
										</div>
									)} */}
								</div>

								{/* if toast is "confirm" type then show these two buttons */}
								<>
									{toastType === "confirm" && (
										<div className="flex justify-center mt-4 font-semibold text-gray-800 gap-x-3">
											<button
												className="px-2.5 mt-1 duration-200 bg-gray-200 hover:bg-gray-300/70 py-1 rounded-md shadow-sm"
												onClick={handleCancel}
											>
												Cancel
											</button>
											<button
												className="px-2.5 mt-1 duration-200 bg-sky-200 hover:bg-sky-300/70 py-1 rounded-md shadow-sm"
												onClick={handleConfirm}
											>
												Confirm
											</button>
										</div>
									)}
								</>
							</div>

							<div>
								{/* footer if it exist */}
								{toastFooter && (
									<div
										className="flex justify-center py-1.5 underline border-t border-gray-400/60 text-sky-500"
										dangerouslySetInnerHTML={{ __html: toastFooter }}
									></div>
								)}
							</div>
						</div>
					</Slide>
				)}
			</>
		</ToastContext.Provider>
	);
};
