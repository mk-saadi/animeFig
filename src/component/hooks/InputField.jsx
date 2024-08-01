import React from "react";

const InputField = ({ label, type = "text", id, name, placeholder, required }) => {
	return (
		<div className="flex flex-col w-full gap-y-1.5">
			{label && (
				<label
					htmlFor={id}
					className="text-sm font-medium text-gray-500"
				>
					{label}
				</label>
			)}
			<input
				type={type}
				id={id}
				required={required}
				name={name}
				className="w-full px-3 py-2 bg-transparent border rounded-md shadow-lg border-dhusor shadow-gray-900/10 text-ash focus:outline-none focus:ring-2 focus:ring-ash"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputField;
