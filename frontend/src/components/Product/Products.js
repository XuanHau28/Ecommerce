import React, {Fragment, useEffect, useState} from 'react';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch } from "react-redux";
import { useAlert} from 'react-alert';
import  Pagination  from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import  Typography from '@material-ui/core/Typography';
import MetaData from '../Layout/MetaData';

//import component
import Loader from '../Loader/Loader';
import ProductCard from '../Home/ProductCard';

const Products = ({ match }) => {

  const categories = [
    "Sofas",
    "Armchairs",
    "Beds",
    "Cushions",
    "Tables",
    "Highboards",
    "Wall cabinets",
    "TV cabinets",
    "Outdoor lighting",
    "Kids bedroom"
  ]

  const alert = useAlert();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 25000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);


  const { 
    products, 
    loading, 
    error, 
    productsCount, 
    resultPerPage,  
    filteredProductsCount} = useSelector(
    (state) => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
    };
  
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  },[dispatch,keyword, currentPage, price, category, ratings, alert, error]);

  let count =  filteredProductsCount;



  return (
    <Fragment>
      {loading ? (<Loader />) : (
        //ALl Products
        <Fragment>
          <MetaData title="PRODUCT -- AmadoShop"/>
        <div className='pt-[110px] min-h-[10vh]'>
          <h2 className='my-[2vmax] mx-auto w-[20vw] border-b border-b-[rgba(0,0,0,0.171)] p-[2vmax] text-[rgba(0,0,0,0.678)]
          font-medium lg:text-[1.5vmax] text-sm text-center'>PRODUCTS</h2>
          <div className='grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 mx-auto pl-[5rem] lg:pl-[10rem] pr-[6rem] min-h-[95vh]'>
            {products &&
            products.map((product) => (
              <ProductCard  key={product._id} product={product} />
            )).reverse()}
          </div>


          {/* Filter Price */}
         <div className='w-[45vmax] static m-auto
         lg:w-[12vmax] lg:absolute lg:top-[229px] lg:left-px-[0vmax] lg:pl-16'>
         <Typography>Price</Typography>
         <Slider 
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby='range-slider'
          min={0}
          max={25000}
         />

            {/* Categories */}
            <Typography
          className='font-normal text-center lg:text-left'>Categories</Typography>
          <ul className='lg:pl-0 mb-5 lg:ml-0 ml-[37%]'>
            {categories.map((category) => (
              <li 
              className='font-normal text-[rgba(0,0,0,0.61)] m-[0.4vmax] cursor-pointer transition-all hover:text-[#064d57] hover:font-medium'
              key={category}
              onClick={() => setCategory(category)}>
                {category}
              </li>
            ))}
          </ul>

          {/* Filter Ratings */}
          <fieldset
           className='border border-[rgba(0,0,0,0.329)] px-4 lg:w-40 w-[90%] lg:ml-[-30px] md:mr-[20vw] mx-auto'>
            <Typography component="legend" className='text-center'>Ratings Above</Typography>
            <Slider 
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
            valueLabelDisplay="auto"/>
          </fieldset>
         </div>

              {/* Pagination */}
              { resultPerPage < count && (
                 <div className='flex justify-center m-[6vmax]'>
                 <Pagination 
                 className='pagination'
                 activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
               </div>) }
     
        </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products;