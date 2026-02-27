import { assets } from '../assets/assets';

const Footer = () => {
	return (
		<div>
			<div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-10 mt-40 text-lg'>
				<div>
					<img src={assets.logo} className='mb-5 w-32' alt='Labod Store' />
					<p className='w-full md:w-2/3 text-gray-600'>
						Labod Souvenirs brings you authentic, handcrafted Nigerian keepsakes — from Benin bronzes to Ankara prints. Every piece carries the soul of its maker.
					</p>
				</div>
				<div>
					<p className='text-xl font-medium mb-5'>COMPANY</p>
					<ul className='flex flex-col gap-1 text-gray-600'>
						<li className='cursor-pointer hover:text-black'>Home</li>
						<li className='cursor-pointer hover:text-black'>About Us</li>
						<li className='cursor-pointer hover:text-black'>Collection</li>
						<li className='cursor-pointer hover:text-black'>Privacy Policy</li>
					</ul>
				</div>
				
				<div>
					<p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
						<li>+234-701-105-4708</li>
						<li>hello@labodstore.com</li>
						<li>10110, Beside UBA, Kabba, Kogi State</li>
					</ul>
				</div>
			</div>
           <div>
            <hr />
            <p className='py-5 text-lg text-center'>Copyright 2025 &copy; Labod Souvenirs — All Rights Reserved</p>
           </div>
		</div>
	);
};

export default Footer;
