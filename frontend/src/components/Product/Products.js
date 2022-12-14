import React, {Fragment, useEffect} from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch } from "react-redux";
import { useAlert} from 'react-alert';

//import component
import Loader from '../Loader/Loader';
import ProductCard from '../Home/ProductCard';

const Products = () => {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount} = useSelector(
    (state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  },[dispatch])

  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <div className='pt-[110px]'>
          <h2 className='my-[2vmax] mx-auto w-[20vw] border-b border-b-[rgba(0,0,0,0.171)] p-[2vmax] text-[rgba(0,0,0,0.678)]
          font-medium lg:text-[1.5vmax] text-sm text-center'>PRODUCTS</h2>
          <div className='grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 mx-auto lg:px-28 px-10'>
            {products &&
            products.map((product) => (
              <ProductCard  key={product._id} product={product} />
            ))}
        </div>
        </div>
      )}
    </Fragment>
  )
}

export default Products;