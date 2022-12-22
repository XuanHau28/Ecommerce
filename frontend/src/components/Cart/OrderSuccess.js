import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess flex items-center justify-center flex-col m-auto text-center p-[10vmax] h-[50vh] pt-[40vmax] lg:pt-[25vmax] pb-[30vmax] lg:pb-[20vmax]">
      <CheckCircleIcon 
      className=" text-[rgba(40,110,80)] text-[7vmax]"
      />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link
      className="bg-[rgba(51,51,51)] text-white m-[2vmax] border-none p-[2vmax_4vmax] md:p-[1vmax_3vmax] cursor-pointer font-normal text-[4vmax] md:text-[2vmax] lg:text-[1vmax] "
      to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;