import React, { Fragment } from 'react';
import CartItemCard from './CardItemCard.js';
import { useSelector, useDispatch } from 'react-redux';
import {addItemsToCart, removeItemsFromCart} from '../../actions/cartAction';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Cart = ({ history }) => {

  const dispatch = useDispatch();

  const {cartItems} = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };


  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  }

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <Fragment>
      { cartItems.length === 0 ? (
        <div className='emptyCart p-[20vmax] h-[50vh] flex m-auto flex-col justify-center items-center text-center'>
          <RemoveShoppingCartIcon 
          className='text-[5vmax] text-[rgba(40,110,80)]'/>
        <Typography className='text-[5vmax]'>No Product In Your Cart</Typography>
        <Link 
        className='bg-[rgba(25,25,25)] text-white font-normal cursor-pointer p-[1vmax_3vmax]'
        to='/products'>View Products</Link>
        </div>
      ): (
        <Fragment>
        <div className='cartPage pt-[104px] lg:pt-[170px] lg:p-[5vmax] mb-[150px] min-h-[60vh]'>
            <div className='cartHeader bg-[rgba(40,110,80)] w-[100% ] lg:w-[90%] box-border m-auto text-white grid grid-cols-[3fr_1fr_1fr] lg:grid-cols-[4fr_1fr_1fr]
            font-light text-[1.9vmax] lg:text-[1vmax]'>
                <p className='m-[10px]'>Product</p>
                <p className='m-[10px]'>Quantity</p>
                <p className='m-[10px] text-end'>Subtotal</p>
            </div>

            { cartItems && cartItems.map((item) => (
                     <div className='cartContainer w-[100%] lg:w-[90%] m-auto grid grid-cols-[3fr_1fr_1fr] lg:grid-cols-[4fr_1fr_1fr]' 
                     key={item.product}>
                     <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                     <div className='flex items-center h-[20vmax] lg:h-[8vmax]'> 
                       <button
                       className='border-none bg-[rgba(0,0,0,0.616)] p-[1vmax] lg:p-[0.3vmax_0.5vmax] cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]'
                       onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}
                       >-</button>
                       <input
                       className='border-none lg:font-normal text-[1.5vmax] lg:text-[0.8vmax] text-[rgba(0,0,0,0.74)] lg:w-[2vmax] w-[5vmax] font-normal p-[1.7vmax] lg:p-[0.5vmax] outline-none text-center'
                       type="number" value={item.quantity} readOnly/> 
                       <button
                        className='border-none bg-[rgba(0,0,0,0.616)] p-[1vmax] lg:p-[0.3vmax_0.5vmax]  cursor-pointer text-white transition-all hover:bg-[rgba(0,0,0,0.767)]'
                        onClick={() => increaseQuantity(item.product, item.quantity) }
                       >+</button>
                     </div>
       
                       <p className='cartSubTotal flex justify-end items-center p-[1.5vmax] lg:p-[0.5vmax] h-[20vmax] lg:h-[8vmax] box-border font-light  text-[2vmax] lg:text-[1vmax] text-[rgba(0,0,0,0.753)]'>
                         {`$${item.price * item.quantity}`}</p>
                   </div>
            ))}
     

              <div className='cartGrossProfit grid lg:grid-cols-[2fr_1.2fr] grid-cols-[0fr_2fr]'>
                <div></div>
              <div className='cartGrossProfitBox border-t-2 border-t-[rgba(40,110,80)] my-[2vmax] mx-[4vmax] justify-between flex box-border 
              p-[2vmax] text-[2vmax] lg:text-[1.2vmax]'>
              <p>Gross Total</p>
                <p>{`$${cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity, 0
                )}`}</p>
              </div>
              <div></div>
              <div className='checkOutBtn flex justify-end mt-[2vmax]'>
                <button
                className='bg-[tomato] text-white p-[1vmax_3vmax] lg:p-[0.8vmax_4vmax] font-medium text-[2vmax] lg:text-[0.8vmax] m-[1vmax_4vmax] cursor-pointer rounded-[30px] w-[100%] lg:w-[50%]' 
                onClick={checkoutHandler}
                >Check Out</button>
              </div>
              </div>
        </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default Cart