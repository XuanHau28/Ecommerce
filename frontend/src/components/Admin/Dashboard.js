import React, {useEffect} from'react';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { Doughnut, Line } from "react-chartjs-2";

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  return (
    <div className="dashboard w-[100vw] max-w-[100%] grid grid-cols-[1fr] lg:grid-cols-[1fr_5fr] absolute pt-[6vw]">
    <MetaData title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer lg:border-l lg:border-l-[rgba(0,0,0,0.13)] bg-white p-[3rem_0]">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary m-[2rem_0]">
        <div className='flex bg-white justify-center'>
          <p className='bg-[rgba(70,117,218,0.932)] text-white font-light text-[1.3rem] text-center p-[1.5rem] w-[100%] lg:m-[0_2rem]'>
            Total Amount <br /> ₹{totalAmount}
          </p>
        </div>
        <div className="dashboardSummaryBox2 flex justify-center">
          <Link
          className='text-primary font-light  text-center bg-[rgb(255,110,110)]  text-[0.9rem] lg:text-[2rem] m-[1rem] lg:m-[2rem]  p-[0.5rem] lg:p-[1.5rem] w-[10vmax]
          h-[10vmax] rounded-[100%] flex justify-center items-center flex-col'
          to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link
          className='text-primary font-light  text-center bg-[rgb(255,233,174)] w-[10vmax]
          h-[10vmax] rounded-[100%] flex justify-center items-center flex-col  text-[0.9rem] lg:text-[2rem] m-[1rem] lg:m-[2rem]  p-[0.5rem] lg:p-[1.5rem]'
          to="/admin/orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </Link>
          <Link
          className='font-light  text-center bg-[rgb(51,51,51)]  w-[10vmax]
          h-[10vmax]  rounded-[100%] flex justify-center items-center flex-col text-[rgb(255,255,255)]
          text-[0.9rem] lg:text-[2rem] m-[1rem] lg:m-[2rem]  p-[0.5rem] lg:p-[1.5rem]'
          to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link> 
        </div>
      </div>
      <div className='w-[80%] m-auto'>
        <Line 
        
        data={lineState} />
      </div>

      <div className='w-[30vmax] m-auto'>
        <Doughnut data={doughnutState} />  
      </div>
    </div>
  </div>
  )
}

export default Dashboard;


