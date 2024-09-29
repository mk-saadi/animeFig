import { Facebook, Frown, Gem, InfoIcon, Mail, MessageCircle, ShoppingCart, Twitter } from "lucide-react";

const ShareComponent = () => {
	return (
		<>
			<div className="w-full flex p-[1px] justify-center items-center border mt-4 rounded-md  bg-gradient-to-r from-[#e7230d] to-[#f4ae18]">
				<div className="p-[12px] bg-white rounded-[0.29rem] w-full text-ash">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start gap-x-2">
							<Gem
								className="text-laal"
								size={24}
							/>
							<div className="flex flex-col items-start justify-start">
								<p className="text-[14px] text-kala">Refer a friend</p>
								<p className="text-[10px] lg:text-[12px] -mt-[3px] text-ash">
									Get 500 points when they make their first purchase!
								</p>
							</div>
						</div>
						<div className="flex gap-x-1 lg:gap-x-2.5">
							<Twitter size={18} />
							<Facebook size={18} />
							<Mail size={18} />
							<MessageCircle size={18} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShareComponent;
