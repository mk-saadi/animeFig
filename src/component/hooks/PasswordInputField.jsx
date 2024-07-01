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
					className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-lg shadow-gray-900/10 text-ash focus:outline-none focus:ring-2 focus:ring-nill"
					required
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute p-1 transform -translate-y-1/2 text-ash right-1 top-1/2 hover:text-nill focus:outline-none"
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
			</div>
		</div>
	);
};

export default PasswordInputField;
