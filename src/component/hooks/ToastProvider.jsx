import { createContext, useState, useContext } from "react";
import { Fade } from "react-awesome-reveal";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbAlertSquareFilled } from "react-icons/tb";
import { IoCheckbox } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import { X } from "lucide-react";
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
	const [toastType, setToastType] = useState("");
	const [toastMessage, setToastMessage] = useState("");
	const [confirmResolve, setConfirmResolve] = useState(null);

	// const showToast = (type, message) => {
	// 	setToastType(type);
	// 	setToastMessage(message);

	// 	if (type === "success" || type === "error" || type === "info") {
	// 		setTimeout(() => hideToast(), 3000);
	// 	}
	// 	if (type === "confirm") {
	// 		return new Promise((resolve) => {
	// 			setConfirmResolve(() => resolve);
	// 		});
	// 	}
	// };

	const [toastFooter, setToastFooter] = useState(null);
	const showToast = (type, message, footer = null) => {
		setToastType(type);
		setToastMessage(message);
		setToastFooter(footer);
		if (type === "success" || type === "error" || type === "info") {
			setTimeout(() => hideToast(), 3000);
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
		infoStay: "border-2 border-[#008294] text-[#008294]",
		confirm: "border-2 border-gray-700 text-gray-700",
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
					<Fade
						direction="down"
						className="fixed z-50 flex justify-start w-full transform toast-animation md:justify-center left:4 md:left:auto bottom-6 md:bottom-auto md:right-0 md:-translate-x-1/2 md:top-5"
						style={{ zIndex: "999999" }}
					>
						<div
							className={`flex flex-col bg-white  rounded-md shadow-md drop-shadow-md  ${toastClasses[toastType]}`}
						>
							<div className="select-none font-semibold md:px-3 md:py-2.5  px-2 py-1">
								<div className="flex items-center justify-center gap-x-6">
									<div className="">
										<p className="flex flex-row items-center justify-center text-sm font-semibold gap-x-4 md:text-lg">
											<span className="text-lg md:text-2xl">
												{iconComponent[toastType]}
											</span>
											{toastMessage}
										</p>
									</div>

									<div className="mt-1 text-red-400">
										<button onClick={hideToast}>
											<X />
										</button>
									</div>
								</div>

								{/* if toast is "confirm" type */}
								<>
									{toastType === "confirm" && (
										<div className="flex justify-center mt-2">
											<button
												className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
												onClick={handleCancel}
											>
												Cancel
											</button>
											<button
												className="px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
										className="flex justify-center py-1.5 underline border-t text-sky-500"
										dangerouslySetInnerHTML={{ __html: toastFooter }}
									></div>
								)}
							</div>
						</div>
					</Fade>
				)}
			</>
		</ToastContext.Provider>
	);
};
