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
										<div className="px-1.5 md:px-2.5 mt-1 duration-200 bg-gray-200 hover:bg-dhusor /70 py-px md:py-1 rounded-sm text-gray-800 text-sm md:text-base lg:text-lg">
											<button onClick={hideToast}>Close</button>
										</div>
									)} */}
								</div>

								{/* if toast is "confirm" type then show these two buttons */}
								<>
									{toastType === "confirm" && (
										<div className="flex justify-center mt-4 font-semibold text-gray-800 gap-x-3">
											<button
												className="px-2.5 mt-1 duration-200 bg-gray-200 hover:bg-dhusor /70 py-1 rounded-md shadow-sm"
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

// /* eslint-disable no-mixed-spaces-and-tabs */
// import { createContext, useState, useContext, useEffect } from "react";
// import { Fade, Slide } from "react-awesome-reveal";
// import {
// 	AlertTriangle,
// 	CheckCheck,
// 	CheckCircle,
// 	Info,
// 	RotateCw,
// 	XCircle,
// 	PinIcon,
// 	RefreshCw,
// 	CircleDashed,
// } from "lucide-react";
// // import "./styles.css";

// const ToastContext = createContext();

// export const useToast = () => useContext(ToastContext);

// export const ToastProvider = ({ children }) => {
// 	const [toastType, setToastType] = useState("");
// 	const [toastMessage, setToastMessage] = useState("");
// 	const [confirmResolve, setConfirmResolve] = useState(null);
// 	const [confirmDarkResolve, setConfirmDarkResolve] = useState(null);
// 	const [toastTimeout, setToastTimeout] = useState(null);
// 	const [showCloseButton, setShowCloseButton] = useState(true);
// 	const [showButton, setShowButton] = useState(null);

// 	const [toastBackground, setToastBackground] = useState("");
// 	const [toastPosition, setToastPosition] = useState("");
// 	const [toastSkew, setToastSkew] = useState("");
// 	const [toastDirection, setToastDirection] = useState("");
// 	const [toastShadow, setToastShadow] = useState("");
// 	const [toastRadius, setToastRadius] = useState("");

// 	// const [toastFooter, setToastFooter] = useState(null);
// 	const [toastFooterNoUrl, setToastFooterNoUrl] = useState(null);
// 	const [showLoadFooter, setShowLoadFooter] = useState(false);
// 	const [toastLoadFooter, setToastLoadFooter] = useState(null);

// 	const toastClassesBackground = {
// 		white: "bg-white border-[1px] border-[#a5a5a5]",
// 		dark: "bg-[#09090b] border-[1px] border-gray-500",
// 		success: "bg-green-500 border-[1px] border-[#007E33]", //bg-[#07bc0c]
// 		error: "bg-[#ef4255] border-[1px] border-[#be2a3b]",
// 		warning: "bg-[#edc319] border-[1px] border-[#FF8800]",
// 		info: "bg-[#2196f3] border-[1px] border-[#0d47a1]",
// 		infoStay: "bg-[#2196f3] border-[1px] border-[#0d47a1]",
// 	};
// 	const toastClassesPosition = {
// 		top: "justify-center md:justify-center left-0 md:left:auto top-4 md:right-0 md:-translate-x-1/2 md:top-5",
// 		topLeft: "md:justify-start left-2 top-2 md:left-5 md:top-5",
// 		topRight: "md:justify-end right-2 top-2 md:right-5 md:top-5",
// 		bottom: "justify-center md:justify-center left-0 md:left:auto bottom-4 md:right-0 md:-translate-x-1/2 md:bottom-5",
// 		bottomLeft: "md:justify-start justify-center left-0 bottom-5 md:left-5 md:bottom-5",
// 		bottomRight: "md:justify-end justify-center right-0 bottom-5 md:right-5 md:bottom-5",
// 	};
// 	const toastAwesomeDirection = {
// 		down: "down",
// 		top: "up",
// 		left: "left",
// 		right: "right",
// 	};
// 	const toastAwesomeSkew = {
// 		right3: "-skew-x-3",
// 		right6: "-skew-x-6",
// 		right12: "-skew-x-12",
// 		left3: "skew-x-3",
// 		left6: "skew-x-6",
// 		left12: "skew-x-12",
// 	};
// 	const toastAwesomeShadow = {
// 		none: "",
// 		gray: "boxShadow",
// 		block: "boxShadowBlock",
// 		error: "shadowError",
// 		white: "shadowWhite",
// 		dark: "shadowDark",
// 		success: "shadowSuccess",
// 		info: "shadowInfo",
// 		loading: "shadowLoading",
// 	};
// 	const toastAwesomeRadius = {
// 		none: "rounded-none",
// 		sm: "rounded-sm",
// 		md: "rounded-md",
// 		lg: "rounded-lg",
// 		xl: "rounded-xl",
// 		twoXl: "rounded-2xl",
// 		full: "rounded-full",
// 	};

// 	const hideToast = () => {
// 		setToastType("");
// 		setToastMessage("");
// 		clearTimeout(toastTimeout);
// 	};

// 	const toastMaster = (toast) => {
// 		if (toastTimeout) {
// 			clearTimeout(toastTimeout);
// 		}
// 		const {
// 			type = "success",
// 			message,
// 			// footerUrl = null,
// 			bg = "white",
// 			position = "top",
// 			direction = "down",
// 			loadFooter = null,
// 			footer = null,
// 			cancelButton = false,
// 			skew = null,
// 			shadow = "gray",
// 			radius = "lg",
// 		} = toast;
// 		setToastType(type);
// 		setToastMessage(message);
// 		// setToastFooter(footerUrl);
// 		setToastLoadFooter(loadFooter);
// 		setToastFooterNoUrl(footer);
// 		setShowButton(cancelButton);

// 		// toast background
// 		if (bg && toastClassesBackground[bg]) {
// 			setToastBackground(toastClassesBackground[bg]);
// 		} else {
// 			setToastBackground("");
// 		}

// 		// toast position
// 		if (position && toastClassesPosition[position]) {
// 			setToastPosition(toastClassesPosition[position]);
// 		} else {
// 			setToastPosition("");
// 		}

// 		// toast direction
// 		if (direction && toastAwesomeDirection[direction]) {
// 			setToastDirection(toastAwesomeDirection[direction]);
// 		} else {
// 			setToastDirection("");
// 		}

// 		// toast skew
// 		if (skew && toastAwesomeSkew[skew]) {
// 			setToastSkew(toastAwesomeSkew[skew]);
// 		} else {
// 			setToastSkew("");
// 		}

// 		// toast shadow
// 		if (shadow && toastAwesomeShadow[shadow]) {
// 			setToastShadow(toastAwesomeShadow[shadow]);
// 		} else {
// 			setToastShadow("");
// 		}

// 		// toast radius
// 		if (radius && toastAwesomeRadius[radius]) {
// 			setToastRadius(toastAwesomeRadius[radius]);
// 		} else {
// 			setToastRadius("");
// 		}

// 		if (
// 			type === "success" ||
// 			type === "successWhite" ||
// 			type === "successDark" ||
// 			type === "error" ||
// 			type === "errorWhite" ||
// 			type === "errorDark" ||
// 			type === "warning" ||
// 			type === "warningWhite" ||
// 			type === "warningDark" ||
// 			type === "info" ||
// 			type === "infoWhite" ||
// 			type === "infoDark"
// 		) {
// 			setToastTimeout(setTimeout(() => hideToast(), 4500));
// 		}

// 		if (type === "confirm") {
// 			return new Promise((resolve) => {
// 				setConfirmResolve(() => resolve);
// 			});
// 		}
// 		if (type === "confirmDark") {
// 			return new Promise((resolve) => {
// 				setConfirmDarkResolve(() => resolve);
// 			});
// 		}

// 		if (type === "loading" || type === "loadingWhite" || type === "loadingDark") {
// 			setShowLoadFooter(false);
// 			setTimeout(() => setShowLoadFooter(true), 5000);
// 		}
// 	};

// 	useEffect(() => {
// 		if (toastType === "loading" || toastType === "loadingWhite" || toastType === "loadingDark") {
// 			setShowCloseButton(false);
// 			setTimeout(() => setShowCloseButton(true), 5000);
// 		} else {
// 			setShowCloseButton(true);
// 		}
// 	}, [toastType]);

// 	// hide the toast when pressed "Esc" key
// 	useEffect(() => {
// 		const handleKeyDown = (event) => {
// 			if (event.key === "Escape") {
// 				hideToast();
// 			}
// 		};
// 		document.addEventListener("keydown", handleKeyDown);
// 		return () => {
// 			document.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, []);

// 	const handleConfirm = () => {
// 		if (confirmResolve) {
// 			confirmResolve(true);
// 		}
// 		hideToast();
// 	};
// 	const handleCancel = () => {
// 		if (confirmResolve) {
// 			confirmResolve(false);
// 		}
// 		hideToast();
// 	};
// 	const handleConfirmDark = () => {
// 		if (confirmDarkResolve) {
// 			confirmDarkResolve(true);
// 		}
// 		hideToast();
// 	};
// 	const handleCancelDark = () => {
// 		if (confirmDarkResolve) {
// 			confirmDarkResolve(false);
// 		}
// 		hideToast();
// 	};

// 	const toastClasses = {
// 		success: "text-[#07bc0c]",
// 		error: "text-[#ef4255]",
// 		loading: "text-[#edc319]",
// 		warning: "text-[#edc319]",
// 		warningStay: "text-[#edc319]",
// 		info: "text-[#2196f3]",
// 		infoStay: "text-[#2196f3]",
// 		confirm: "text-[#fff]",

// 		successWhite: "text-white",
// 		errorWhite: "text-white",
// 		loadingWhite: "text-white",
// 		warningWhite: "text-white",
// 		warningStayWhite: "text-white",
// 		infoWhite: "text-white",
// 		infoStayWhite: "text-white",

// 		successDark: "text-gray-800 ",
// 		errorDark: "text-gray-800 ",
// 		loadingDark: "text-gray-800",
// 		warningDark: "text-gray-800",
// 		warningStayDark: "text-gray-800",
// 		infoDark: "text-gray-800",
// 		infoStayDark: "text-gray-800 ",
// 		confirmDark: "text-gray-800 ",
// 	};
// 	const iconComponent = {
// 		success: <CheckCheck />,
// 		successWhite: <CheckCheck />,
// 		successDark: <CheckCheck />,
// 		error: <AlertTriangle />,
// 		errorWhite: <AlertTriangle />,
// 		errorDark: <AlertTriangle />,
// 		loading: <CircleDashed className="animate-spin" />,
// 		loadingWhite: <CircleDashed className="animate-spin" />,
// 		loadingDark: <CircleDashed className="animate-spin" />,
// 		warning: <Info />,
// 		warningWhite: <Info />,
// 		warningDark: <Info />,
// 		warningStay: <Info />,
// 		warningStayWhite: <Info />,
// 		warningStayDark: <Info />,
// 		info: <PinIcon className="rotate-[40deg]" />,
// 		infoWhite: <PinIcon className="rotate-[40deg]" />,
// 		infoDark: <PinIcon className="rotate-[40deg]" />,
// 		infoStay: <PinIcon className="rotate-[40deg]" />,
// 		infoStayWhite: <PinIcon className="rotate-[40deg]" />,
// 		infoStayDark: <PinIcon className="rotate-[40deg]" />,
// 	};

// 	const toastBG = Object.keys(toastClassesBackground).find(
// 		(key) => toastClassesBackground[key] === toastBackground
// 	);

// 	return (
// 		<ToastContext.Provider value={{ toastMaster, hideToast }}>
// 			<>
// 				{children}
// 				{toastType && (
// 					<Slide
// 						direction={toastDirection}
// 						className={`fixed flex w-full transform ${toastPosition}`}
// 						style={{ zIndex: "9999" }}
// 						damping={0.7}
// 					>
// 						<div
// 							className={`flex flex-col toastsvg group relative ${toastClasses[toastType]} ${toastBackground} ${toastSkew} ${toastShadow} ${toastRadius}`}
// 							onMouseEnter={() => {
// 								if (
// 									toastType !== "confirm" &&
// 									toastType !== "confirmWhite" &&
// 									toastType !== "confirmDark" &&
// 									toastType !== "infoStay" &&
// 									toastType !== "infoStayWhite" &&
// 									toastType !== "infoStayDark" &&
// 									toastType !== "loading" &&
// 									toastType !== "loadingWhite" &&
// 									toastType !== "loadingDark" &&
// 									toastType !== "warningStay" &&
// 									toastType !== "warningStayWhite" &&
// 									toastType !== "warningStayDark"
// 								) {
// 									clearTimeout(toastTimeout);
// 								}
// 							}}
// 							onMouseLeave={() => {
// 								if (
// 									toastType !== "confirm" &&
// 									toastType !== "confirmWhite" &&
// 									toastType !== "confirmDark" &&
// 									toastType !== "infoStay" &&
// 									toastType !== "infoStayWhite" &&
// 									toastType !== "infoStayDark" &&
// 									toastType !== "loading" &&
// 									toastType !== "loadingWhite" &&
// 									toastType !== "loadingDark" &&
// 									toastType !== "warningStay" &&
// 									toastType !== "warningStayWhite" &&
// 									toastType !== "warningStayDark"
// 								) {
// 									setToastTimeout(setTimeout(() => hideToast(), 1500));
// 								}
// 							}}
// 						>
// 							<div className="font-semibold sm:w-[380px] w-[270px] md:w-[430px] xl:w-[460px] md:px-6 md:py-2.5 px-2.5 py-[6px]">
// 								<div className="">
// 									<div className="flex flex-col items-center justify-center text-sm font-medium whitespace-normal sm:flex-row md:text-base">
// 										{toastType !== "confirm" && (
// 											<Fade
// 												triggerOnce
// 												className="pr-2 md:pr-4"
// 											>
// 												<span className="sr-only">toast icon</span>
// 												<span aria-hidden="true">{iconComponent[toastType]}</span>
// 											</Fade>
// 										)}
// 										<Fade triggerOnce>{toastMessage}</Fade>
// 									</div>
// 								</div>

// 								{/* if toast is "confirm" type then show these two buttons */}
// 								<>
// 									{toastType === "confirm" && (
// 										<div className="flex items-center justify-center mt-3 font-semibold text-gray-700 gap-x-3">
// 											<button
// 												className={`sm:px-4 px-2  duration-300 ring-[1px] ring-dhusor  py-px rounded-sm shadow-sm flex justify-center items-center gap-x-[2px] sm:gap-x-2 whitespace-nowrap md:text-base text-sm active:scale-95 ${
// 													toastBG === "dark"
// 														? "bg-[#09090b] hover:bg-[#18181d] ring-[1px] ring-gray-800 hover:ring-gray-700 duration-300 text-white"
// 														: toastBG === "white"
// 														? "bg-white hover:bg-[#f1f1f1] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 														: toastBG === "error"
// 														? "bg-[#ef4255] hover:bg-[#ef4260] ring-[1px] ring-gray-400 text-gray-800 hover:ring-gray-500 duration-300"
// 														: toastBG === "success"
// 														? "bg-[#07bc0c] hover:bg-[#31bc07] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-100 duration-300"
// 														: toastBG === "warning"
// 														? "bg-[#edc319] hover:bg-[#edbb19] ring-[1px] ring-gray-400 text-gray-800 hover:ring-gray-500 duration-300"
// 														: toastBG === "info"
// 														? "bg-[#2196f3] hover:bg-[#219ff3] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 														: "bg-white hover:bg-[#f1f1f1] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 												}`}
// 												onClick={handleCancel}
// 											>
// 												<span className="sr-only">close toast</span>
// 												<XCircle
// 													className="text-lg"
// 													size={24}
// 												/>
// 												Cancel
// 											</button>
// 											<button
// 												className={`flex items-center justify-center sm:px-4 px-2  py-px duration-300 rounded-sm shadow-sm gap-x-1 sm:gap-x-2 whitespace-nowrap md:text-base text-sm active:scale-95 ${
// 													toastBG === "dark"
// 														? "bg-white hover:bg-[#f1f1f1]  ring-[1px] ring-dhusor  text-gray-800" //bg-[#7f53d7]
// 														: "bg-gray-700 ring-[1px] ring-gray-500 text-white"
// 												}`}
// 												onClick={handleConfirm}
// 											>
// 												<span className="sr-only">confirm?</span>
// 												<CheckCircle
// 													className="text-lg"
// 													size={24}
// 												/>
// 												Confirm
// 											</button>
// 										</div>
// 									)}
// 								</>

// 								{/* if toast is "confirmDark" type then show these two buttons */}
// 								<>
// 									{toastType === "confirmDark" && (
// 										<div className="flex items-center justify-center mt-3 text-sm font-medium text-gray-700 sm:text-base gap-x-3">
// 											<button
// 												className={`sm:px-4 px-2  duration-300 ring-[1px] ring-dhusor  py-px rounded-sm shadow-sm flex justify-center items-center gap-x-[2px] sm:gap-x-2 whitespace-nowrap md:text-base text-sm active:scale-95 ${
// 													toastBG === "dark"
// 														? "bg-[#09090b] hover:bg-[#18181d] ring-[1px] ring-gray-800 hover:ring-gray-700 duration-300 text-white"
// 														: toastBG === "white"
// 														? "bg-white hover:bg-[#f1f1f1] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 														: toastBG === "error"
// 														? "bg-[#ef4255] hover:bg-[#ef4260] ring-[1px] ring-gray-400 text-gray-800 hover:ring-gray-500 duration-300"
// 														: toastBG === "success"
// 														? "bg-[#07bc0c] hover:bg-[#31bc07] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-100 duration-300"
// 														: toastBG === "warning"
// 														? "bg-[#edc319] hover:bg-[#edbb19] ring-[1px] ring-gray-400 text-gray-800 hover:ring-gray-500 duration-300"
// 														: toastBG === "info"
// 														? "bg-[#2196f3] hover:bg-[#219ff3] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 														: "bg-white hover:bg-[#f1f1f1] ring-[1px] ring-dhusor  text-gray-800 hover:ring-gray-400 duration-300"
// 												}`}
// 												onClick={handleCancelDark}
// 											>
// 												<span className="sr-only">close toast</span>
// 												<XCircle
// 													className="text-lg"
// 													size={24}
// 												/>
// 												Cancel
// 											</button>
// 											<button
// 												className={`flex items-center justify-center sm:px-4 px-2  py-px duration-300 rounded-sm shadow-sm gap-x-1 sm:gap-x-2 whitespace-nowrap md:text-base text-sm active:scale-95 ${
// 													toastBG === "dark"
// 														? "bg-white hover:bg-[#f1f1f1]  ring-[1px] ring-dhusor  text-gray-800" //bg-[#7f53d7]
// 														: "bg-gray-900 ring-[1px] ring-gray-700 text-white"
// 												}`}
// 												onClick={handleConfirmDark}
// 											>
// 												<span className="sr-only">confirm?</span>
// 												<CheckCircle
// 													className="text-lg"
// 													size={24}
// 												/>
// 												Confirm
// 											</button>
// 										</div>
// 									)}
// 								</>
// 							</div>

// 							{/* loadFooter if it exist */}
// 							<>
// 								{showLoadFooter && toastLoadFooter && (
// 									<div
// 										// className={` flex items-center justify-center md:py-1.5 px-2.5 py-[2px] text-sm underline border-t  sm:w-[380px] w-[270px] md:w-[430px] xl:w-[460px] border-gray-400/60 ${
// 										// 	toastBG === "info" ? "text-dhusor " : "text-blue-500"
// 										// }`}
// 										className={`whitespace-break-spaces text-center text-xs sm:text-sm md:py-1.5 px-2.5 border-t py-[2px] sm:w-[380px] w-[270px] md:w-[430px] xl:w-[460px] font-normal ${
// 											toastBG === "dark" || toastBG === "warning"
// 												? "text-gray-600 border-gray-600/50"
// 												: toastBG === "white"
// 												? "text-gray-500 border-gray-400/60"
// 												: "text-dhusor  border-gray-400/60"
// 										}`}
// 										dangerouslySetInnerHTML={{ __html: toastLoadFooter }}
// 									></div>
// 								)}
// 							</>
// 							{/* footerUrl if it exist */}
// 							{/* <>
// 								{toastFooter && (
// 									<div
// 										className={` flex items-center justify-center md:py-1.5 px-2.5 py-[2px] text-sm underline border-t  sm:w-[380px] w-[270px] md:w-[430px] xl:w-[460px] ${
// 											toastBG === "info"
// 												? "text-dhusor  border-gray-200/60"
// 												: "text-blue-500 border-gray-400/60"
// 										}`}
// 										dangerouslySetInnerHTML={{ __html: toastFooter }}
// 									></div>
// 								)}
// 							</> */}

// 							{/* footer no url if it exist */}
// 							<Fade>
// 								{toastFooterNoUrl && (
// 									<div
// 										className={`whitespace-break-spaces text-center text-xs sm:text-sm md:py-1.5 px-2.5 border-t py-[2px] sm:w-[380px] w-[270px] md:w-[430px] xl:w-[460px] font-normal ${
// 											toastBG === "dark" || toastBG === "warning"
// 												? "text-gray-600 border-gray-600/50"
// 												: toastBG === "white"
// 												? "text-gray-500 border-gray-400/60"
// 												: toastBG === "info"
// 												? "text-dhusor  border-gray-200/60"
// 												: toastBG === "error"
// 												? "text-dhusor  border-gray-400/60"
// 												: "text-gray-500 border-gray-400/60"
// 										}`}
// 										// dangerouslySetInnerHTML={{ __html: toastFooterNoUrl }}
// 									>
// 										{toastFooterNoUrl}
// 									</div>
// 								)}
// 							</Fade>

// 							<div className="absolute duration-300 -top-4 -right-4">
// 								{/* <div className={`absolute flex items-center justify-end h-full -right-[53px] `}> */}
// 								{toastType !== "confirm" &&
// 									toastType !== "confirmDark" &&
// 									showCloseButton &&
// 									showButton && (
// 										<Fade triggerOnce>
// 											<button
// 												onClick={hideToast}
// 												className={`duration-300 hover:scale-105 rounded-full p-1 ${
// 													toastBG === "dark"
// 														? "bg-[#09090b]"
// 														: "bg-white ring-[0.6px] ring-gray-900/30"
// 												} ${
// 													toastType === "infoStayDark" ||
// 													toastType === "infoDark" ||
// 													toastType === "warningDark" ||
// 													toastType === "warningStayDark" ||
// 													toastType === "successDark" ||
// 													toastType === "loadingDark" ||
// 													toastType === "errorDark"
// 														? "text-[#09090b]"
// 														: toastType === "error"
// 														? "text-[#ef4255]"
// 														: toastType === "success"
// 														? "text-[#07bc0c]"
// 														: toastType === "loading" ||
// 														  toastType === "warning" ||
// 														  toastType === "warningStay"
// 														? "text-[#bda74e]"
// 														: toastType === "info"
// 														? "text-[#2196f3]"
// 														: toastType === "infoStay"
// 														? "text-[#2196f3]"
// 														: "text-white"
// 												}`}
// 											>
// 												<span className="sr-only">close toast</span>
// 												<XCircle aria-hidden="true" />
// 											</button>
// 										</Fade>
// 									)}
// 							</div>
// 						</div>
// 					</Slide>
// 				)}
// 			</>
// 		</ToastContext.Provider>
// 	);
// };
