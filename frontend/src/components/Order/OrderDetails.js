import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, order } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if(error) {
        alert.error(error);
        dispatch(clearErrors);
    }
    dispatch(getOrderDetails(match.params.id));

    }, [dispatch, alert, error, match.params.id]);

  return (
    <Fragment>
        { loading ? (<Loader />) : (
            <Fragment>
                <MetaData title="Order Details" />
                <div className="orderDetailsPage pt-[8vmax] lg:pt-[2vw] bg-white">
            <div className="orderDetailsContainer p-[5vmax] pb-0">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                  <p className="font-normal text-[4vw] lg:text-[1vmax] text-black">Name:</p>
                  <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">{order.user && order.user.name}</span>
                </div>
                <div className="orderDetailsContainerBox m-[2vmax]">
                  <p className="font-normal text-[4vw] lg:text-[1vmax] text-black">Phone:</p>
                  <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
                </div>
                <div className="orderDetailsContainerBox m-[2vmax]">
                  <p className="font-normal text-[4vw] lg:text-[1vmax] text-black">Address:</p>
                  <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                  <p
                    className={
                        
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div className="orderDetailsContainerBox m-[2vmax]">
                  <p className="font-normal text-[4vw] lg:text-[1vmax] text-black">Amount:</p>
                  <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox m-[2vmax]">
                <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems m-[2vmax] p-[2vmax_5vmax] border-t border-t-[rgba(0,0,0,0.164)]">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex font-normal text-[4vw] lg:text-[1vmax] m-[4vw_0] lg:m-[2vmax_0]  text-center">
                      <img
                      className="w-[10vw] lg:w-[3vmax]"
                      src={item.image} alt="Product" />
                      <Link
                      className="text-[#575757] m-[2vw] lg:m-[0_2vmax] w-[30%] lg:w-[60%]"
                      to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span className="font-thin text-[4vw] lg:text-[1vmax] text-[#5e5e5e]">
                        {item.quantity} X ${item.price} ={" "}
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
            </Fragment>
        )}
    </Fragment>
  )
}

export default OrderDetails