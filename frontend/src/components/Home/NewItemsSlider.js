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
            <SwiperSlide className='max-w-[265px]' key={index}>
              <Link to={`/product/${product._id}`}>

            <div className='relative'>
              <img src={product.images[0].url} alt={product.name}/>
              <div className='absolute text-white bottom-[20px] w-full text-center text-[18px] lg:text-2xl
               font-medium capitalize'>{product.name}</div>
            </div>
            </Link>
          </SwiperSlide>
      ).reverse()}

  </Swiper>;
};

export default NewItemsSlider;
