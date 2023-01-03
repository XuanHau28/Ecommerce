import React from 'react';
import { Link } from 'react-router-dom';

//import swiper from react components


//import swiper style
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../slider.css';

//import required modules


//import icons
import { Rating } from '@material-ui/lab';


const ProductCard =  ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  };

  return (
              <Link to={`/product/${product._id}`}>
                <div className='flex flex-wrap'>
              <div className='w-[170px] lg:w-[200px] flex-wrap mx-auto flex flex-col justify-items-stretch items-baseline transition-all max-w-[290px] text-left mb-9'>
                <div className='border hover:border-accent rounded-[18px] w-[14vmax+1px] flex flex-start justify-center mb-[15px] relative transition'>
                  <img className='min-w-[14vmax] max-h-[490px] lg:min-h-[360px] rounded-[18px]' src={product.images[0].url} alt={product.name}/>

                </div>
                <div className='font-semibold lg:text-xl ml-2'>
                 {product.name}
                </div>
                <div className='ml-2'>
                  <Rating {...options}/> <span className="block font-light text-[1.5vmax] md:text-[1vmax]">({product.numOfReviews} reviews)</span>
                  <div>{`$${product.price}`}</div>
                </div>
              </div>
              </div>
              </Link>
);
};

export default ProductCard;
