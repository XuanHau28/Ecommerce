import React, {Fragment, useEffect} from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch } from "react-redux";
import { useAlert} from 'react-alert';
import { Link } from 'react-router-dom';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { newInStore } from '../../data';

const NewItemsSlider = ({ product }) => {
  const alert = useAlert();
  //use dispatch
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector((state) => state.products);
    
  useEffect(() => {
   if(error) {
   alert.error(error);
     dispatch(clearErrors());
 }
    dispatch(getProduct());
  }, [dispatch, error, alert])
  return <Swiper grabCursor={true} breakpoints={{
    320: {
      slidesPerView: 2,
      spaceBetween: 18
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }}>
      {products && products.map((product, index) =>
            <SwiperSlide className='max-w-[300px]' key={index}>
              <div className='w-[170px] lg:w-[220px] flex-wrap mx-auto flex flex-col justify-items-stretch items-baseline transition-all max-w-[290px] text-left min-h-[20vw]'>
                <div className='border hover:border-accent rounded-[18px] w-[14vmax+1px] flex flex-start justify-center relative transition'>
              <Link to={`/product/${product._id}`}>

            <div className='relative'>
              <img className='min-w-[14vmax] max-h-[490px] lg:min-h-[360px] rounded-[18px]' src={product.images[0].url} alt={product.name}/>
              <div className='absolute text-white bottom-[20px] w-full text-center text-[1.2vmax] lg:text-0.5vmax
               font-medium capitalize'>{product.name}</div>
            </div>

            </Link>
            </div>
            </div>
          </SwiperSlide>
      ).slice(4,8).reverse()}

  </Swiper>;
};

export default NewItemsSlider;
