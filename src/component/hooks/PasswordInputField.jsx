import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInputField = ({ label, id, name }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="flex flex-col w-full gap-y-1.5">
			<label
				htmlFor={id}
				className="text-sm font-medium text-gray-500"
			>
				{label}
			</label>
			<div className="relative">
				<input
					type={showPassword ? "text" : "password"}
					id={id}
					name={name}
					className="px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none shadow-md"
					required
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute p-1 text-gray-400 transform -translate-y-1/2 right-1 top-1/2 hover:text-gray-200 focus:outline-none"
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			</div>
		</div>
	);
};

export default PasswordInputField;
