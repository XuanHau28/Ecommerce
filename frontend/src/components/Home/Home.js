import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layout/MetaData';

import {hero} from '../../data';

//import components 
import Stats from '../Home/Stats';
import Features from '../Home/Features';
import NewItems from '../Home/NewItems';
import FeaturesSecond from '../Home/FeaturesSecond';
import Product from './Product';
import Testimonial from './Testimonial';
import Newsletter from './Newsletter';

function Home() {
 
    const {title, subtitle, buttonText} = hero;
    return( 
        <Fragment>
          <MetaData title="AmadoShop" />
        <section className='h-[850px] w-full bg-hero bg-right bg-cover bg-no-repeat text-white pt-[225px] pb-[254px] relative mb-12 lg:bg-center lg:mb-28 '>
        <div className='container mx-auto text-center'>
       {/* title */}
        <h1 className='mx-auto text-2xl font-semibold mb-[30px] lg:text-[64px]
        lg:leading-tight lg:max-w-[888px]'>{title}</h1>
        <h2 className='mb-[30px] max-w-[627px] mx-auto lg:mb-[65px] lg:text-xl'>{subtitle}</h2>
        <button className='bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.5)] px-[35px] py-[9px] mb-[160px] text-xl
        rounded-md backdrop-blur-md transition lg:px-[80px] lg:py-[16px] lg:mb-[194px]'>{buttonText}</button>
        {/* stats */}
      <div>
        <Stats />
      </div>
        </div>
      </section>
      {/* Features */}
      <div>
        <Features />
      </div>
      {/* NewItems */}
      <div>
        <NewItems />
      </div>
      {/* Features Second */}
      <div>
        <FeaturesSecond />
      </div>
      {/* Product */}
      <div>
        <Product />
      </div>
      {/* Testimonial */}
      <div>
      <Testimonial />
      </div>
      {/* NewsLetter */}
      <div>
      <Newsletter />
      </div>
      </Fragment>
  );
};

export default Home