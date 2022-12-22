import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from '../Layout/MetaData';
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";


const Payment = ({ history }) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
  
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
  
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
  
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      payBtn.current.disabled = true;
  
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/v1/payment/process",
          paymentData,
          config
        );
  
        const client_secret = data.client_secret;
  
        if (!stripe || !elements) return;
  
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });
  
        if (result.error) {
          payBtn.current.disabled = false;
  
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
  
            dispatch(createOrder(order));
  
            history.push("/success");
          } else {
            alert.error("There's some issue while processing payment ");
          }
        }
      } catch (error) {
        payBtn.current.disabled = false;
        alert.error(error.response.data.message);
      }
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error, alert]);
  

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer grid place-items-center bg-[rgba(255,255,255)] lg:h-[65vh] m-[2vmax] mb-20 md:mb-20 lg:mb-0">
        <form 
        className="paymentForm lg:w-[22%] w-[90%] h-[100%]" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div className="flex items-center m-[10vw_0] md:m-[2vmax_0]">
            <CreditCardIcon
            className="absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]" />
            <CardNumberElement className="paymentInput p-[4vw_10vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)]
            rounded outline-none" />
          </div>
          <div className="flex items-center  m-[10vw_0] md:m-[2vmax_0]">
            <EventIcon
            className="absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]"
            />
            <CardExpiryElement className="paymentInput p-[4vw_10vw] lg:p-[1vmax_4vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)]
            rounded outline-none" />
          </div>
          <div className="flex items-center  m-[10vw_0] md:m-[2vmax_0]">
            <VpnKeyIcon
            className="absolute translate-x-[1vmax] text-[6vw] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]"
            />
            <CardCvcElement className="paymentInput p-[4vw_10vw] lg:p-[1vmax_4vmax]  pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)]
            rounded outline-none" />
          </div>

          <input
            type="submit"
            value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn border-none bg-[tomato] text-white font-light p-[4vw] md:p-[0.8vmax] text-[4vw] lg:text-[0.9vmax] w-[100%] cursor-pointer
            transition-all outline-none hover:bg-[rgba(40,110,80)]"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment;