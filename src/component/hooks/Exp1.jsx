import { createContext, useState, useContext } from "react";
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

	const showToast = (type, message, footer = null) => {
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
		success: "border-2 border-[#2d5e2e] text-[#98bc62]",
		error: "border-2 border-red-400 text-red-400",
		loading: "border-2 border-[#a16c46] text-[#fab07a]",
		info: "border-2 border-[#008294] text-[#008294]",
		confirm: "border-2 border-gray-700 text-gray-700",
	};

	const iconComponent = {
		success: <IoCheckbox />,
		error: <TbAlertSquareFilled />,
		loading: <BiLoaderCircle className="animate-spin" />,
		info: <BsFillInfoSquareFill />,
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			<>
				{children}
				{toastType && (
					<div>
						<div
							className={`bg-white  ${toastClasses[toastType]}`}
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
							<div>
								<p>
									<span>{iconComponent[toastType]}</span>
									{toastMessage}
								</p>

								{toastType !== "confirm" && (
									<div className="px-1.5 md:px-2.5 mt-1 duration-200 bg-gray-200 hover:bg-gray-300/70 py-px md:py-1 rounded-sm text-gray-800 text-sm md:text-base lg:text-lg">
										<button onClick={hideToast}>Close</button>
									</div>
								)}
							</div>

							{toastType === "confirm" && (
								<div>
									<button onClick={handleCancel}>Cancel</button>
									<button onClick={handleConfirm}>Confirm</button>
								</div>
							)}

							{toastFooter && <div dangerouslySetInnerHTML={{ __html: toastFooter }}></div>}
						</div>
					</div>
				)}
			</>
		</ToastContext.Provider>
	);
};
