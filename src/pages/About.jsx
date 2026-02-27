import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
	return (
		<div>
			<div className='text-2xl text-center pt-8 border-t'>
				<Title text1={'ABOUT'} text2={'US'} />
			</div>
			<div className='my-10 flex flex-col md:flex-row gap-16'>
				<img
					className='w-full md:max-w-[450px]'
					src={assets.about_img}
					alt='Our artisans at work'
				/>
				<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
					<p>
						Labod Souvenirs was born from a deep love for Nigerian culture and a desire to share it with the world. We work directly with skilled artisans from communities across Nigeria — from bronze casters in Benin City, to Adire dyers in Abeokuta, to raffia weavers in the North.
					</p>
					<p>
						Every product in our store is handmade, authentic, and sourced responsibly. We believe in fair trade — our artisans are paid fairly for their skill, and we are transparent about where every piece comes from. When you buy from us, you are not just buying a souvenir; you are supporting a family, a craft, and a culture.
					</p>
					<b className='text-gray-800'>OUR MISSION</b>
					<p>
						To celebrate Nigerian heritage by connecting the world with authentic, handcrafted souvenirs — preserving traditional artistry for future generations while creating sustainable livelihoods for the artisans who keep these traditions alive.
					</p>
				</div>
			</div>
			<div className='text-xl py-4'>
				<Title text1={'WHY'} text2={'CHOOSE US'} />
			</div>
			<div className='flex flex-col md:flex-row text-sm mb-20'>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Authenticity Guaranteed</b>
					<p className='text-gray-600'>
						Every product is handmade by verified artisans using traditional techniques. We never stock mass-produced imitations. Each item comes with information about the artisan and region it originates from.
					</p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Fair Trade Sourcing</b>
					<p className='text-gray-600'>
						We pay our artisan partners fairly and on time. Our sourcing model ensures that a meaningful portion of every sale goes directly to the craftsperson who made your item — no middlemen, no exploitation.
					</p>
				</div>
				<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
					<b>Exceptional Customer Service</b>
					<p className='text-gray-600'>
						Our team is available 7 days a week to answer your questions, assist with orders, and help you find the perfect piece. We take pride in making every customer experience smooth and memorable.
					</p>
				</div>
			</div>
			<NewsLetterBox />
		</div>
	);
};

export default About;
