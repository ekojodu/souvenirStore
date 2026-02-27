const NewsLetterBox = () => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		alert('Thank you for subscribing! You will receive exclusive offers and updates.');
	};
	return (
		<div className='text-center'>
			<p className='text-2xl font-medium text-gray-800'>
				Subscribe & Get 15% Off Your First Order
			</p>
			<p className='text-gray-400 mt-3'>
				Be the first to hear about new arrivals, artisan stories, and exclusive deals on authentic Nigerian souvenirs.
			</p>
			<form
				onSubmit={onSubmitHandler}
				className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
			>
				<input
					className='w-full sm:flex-1 outline-none'
					type='email'
					placeholder='Enter your email address'
					required
				/>
				<button
					type='submit'
					className='bg-black text-white text-xs px-10 py-4'
				>
					SUBSCRIBE
				</button>
			</form>
		</div>
	);
};

export default NewsLetterBox;
