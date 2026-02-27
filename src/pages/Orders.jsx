import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
	const { currency } = useContext(ShopContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/orders', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})
			.then((res) => res.json())
			.then((data) => {
				setOrders(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	return (
		<div className='border-t pt-16'>
			<div className='text-2xl mb-8'>
				<Title text1={'MY'} text2={'ORDERS'} />
			</div>

			{loading ? (
				<p className='text-center text-gray-400 mt-20'>
					Loading your orders...
				</p>
			) : orders.length === 0 ? (
				<div className='text-center text-gray-500 mt-20 py-10'>
					<p className='text-lg'>You have no orders yet.</p>
					<p className='mt-2 text-sm'>
						Once you place an order, it will appear here.
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-4'>
					{orders.map((order, index) => (
						<div
							key={index}
							className='border rounded-sm p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-700'
						>
							<div className='flex items-start gap-6 text-sm'>
								<img
									src={order.image}
									className='w-16 sm:w-20 object-cover'
									alt={order.name}
								/>
								<div>
									<p className='sm:text-base font-medium'>{order.name}</p>
									<div className='flex flex-wrap items-center gap-3 mt-2 text-gray-400'>
										<p className='text-lg text-gray-700'>
											{currency}
											{order.price.toLocaleString()}
										</p>
										<p>Qty: {order.quantity}</p>
										{order.option && <p>Option: {order.option}</p>}
									</div>
									<p className='mt-2 text-xs text-gray-400'>
										Order placed:{' '}
										{new Date(order.date).toLocaleDateString('en-NG', {
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										})}
									</p>
								</div>
							</div>

							<div className='md:w-1/2 flex justify-between items-center'>
								<div className='flex items-center gap-2'>
									<p
										className={`min-w-2 h-2 rounded-full ${
											order.status === 'Delivered'
												? 'bg-green-400'
												: order.status === 'Shipped'
													? 'bg-blue-400'
													: order.status === 'Processing'
														? 'bg-yellow-400'
														: 'bg-gray-400'
										}`}
									></p>
									<p className='text-sm md:text-base'>{order.status}</p>
								</div>
								<button className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-black hover:text-white transition-all duration-300'>
									Track Order
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
