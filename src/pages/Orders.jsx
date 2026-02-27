import { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { supabase } from '../lib/supabase';
import Title from '../components/Title';

const Orders = () => {
	const { currency, user, navigate } = useContext(ShopContext);
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}

		const fetchOrders = async () => {
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('guest_id', user.id)
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching orders:', error);
			} else setOrders(data || []);
			setLoading(false);
		};

		fetchOrders();
	}, [user]);

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
				<div className='flex flex-col gap-6'>
					{orders.map((order) => (
						<div
							key={order.id}
							className='border rounded-sm p-4 md:p-6 flex flex-col gap-4 text-gray-700'
						>
							<div className='flex justify-between items-center text-sm text-gray-400'>
								<p>
									Order placed:{' '}
									{new Date(order.created_at).toLocaleDateString('en-NG', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}
								</p>
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
									<p className='text-gray-700 font-medium'>{order.status}</p>
								</div>
							</div>

							{/* Each item in the order */}
							{order.items.map((item, i) => (
								<div
									key={i}
									className='flex items-start gap-6 text-sm border-t pt-4'
								>
									<img
										src={item.image}
										className='w-16 sm:w-20 object-cover'
										alt={item.name}
									/>
									<div className='flex-1'>
										<p className='sm:text-base font-medium'>{item.name}</p>
										<div className='flex flex-wrap items-center gap-3 mt-1 text-gray-400'>
											<p className='text-gray-700'>
												{currency}
												{item.price.toLocaleString()}
											</p>
											<p>Qty: {item.quantity}</p>
											{item.option && <p>Option: {item.option}</p>}
										</div>
									</div>
								</div>
							))}

							<div className='flex justify-between items-center border-t pt-4 text-sm'>
								<p className='text-gray-500'>
									Total:{' '}
									<span className='text-gray-800 font-medium'>
										{currency}
										{order.total.toLocaleString()}
									</span>
									<span className='ml-2 text-gray-400'>
										(incl. ₦{order.delivery_fee.toLocaleString()} delivery)
									</span>
								</p>
								<span className='text-xs bg-gray-100 px-3 py-1 rounded-full capitalize'>
									{order.payment_method.replace('_', ' ')}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Orders;
