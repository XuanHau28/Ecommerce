import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';


const ConfirmOrder = ({ history }) => {

    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);

    const subtotal = cartItems.reduce (
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + shippingCharges + tax;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`;

    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        history.push("/process/payment");
      };

  return (
    <Fragment>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className='confirmOrderPage md:h-[100vh] bg-white grid grid-cols-[1fr] h-[unset] md:grid-cols-[6fr_3fr]'>
            <div>
                <div className='confirmshippingArea p-[5vmax] pb-[0%]'>
                    <Typography>Shipping Info</Typography>
                    <div className='confirmshippingAreaBox m-[2vmax]'>
                        <div className='flex m-[6vw_0] md:m-[1vmax_0]'>
                            <p className=' font-normal text-[4vw] md:text-[2vw] lg:text-[1vw] text-black'>Name:</p>
                            <span
                            className='m-[0_1vmax] font-thin text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#575757]'
                            >{user.name}</span>
                        </div>
                        <div className='flex m-[6vw_0] md:m-[1vmax_0]'>
                            <p className=' font-normal text-[4vw] md:text-[2vw] lg:text-[1vw] text-black'>Phone:</p>
                            <span
                            className='m-[0_1vmax] font-thin text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#575757]'
                            >{shippingInfo.phoneNo}</span>
                        </div>
                        <div className='flex m-[6vw_0] md:m-[1vmax_0]'>
                            <p className=' font-normal text-[4vw] md:text-[2vw] lg:text-[1vw]'>Address:</p>
                            <span
                            className='m-[0_1vmax] font-thin text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#575757]'
                            >{address}</span>
                        </div>
                    </div>
                </div>
                <div className='confirmCartItems p-[5vmax] pt-[2vmax]'>  
                    <Typography>Your Cart Items:</Typography>
                    <div className='confirmCartItemsContainer max-h-[50vw] md:max-h-[20vmax] overflow-y-auto'>
                        {cartItems.map((item) => (
                            <div 
                            className='flex font-normal text-[4vmax] md:text-[1vmax] items-center justify-between m-[2vmax_0]'
                            key={item.product}>
                                <img
                                className='w-[10vmax] lg:w-[3vmax]'
                                src={item.image} alt="Product" />
                                <Link
                                className='text-[#575757] text-[4vw] md:text-[2vw] lg:text-[1vw] pl-[20px] lg:pl-0 m-0 w-[80%] lg:m-[0_2vmax] lg:w-[60%] '
                                 to={`/product/${item.product}`} >{item.name}</Link>{""}
                                <span
                                className='font-thin text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#5e5e5e]'>
                                    {item.quantity} X ${item.price} = {" "}
                                    <b>${item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        {/*  */}
        <div className='orderSummary border-t border-t-[rgba(0,0,0,0.363)] md:border-t-0 md:border-l border-l-[rgba(0,0,0,0.247)] p-[12vw] md:p-[7vmax]'>
            <Typography>Order Summary</Typography>
            <div>
                <div className='flex font-light text-[6vw] md:text-[2vw] lg:text-[1vmax] justify-between m-[2vmax_0]'>
                    <p>Subtotal:</p>
                    <span
                    className='text-[rgba(0,0,0,0.692)]'
                    >${subtotal}</span>
                </div>
                <div className='flex font-light text-[6vw] md:text-[2vw] lg:text-[1vmax] justify-between m-[2vmax_0]'>
                    <p>Shipping Charges:</p>
                    <span
                     className='text-[rgba(0,0,0,0.692)]'
                    >${shippingCharges}</span>
                </div>
                <div className='flex font-light text-[6vw] md:text-[2vw] lg:text-[1vmax] justify-between m-[2vmax_0]'>
                    <p>GTS:</p>
                    <span
                     className='text-[rgba(0,0,0,0.692)]'
                    >${tax}</span>
                </div>
            </div>

            <div className='orderSummaryTotal flex font-light text-[4vw] md:text-[2vw] lg:text-[1vmax] justify-between border-t border-t-[rgba(0,0,0,0.363)] p-[5vw_0] lg:p-[2vmax_0]'>
                <p>
                    <b>Total</b>
                </p>
                <span>${totalPrice}</span>
            </div>

            <button
            className='bg-[tomato] text-white w-[100%] p-[4vw] md:p-[1vw] border-none m-[4vw_auto] lg:m-auto cursor-pointer transition-all font-normal text-[4vw] md:text-[2vw] lg:text-[1vmax]
            hover:bg-[rgba(40,100,80)]'
            onClick={proceedToPayment}
            >Process to Payment</button>
        </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder