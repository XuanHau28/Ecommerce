import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer w-[100%] box-border bg-[rgba(221,221,221)] border-l border-l-[rgba(0,0,0,0.158)] 
        flex flex-col h-[100vh]">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage h-[100vh] bg-white grid grid-cols-[6fr_3fr]"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea p-[5vmax] pb-0">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox m-[2vmax]">
                    <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                      <p  className="font-normal text-[4vw] lg:text-[1vmax] text-black">Name:</p>
                      <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">{order.user && order.user.name}</span>
                    </div>
                    <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                      <p  className="font-normal text-[4vw] lg:text-[1vmax] text-black">Phone:</p>
                      <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                      <p  className="font-normal text-[4vw] lg:text-[1vmax] text-black">Address:</p>
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

                    <div className="flex lg:m-[1vmax_0] m-[6vw_0]">
                      <p className="font-normal text-[4vw] lg:text-[1vmax] text-black">Amount:</p>
                      <span className="m-[0_1vmax] font-thin text-[4vw] lg:text-[1vmax] text-[#575757]">{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
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
                <div className="confirmCartItems p-[5vmax] pt-[2vmax]">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer max-h-[20vmax] overflow-y-auto">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div 
                        className="flex font-normal text-[1vmax] items-center justify-between m-[2vmax_0]"
                        key={item.product}>
                          <img 
                          className="w-[3vmax]"
                          src={item.image} alt="Product" />
                          <Link
                          className="text-[#575757] m-[0_2vmax] w-[60%]"
                          to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span 
                          className="font-thin text-[1vmax] text-[#5e5e5e]">
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm m-[5vmax_0] p-[5vmax] lg:p-[3vmax] bg-white border-l border-l-[rgba(0,0,0,0.623)]"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div className="flex w-[100%] items-center">
                    <AccountTreeIcon className="absolute translate-x-[1vmax] text-[2.8vmax] lg:text-[1.6vmax] text-[rgba(0,0,0,0.623)]"/>
                    <select 
                    className="p-[2.5vmax_5vmax] lg:p-[1vmax_4vmax] m-[2rem_0] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded font-light
                    text-[1.7vmax] lg:text-[0.9vmax]"
                    onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;