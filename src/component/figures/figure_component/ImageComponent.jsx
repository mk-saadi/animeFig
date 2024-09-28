import ImageZoom from "../../hooks/ImageZoom";

const ImageComponent = ({ fig }) => {
	return (
		<>
			<div className="flex flex-col w-full h-full min-h-screen lg:pr-4">
				<div className="">
					{fig?.images && (
						<>
							<div className="flex flex-col items-center justify-start gap-y-2">
								<div className="w-full h-fit">
									<ImageZoom
										src={fig?.images[0]}
										alt={"product image"}
									/>
								</div>
								{fig?.images[1] && (
									<div className="flex flex-col items-start justify-center w-full gap-y-2 h-fit">
										<ImageZoom
											src={fig?.images[1]}
											alt={"product image"}
										/>
										{fig?.images[2] && (
											<ImageZoom
												src={fig?.images[2]}
												alt={"product image"}
											/>
										)}
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ImageComponent;
