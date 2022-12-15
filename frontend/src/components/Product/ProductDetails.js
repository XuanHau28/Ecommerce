import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import ReactStarts from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../Loader/Loader';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData';



const ProductDetails = ({ match }) => {

  const dispatch = useDispatch();

  const alert = useAlert();
  
  const {product, loading, error}  = useSelector((state) => state.productDetails);


  useEffect(() => {
    if(error) {
    alert.error(error);
    dispatch(clearErrors());
  }
    dispatch(getProductDetails(match.params.id));
  },[dispatch, match.params.id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  }

  return (
    <Fragment>
    {loading ? (<Loader />) : (
      <div>
          <MetaData title={`${product.name} -- AmadoShop`}/>
              <div className='container w-[100vw] max-w-[100%] h-[unset] flex flex-col p-[6vw] box-border lg:flex-row bg-[rgba(255,255,255)] pt-[145px]'>
        <div className='w-[100%]  flex flex-col justify-evenly items-center p-[2vw] box-border border boder-solid border-white'>
            <Carousel>
              {product.images && 
              product.images.map((item, i) => (
                <img
                  className='w-[360px]'
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}/>
              ))}
            </Carousel>
        </div>

        <div className='w-[100%] flex flex-col items-center lg:items-start p-[2vw] box-border border boder-solid border-white justify-evenly'>
          {/* Deatails Block 1 */}
          <div className='lg:mb-1'>
              <h2 className='text-[rgba(54,54,54)] font-semibold text-2xl text-center lg:text-left lg:text-3xl mb-2 lg:mb-2'>{product.name}</h2>
              <p className='text-[rgba(54,54,54,0.584)] text-center font-extralight text-xs lg:text-xl'>Product # {product._id}</p>
          </div>
          {/* Detail Block 2 */}
          <div className='flex justify-center lg:justify-start items-center border-y border-[rgba(0,0,0,0.205)] w-[70%] py-1'>
              <ReactStarts {...options} />
              <span className='text-[rgba(54,54,54,0.584)] font-extralight text-l lg:text-xl'>({product.numOfReviews} Reviews)</span>
          </div>
          {/* Detail Block 3 */}
          <div className='w-[70%]'>
            <h1 className='text-[rgba(17,17,17,0.795)] font-bold lg:font-normal text-center lg:text-left text-2xl lg:text-xl my-5'>{`$${product.price}`}</h1>
            {/* Detail Block 3-1 */}
            <div className='flex items-center flex-col lg:flex-row'>
              {/* Detail Block 3-1-1 */}
              <div className='py-5 lg:py-0 '>
                <button className='border-0 bg-[rgba(0,0,0,0.616)] p-1 w-[4vmax] lg:w-[1.75rem] lg:p-2 cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]'>-</button>
                <input className='border-0 p-2 lg:p-3 w-10 text-center outline-none font-normal text-sm text-[rbga(0,0,0,0.74)]' value='1' type="number"/>
                <button className='border-0 bg-[rgba(0,0,0,0.616)]  p-1 w-[4vmax] lg:w-[1.75rem] lg:p-2 cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]'>+</button>
              </div>{" "}
              <button className='border-0 cursor-pointer text-white transition-all bg-red-400 hover:bg-[rgba(214,84,61)] font-medium text-xs rounded-[20px] 
            lg:px-0 lg:py-2 lg:m-4 lg:ml-10 p-[1.5vmax] w-[20vmax] lg:w-[8vmax] my-[3vmax] outline-none'>Add To Cart</button>
            </div>

            <p className='border-y border-y-[rgba(0,0,0,0.205)] py-[2.5vmax] lg:text-left  text-center lg:py-4 text-[rgba(0,0,0,0.651)] font-normal text-base my-4'>
              Status:{" "}
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          {/* Detail Block 4 */}
              <div className='text-[rgba(0,0,0,0.897)] font-medium text-sm'>
                <p className='text-xl'>Description :</p> <p className='text-[rgba(0,0,0,0.897)] font-light text-sm'>{product.description}</p>
              </div>
              
              <button className='border-none bg-red-400 font-medium text-xs rounded-[20px] py-[12px] px-9 lg:py-3 lg:px-8 my-4 text-white cursor-pointer transition-all outline-none
              hover:bg-[rgba(197,68,45)] hover:scale-110'>Submit Review</button>
        </div>
      </div>

                <h3 className='text-[#000000be] font-medium text-base lg:text-xl border-b border-b-[rgba(0,0,0,0.226)] p-4 w-[20vmax] m-auto
                mb-[4vmax] text-center'>REVIEWS</h3>

                {product.reviews && product.reviews[0] ? (
                  <div className='flex overflow-auto'>
                    {product.reviews && 
                    product.reviews.map((review, index) =>  <ReviewCard review={review} />)}
                  </div>
                ) : (
                  <p className='font-normal text-lg text-center text-[rgba(0,0,0,0.548)] pb-10'>No Reviews Yet</p>
                )
                }
      </div>
    )}
    </Fragment>
  )
}

export default ProductDetails;