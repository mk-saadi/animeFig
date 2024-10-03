const LastRow = () => {
	return (
		<div className="flex flex-col items-end justify-between mt-4 gap-y-5 lg:flex-row gap-x-3">
			<div className="flex flex-col gap-y-4">
				<h2 className="text-xl lg:text-2xl flex justify-start items-center gap-x-2.5 font-semibold text-start text-kala">
					<div className="w-8 lg:w-10 h-1.5 rounded-full bg-gradient-to-r from-[#e7230d] to-[#f4ae18]" />
					About AnimeFig
				</h2>
				<p className="text-sm text-ash">
					Founded in 2008 in Tokyo, AnimeFig has been a leading international anime store and
					retailer for Japanese anime figures, Figma and Nendoroid. Our extensive franchise range
					covers figures from One Piece, Dragon Ball, Death Note and Bleach to name a few. We also
					carry a vast stock of import video games, retro games and accessories covering all the
					major consoles and including Japanese exclusives with Japan only trophies. We pride
					ourselves in finding the best quality items, and over the years we have shipped hundreds
					of thousands of anime figures and games to happy customers around the globe.
				</p>
			</div>
			<p className="text-sm text-ash">
				Since we send your order directly from Japan, there is a chance that you will have to pay
				import fees in your country (unless you live in the USA). These fees are your responsibility
				since you are importing goods into your country. Our site offers a customs friendly invoice
				tool that you can find on the check out page. It can help lower the amount of import fees but
				is by no means a guarantee to do so. Our product selection of anime figures and games includes
				close to 100.000 brand new and pre-owned items. We check the condition of every single item
				before we send it to you, to make sure you get what you are looking for when shopping with
				AnimeFig.
			</p>
		</div>
	);
};

export default LastRow;
