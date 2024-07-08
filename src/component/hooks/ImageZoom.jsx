import React, { useState } from "react";
import "./zoom.css";

const ZoomImage = ({ src, alt }) => {
	const [style, setStyle] = useState({
		"--display": "none",
		"--zoom-x": "0%",
		"--zoom-y": "0%",
		"--url": `url(${src})`,
	});

	const handleMouseMove = (event) => {
		const rect = event.target.getBoundingClientRect();
		const x = ((event.clientX - rect.left) * 100) / rect.width;
		const y = ((event.clientY - rect.top) * 100) / rect.height;
		setStyle({
			"--display": "block",
			"--zoom-x": `${x}%`,
			"--zoom-y": `${y}%`,
			"--url": `url(${src})`,
		});
	};

	const handleMouseOut = () => {
		setStyle({
			"--display": "none",
			"--zoom-x": "0%",
			"--zoom-y": "0%",
			"--url": `url(${src})`,
		});
	};

	return (
		<div
			className="imageZoom cursor-crosshair"
			style={style}
			onMouseMove={handleMouseMove}
			onMouseOut={handleMouseOut}
		>
			<img
				src={src}
				alt={alt}
			/>
		</div>
	);
};

export default ZoomImage;
