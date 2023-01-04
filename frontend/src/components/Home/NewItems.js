import React, {Fragment, useEffect} from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch } from "react-redux";
import { useAlert} from 'react-alert';
import { Link } from 'react-router-dom';


// import data
import { newInStore } from '../../data';

// import components
import NewItemsSlider from '../Home/NewItemsSlider';

const NewItems = () => {
  const { title, subtitle, link, icon } = newInStore;

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
  return (
    <section className='section relative overflow-hidden lg:min-h-[540px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          {/* text */}
          <div className='flex md:flex-col items-baseline gap-x-6 mb-6 lg:mb-0'>
            <h2 className='title max-w-[245px] lg:mt-[30px] lg:mb-[90px]'>
              {title}
            </h2>
            <p className='max-w-[245px] lg:mb-12'>{subtitle}</p>
            <div className='hidden lg:flex items-center'>
              <Link to='/products'
                className='hover:border-b border-primary lg:items-center font-medium transition-all'
                href='#'
              >
               New In Store
              </Link>
              <div className='text-3xl'>{icon}</div>
            </div>
          </div>
          {/* product slider */}
          <div className='lg:max-w-[800px] xl:max-w-[990px] lg:absolute lg:right-5'>
            <NewItemsSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;