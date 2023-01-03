import React from 'react';
import { Link } from 'react-router-dom';

//import data
import { newsletter } from '../../data';

const Newsletter = () => {
  const {title, subtitle, placeholder, buttonText} = newsletter;
  return (
  <section className='section bg-newsletter min-h-[490px]'>
      <div className='container mx-auto flex justify-center lg:justify-end'>
        <div className='w-full max-w[558px] text-center text-white lg:text-left'> 
          <h2 className='text-4xl font-semibold max-w-[350px] mx-auto lg:mx-0 mb-5 leading-normal'>{title}</h2>
          <p className='text-xl font-light mb-10'>{subtitle}</p>
          <div className='flex flex-col lg:flex-row gap-[22px]'>
            <input value="Email" className='h-[60px] px-6 outline-none placeholder:text-gray-400 text-gray-600
            rounded lg:flex-1'placeholder={placeholder} type='text' />
            <Link to='/products'>
            <button className='bg-primary h-[60px] hover::bg-slate-900 px-7 rounded-lg font-medium
            text-xl transition'>{buttonText}</button></Link>
            </div> 
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
