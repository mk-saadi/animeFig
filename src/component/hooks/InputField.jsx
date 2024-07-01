import React from "react";

const InputField = ({ label, type = "text", id, name, placeholder }) => {
	return (
		<div className="flex flex-col w-full gap-y-1.5">
			<label
				htmlFor={id}
				className="text-sm font-medium text-gray-500"
			>
				{label}
			</label>
			<input
				type={type}
				id={id}
				name={name}
				className="px-3 py-1.5 w-full rounded-md bg-slate-600 text-gray-100 placeholder:text-gray-400 focus:outline-none shadow-md"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputField;
