import { useContext, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
	// const { productId } = useParams();
	const { products, currency, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(false);
	const [image, setImage] = useState('');
	const [size, setSize] = useState('');
	const [activeTab, setActiveTab] = useState('description');

	const { productName } = useParams();

	const fetchProductData = useCallback(() => {
		products.map((item) => {
			if (item.name.replace(/\s+/g, '-').toLowerCase() === productName) {
				setProductData(item);
				setImage(item.image[0]);
			}
		});
	}, [productName, products]);

	useEffect(() => {
		fetchProductData();
	}, [fetchProductData]);

	return productData ? (
		<div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
			<div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
				<div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
					<div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
						{productData.image.map((item, index) => (
							<img
								onClick={() => setImage(item)}
								src={item}
								key={index}
								className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
								alt=''
							/>
						))}
					</div>
					<div className='w-full sm:w-[80%]'>
						<img src={image} className='w-full h-auto' alt={productData.name} />
					</div>
				</div>

				<div className='flex-1'>
					<h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
					<div className='flex items-center gap-1 mt-2'>
						<img src={assets.star_icon} alt='' className='w-3 5' />
						<img src={assets.star_icon} alt='' className='w-3 5' />
						<img src={assets.star_icon} alt='' className='w-3 5' />
						<img src={assets.star_icon} alt='' className='w-3 5' />
						<img src={assets.star_dull_icon} alt='' className='w-3 5' />
						<p className='pl-2'>(84)</p>
					</div>
					<p className='mt-5 text-3xl font-medium'>
						{currency}
						{productData.price.toLocaleString()}
					</p>
					<p className='mt-5 text-gray-500 md:w-4/5'>
						{productData.description}
					</p>
					<div className='flex flex-col gap-4 my-8'>
						<p>Select Option</p>
						<div className='flex flex-wrap gap-2'>
							{productData.sizes.map((item, index) => (
								<button
									onClick={() => setSize(item)}
									className={`border py-2 px-4 bg-gray-100 ${
										item === size ? 'border-orange-500' : ''
									}`}
									key={index}
								>
									{item}
								</button>
							))}
						</div>
					</div>
					<button
						onClick={() => addToCart(productData._id, size)}
						className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
					>
						ADD TO CART
					</button>
					<hr className='mt-8 sm:w-4/5' />
					<div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
						<p>✓ &nbsp;100% Authentic, Handcrafted Product</p>
						<p>✓ &nbsp;Nationwide delivery available</p>
						<p>✓ &nbsp;Easy exchange policy within 14 days</p>
					</div>
				</div>
			</div>

			<div className='mt-20'>
				<div className='flex'>
					<b
						onClick={() => setActiveTab('description')}
						className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
					>
						Description
					</b>
					<p
						onClick={() => setActiveTab('reviews')}
						className={`border px-5 py-3 text-sm cursor-pointer ${activeTab === 'reviews' ? 'bg-gray-100' : ''}`}
					>
						Reviews (84)
					</p>
				</div>
				<div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-700'>
					{activeTab === 'description' ? (
						<>
							<p>{productData.description}</p>
							<p>
								Each item is carefully inspected for quality before dispatch.
								Handcrafted products may have slight natural variations — these
								are not defects, but a mark of authentic craftsmanship.
							</p>
						</>
					) : (
						<p className='text-gray-500 italic'>
							Customer reviews are coming soon. Be the first to review this
							product!
						</p>
					)}
				</div>
			</div>

			<RelatedProducts
				category={productData.category}
				subCategory={productData.subCategory}
			/>
		</div>
	) : (
		<div className='opacity-0'></div>
	);
};

export default Product;
