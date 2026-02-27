import { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { supabase } from '../lib/supabase';

const PlaceOrder = () => {
	const {
		navigate,
		getCartItems,
		calculateCartAmount,
		deliveryFee,
		user,
		clearCart,
	} = useContext(ShopContext);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
	});

	const handleChange = (e) =>
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handlePlaceOrder = async () => {
		const cartItems = getCartItems();
		if (cartItems.length === 0) {
			alert('Your cart is empty.');
			return;
		}

		const { firstName, lastName, email, phone, address, city, state } = form;
		if (
			!firstName ||
			!lastName ||
			!email ||
			!phone ||
			!address ||
			!city ||
			!state
		) {
			alert('Please fill in all delivery details.');
			return;
		}

		setLoading(true);
		const subtotal = calculateCartAmount();

		const { error } = await supabase.from('orders').insert({
			guest_id: user?.id || localStorage.getItem('guest_id'),
			items: cartItems,
			subtotal,
			delivery_fee: deliveryFee,
			total: subtotal + deliveryFee,
			first_name: firstName,
			last_name: lastName,
			email,
			phone,
			address,
			city,
			state,
			payment_method: 'cash_on_delivery',
			payment_status: 'pending',
			status: 'Processing',
		});

		if (error) {
			console.error('Order error:', error);
			alert('Something went wrong. Please try again.');
			setLoading(false);
			return;
		}

		await clearCart();
		navigate('/order-success');
	};

	return (
		<div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[50vh] border-t'>
			<div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
				<div className='text-xl sm:text-2xl my-3'>
					<Title text1={'DELIVERY'} text2={'INFORMATION'} />
				</div>
				<div className='flex gap-3'>
					<input
						name='firstName'
						value={form.firstName}
						onChange={handleChange}
						type='text'
						placeholder='First name'
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
					/>
					<input
						name='lastName'
						value={form.lastName}
						onChange={handleChange}
						type='text'
						placeholder='Last name'
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
					/>
				</div>
				<input
					name='email'
					value={form.email}
					onChange={handleChange}
					type='email'
					placeholder='Email address'
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
				/>
				<input
					name='phone'
					value={form.phone}
					onChange={handleChange}
					type='tel'
					placeholder='Phone number'
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
				/>
				<input
					name='address'
					value={form.address}
					onChange={handleChange}
					type='text'
					placeholder='Street address'
					className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
				/>
				<div className='flex gap-3'>
					<input
						name='city'
						value={form.city}
						onChange={handleChange}
						type='text'
						placeholder='City'
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
					/>
					<input
						name='state'
						value={form.state}
						onChange={handleChange}
						type='text'
						placeholder='State'
						className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
					/>
				</div>
			</div>
			<div className='mt-8'>
				<div className='mt-8 min-w-80'>
					<CartTotal />
				</div>
				<div className='mt-12'>
					<Title text1={'PAYMENT'} text2={'METHOD'} />
					<div className='flex items-center gap-3 border border-green-500 p-3 px-4 w-fit'>
						<p className='min-w-3.5 h-3.5 border rounded-full bg-green-400'></p>
						<p className='text-gray-600 text-sm font-medium'>
							CASH ON DELIVERY
						</p>
					</div>
					<p className='text-xs text-gray-400 mt-2'>
						Pay when your order arrives at your doorstep.
					</p>
					<div className='w-full text-end mt-8'>
						<button
							onClick={handlePlaceOrder}
							disabled={loading}
							className='bg-orange-500 text-white px-16 py-3 text-sm disabled:opacity-50 hover:bg-orange-600 transition-all duration-300'
						>
							{loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrder;
