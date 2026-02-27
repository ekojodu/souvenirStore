import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
	const { setShowSearch, cartCount, user, logout } = useContext(ShopContext);
	const [visible, setVisible] = useState(false);

	return (
		<div className='flex items-center justify-between py-5 font-medium'>
			<Link to='/'>
				<img src={assets.logo} className='w-36' alt='Logo' />
			</Link>
			<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
				<NavLink to='/' className='flex flex-col items-center gap-1'>
					<p>HOME</p>
					<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/about' className='flex flex-col items-center gap-1'>
					<p>ABOUT</p>
					<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/collection' className='flex flex-col items-center gap-1'>
					<p>SHOP</p>
					<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
				<NavLink to='/contact' className='flex flex-col items-center gap-1'>
					<p>CONTACT</p>
					<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
				</NavLink>
			</ul>

			<div className='flex items-center gap-6'>
				<img
					onClick={() => setShowSearch(true)}
					src={assets.search_icon}
					alt='Search'
					className='w-5 cursor-pointer'
				/>

				<div className='group relative'>
					<img
						src={assets.profile_icon}
						alt='Profile'
						className='w-5 cursor-pointer'
					/>
					<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
						<div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md'>
							{user ? (
								<>
									<p className='text-xs text-gray-400 truncate'>
										{user.user_metadata?.full_name || user.email}
									</p>
									<hr />
									<Link
										to='/orders'
										className='cursor-pointer hover:text-black'
									>
										My Orders
									</Link>
									<p
										onClick={logout}
										className='cursor-pointer hover:text-black'
									>
										Logout
									</p>
								</>
							) : (
								<>
									<Link to='/login' className='cursor-pointer hover:text-black'>
										Login
									</Link>
									<Link to='/login' className='cursor-pointer hover:text-black'>
										Create Account
									</Link>
								</>
							)}
						</div>
					</div>
				</div>

				<Link to='/cart' className='relative'>
					<img
						src={assets.cart_icon}
						alt='Cart'
						className='w-5 cursor-pointer'
					/>
					<p className='absolute right-[-3px] top-[9px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
						{cartCount()}
					</p>
				</Link>

				<img
					onClick={() => setVisible(true)}
					src={assets.menu_icon}
					alt=''
					className='w-5 cursor-pointer sm:hidden'
				/>
			</div>

			{/* Mobile sidebar */}
			<div
				className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}
			>
				<div className='flex flex-col text-gray-600'>
					<div
						onClick={() => setVisible(false)}
						className='flex items-center gap-4 p-3 cursor-pointer'
					>
						<img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
						<p>Back</p>
					</div>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-4 pl-6 border'
						to='/'
					>
						HOME
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-4 pl-6 border'
						to='/about'
					>
						ABOUT
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-4 pl-6 border'
						to='/collection'
					>
						SHOP
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className='py-4 pl-6 border'
						to='/contact'
					>
						CONTACT
					</NavLink>
					{user ? (
						<>
							<NavLink
								onClick={() => setVisible(false)}
								className='py-4 pl-6 border'
								to='/orders'
							>
								MY ORDERS
							</NavLink>
							<p
								onClick={() => {
									logout();
									setVisible(false);
								}}
								className='py-4 pl-6 border cursor-pointer'
							>
								LOGOUT
							</p>
						</>
					) : (
						<NavLink
							onClick={() => setVisible(false)}
							className='py-4 pl-6 border'
							to='/login'
						>
							LOGIN
						</NavLink>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
