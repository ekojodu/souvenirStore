import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { products } from '../assets/assets';
export const ShopContext = createContext();
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShopContextProvider = (props) => {
	const currency = '₦';
	const deliveryFee = 1500;
	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [cart, setCart] = useState({});
	const navigate = useNavigate();

	const addToCart = async (itemId, size) => {
		if (!size) {
			toast.error('Please select an option');
			return;
		}
		let cartData = structuredClone(cart);
		if (cartData[itemId]) {
			if (cartData[itemId][size]) {
				cartData[itemId][size] += 1;
			} else {
				cartData[itemId][size] = 1;
			}
		} else {
			cartData[itemId] = {};
			cartData[itemId][size] = 1;
		}

		setCart(cartData);
		toast.success('Item added to cart');
	};

	const cartCount = () => {
		let finalCount = 0;
		for (const items in cart) {
			for (const item in cart[items]) {
				try {
					if (cart[items][item] > 0) {
						finalCount += cart[items][item];
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		return finalCount;
	};

	const updateQuantity = async (itemId, size, quantity) => {
		let cartData = structuredClone(cart);
		if (cartData[itemId] && cartData[itemId][size]) {
			cartData[itemId][size] = quantity;
		}
		setCart(cartData);
	};

	const removeFromCart = async (itemId, size) => {
		let cartData = structuredClone(cart);
		if (cartData[itemId]) {
			delete cartData[itemId][size];
			if (Object.keys(cartData[itemId]).length === 0) {
				delete cartData[itemId];
			}
		}
		setCart(cartData);
	};

	const calculateCartAmount = () => {
		let totalAmount = 0;
		for (const items in cart) {
			let iteminfo = products.find((product) => product._id === items);
			for (const item in cart[items]) {
				if (cart[items][item] > 0) {
					try {
						totalAmount += iteminfo.price * cart[items][item];
					} catch (error) {
						console.log(error);
					}
				}
			}
		}
		return totalAmount;
	};

	const value = {
		products,
		currency,
		deliveryFee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		addToCart,
		cart,
		cartCount,
		updateQuantity,
		removeFromCart,
		calculateCartAmount,
		navigate,
	};

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	);
};

ShopContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
