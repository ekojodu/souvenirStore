import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { products } from '../assets/assets';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const getGuestId = () => {
	let guestId = localStorage.getItem('guest_id');
	if (!guestId) {
		guestId = crypto.randomUUID();
		localStorage.setItem('guest_id', guestId);
	}
	return guestId;
};

const ShopContextProvider = (props) => {
	const currency = '₦';
	const deliveryFee = 1500;
	const [cart, setCart] = useState({});
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	// The active ID used for cart — real user ID if logged in, guest ID if not
	const getActiveId = (currentUser) => {
		return currentUser?.id || getGuestId();
	};

	// Load cart from Supabase for a given ID
	const loadCart = async (id) => {
		const { data, error } = await supabase
			.from('carts')
			.select('*')
			.eq('guest_id', id);

		if (error) {
			console.error('Error loading cart:', error);
			return;
		}

		const rebuilt = {};
		data.forEach(({ product_id, option, quantity }) => {
			if (!rebuilt[product_id]) rebuilt[product_id] = {};
			rebuilt[product_id][option] = quantity;
		});
		setCart(rebuilt);
	};

	// When user logs in, merge their guest cart into their account
	const mergeGuestCart = async (userId) => {
		const guestId = localStorage.getItem('guest_id');
		if (!guestId) return;

		const { data: guestItems } = await supabase
			.from('carts')
			.select('*')
			.eq('guest_id', guestId);

		if (guestItems && guestItems.length > 0) {
			// Upsert each guest item into the user's cart
			const mergedItems = guestItems.map(
				({ product_id, option, quantity }) => ({
					guest_id: userId,
					product_id,
					option,
					quantity,
				}),
			);

			await supabase
				.from('carts')
				.upsert(mergedItems, { onConflict: 'guest_id,product_id,option' });

			// Delete the guest cart
			await supabase.from('carts').delete().eq('guest_id', guestId);
			localStorage.removeItem('guest_id');
		}
	};

	// Listen for auth state changes
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			const currentUser = session?.user || null;
			setUser(currentUser);
			loadCart(getActiveId(currentUser));
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			const currentUser = session?.user || null;
			setUser(currentUser);

			if (event === 'SIGNED_IN') {
				await mergeGuestCart(currentUser.id);
				await loadCart(currentUser.id);
			}

			if (event === 'SIGNED_OUT') {
				setCart({});
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	const syncCartItem = async (productId, option, quantity) => {
		const activeId = getActiveId(user);
		if (quantity <= 0) {
			await supabase
				.from('carts')
				.delete()
				.eq('guest_id', activeId)
				.eq('product_id', productId)
				.eq('option', option);
		} else {
			await supabase
				.from('carts')
				.upsert(
					{ guest_id: activeId, product_id: productId, option, quantity },
					{ onConflict: 'guest_id,product_id,option' },
				);
		}
	};

	const addToCart = async (itemId, option) => {
		if (!option) {
			toast.error('Please select an option');
			return;
		}
		const cartData = structuredClone(cart);
		if (!cartData[itemId]) cartData[itemId] = {};
		cartData[itemId][option] = (cartData[itemId][option] || 0) + 1;
		setCart(cartData);
		await syncCartItem(itemId, option, cartData[itemId][option]);
		toast.success('Item added to cart');
	};

	const updateQuantity = async (itemId, option, quantity) => {
		const cartData = structuredClone(cart);
		if (quantity <= 0) {
			delete cartData[itemId][option];
			if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
		} else {
			if (!cartData[itemId]) cartData[itemId] = {};
			cartData[itemId][option] = quantity;
		}
		setCart(cartData);
		await syncCartItem(itemId, option, quantity);
	};

	const removeFromCart = async (itemId, option) => {
		const cartData = structuredClone(cart);
		if (cartData[itemId]) {
			delete cartData[itemId][option];
			if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
		}
		setCart(cartData);
		await syncCartItem(itemId, option, 0);
	};

	const clearCart = async () => {
		const activeId = getActiveId(user);
		setCart({});
		await supabase.from('carts').delete().eq('guest_id', activeId);
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setCart({});
		navigate('/');
	};

	const cartCount = () => {
		let count = 0;
		for (const items in cart)
			for (const item in cart[items])
				if (cart[items][item] > 0) count += cart[items][item];
		return count;
	};

	const calculateCartAmount = () => {
		let total = 0;
		for (const itemId in cart) {
			const product = products.find((p) => p._id === itemId);
			if (!product) continue;
			for (const option in cart[itemId])
				if (cart[itemId][option] > 0)
					total += product.price * cart[itemId][option];
		}
		return total;
	};

	const getCartItems = () => {
		const items = [];
		for (const itemId in cart) {
			const product = products.find((p) => p._id === itemId);
			if (!product) continue;
			for (const option in cart[itemId])
				if (cart[itemId][option] > 0)
					items.push({
						product_id: itemId,
						name: product.name,
						image: product.image[0],
						price: product.price,
						option,
						quantity: cart[itemId][option],
					});
		}
		return items;
	};

	const value = {
		products,
		currency,
		deliveryFee,
		user,
		logout,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cart,
		addToCart,
		updateQuantity,
		removeFromCart,
		clearCart,
		cartCount,
		calculateCartAmount,
		getCartItems,
		navigate,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

ShopContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default ShopContextProvider;
