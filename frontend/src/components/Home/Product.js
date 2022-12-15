import React, {Fragment, useEffect} from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch } from "react-redux";
import { useAlert} from 'react-alert'



//import component
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';

// import data
import { productsData } from '../../data';


const Product = ({ product }) => {
  const { title, subtitle } = productsData;

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
    <Fragment>
      {loading ? (<Loader />) : (<section className='section text-center'>
      <div className='container mx-auto'>
        <div>
          <h2 className='title'>{title}</h2>
          <p className='max-w-[639px] mx-auto mb-[50px] lg:mb-[70px]'>
            {subtitle}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]'>
        {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </section>)}
    
    </Fragment>
  );

};

export default Product;
