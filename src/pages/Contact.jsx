import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
	return (
		<div>
			<div className='text-center text-2xl pt-10 border-t'>
				<Title text1={'CONTACT'} text2={'US'} />
			</div>
			<div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
				<img
					className='w-full md:max-w-[480px]'
					src={assets.contact_img}
					alt='Contact us'
				/>
				<div className='flex flex-col justify-center gap-6'>
					<p className='font-semibold text-xl text-gray-600'>Our Store</p>
					<p className='text-gray-500'>
						10110, Beside UBA <br /> Kabba, Kogi State, Nigeria
					</p>
					<p className='text-gray-500'>
						Tel: +234-701-105-4708 <br />
						Email: hello@labodstore.com
					</p>
					<p className='font-semibold text-xl text-gray-600'>
						Work With Us
					</p>
					<p className='text-gray-500'>
						Are you an artisan or craftsperson? We would love to feature your work. Reach out to explore how we can partner together.
					</p>
					<a href='mailto:hello@labodstore.com'>
						<button className='border border-black px-8 py-4 text-sm hover:bg-orange-500 hover:text-white transition-all duration-500'>
							Get In Touch
						</button>
					</a>
				</div>
			</div>
      		<NewsLetterBox />
		</div>
	);
};

export default Contact;
