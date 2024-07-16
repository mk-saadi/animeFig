import ImageZoom from "../../hooks/ImageZoom";

const ImageComponent = ({ fig }) => {
	return (
		<>
			<div className="flex flex-col w-full h-full min-h-screen pr-4">
				{/* figure image */}
				<div className="">
					{fig?.images && (
						<>
							<div className="flex flex-col items-center justify-start gap-y-2">
								<div
									// className="w-[480px] h-fit"
									className="w-full h-fit"
								>
									<ImageZoom src={fig?.images[0]} />
								</div>
								{fig?.images[1] && (
									<div className="flex flex-col items-start justify-center w-full gap-y-2 h-fit">
										<ImageZoom src={fig?.images[1]} />
										{fig?.images[2] && <ImageZoom src={fig?.images[2]} />}
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
