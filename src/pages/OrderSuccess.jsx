import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
	const navigate = useNavigate();

	return (
		<div className='border-t pt-16 min-h-[60vh] flex flex-col items-center justify-center text-center gap-6'>
			<div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
				<svg
					className='w-8 h-8 text-green-500'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M5 13l4 4L19 7'
					/>
				</svg>
			</div>
			<h1 className='text-2xl font-medium text-gray-800'>
				Order Placed Successfully!
			</h1>
			<p className='text-gray-500 max-w-md'>
				Thank you for your order. We have received it and will be in touch
				shortly to confirm delivery.
			</p>
			<div className='flex gap-4 mt-4'>
				<button
					onClick={() => navigate('/orders')}
					className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300'
				>
					VIEW MY ORDERS
				</button>
				<button
					onClick={() => navigate('/collection')}
					className='bg-orange-500 text-white px-8 py-3 text-sm hover:bg-orange-600 transition-all duration-300'
				>
					CONTINUE SHOPPING
				</button>
			</div>
		</div>
	);
};

export default OrderSuccess;
