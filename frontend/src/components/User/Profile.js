import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Profile = ({ history }) => {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
        history.push("/login");
        }
    },[])

  return (
    <Fragment>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='profileContainer flex flex-col lg:flex-row h-[100vh] w-[100vw] left-0 fixed top-0 pt-[100px] lg:pt-[50px] max-w-[100%] bg-[#dad9d9]'>
            <div className='flex h-[100vh] w-[100vw] max-w-[100%] flex-col justify-center items-center'>
                <h1 className='text-[rgba(0,0,0,0.555)] ml-[160px] lg:ml-72 text-[3.2vmax] font-medium lg:text-[2.2vmax] -translate-x-[10vmax] -translate-y-[2vmax]'>My Profile</h1>
                <img className='w-[20vmax] rounded-[100%] transition-all hover:scale-[1.05]' src={user.avatar.url} alt={user.name} />
                <Link
                className='border-none p-[1vmax]  bg-[rgba(40,111,108)] font-normal text-[2vmax] lg:text-[1vmax] text-white text-center transition-all 
                hover:bg-[#073220] w-[30%] m-[4vmax]'
                to="/me/update">Edit Profile</Link>
            </div>
            <div className='lg:justify-evenly flex h-[80vh] lg:pt-[80px] w-[100vw] max-w-[100%] flex-col lg:text-left lg:items-start text-center items-center'>
            <div>
                <h4 className='text-black font-normal text-[2.5vmax] lg:text-[1.2vmax] '>Full Name</h4>
                <p className='text-[rgba(0,0,0,0.418)] text-[2vmax] lg:text-[1vmax] font-normal my-[0.5vmax] lg:my-[0.2vmax]'>{user.name}</p>
            </div>
            <div>
                <h4 className='text-black font-normal text-[2.5vmax] lg:text-[1.2vmax] '>Email</h4>
                <p className='text-[rgba(0,0,0,0.418)] text-[2vmax] lg:text-[1vmax] font-normal my-[0.5vmax] lg:my-[0.2vmax]'>{user.email}</p>
            </div>
            <div>
                <h4 className='text-black font-normal text-[2.5vmax]  lg:text-[1.2vmax]'>Joined On</h4>
                <p className='text-[rgba(0,0,0,0.418)] text-[2vmax] lg:text-[1vmax] font-normal m-[0.2vmax]'>{String(user.createdAt).substring(0, 10)}</p>
            </div>
            <div className='flex flex-col w-[60%]'>
                <Link
                className='bg-[rgba(68,68,68)] font-normal ext-[1.8vmax] lg:text-[1vmax] text-white p-[0.5vmax] text-center transition-all my-[2vmax] lg:my-[1vmax]   hover:bg-[rgba(40,111,108)]' 
                to="/orders">My Orders</Link>
                <Link 
                className='bg-[rgba(68,68,68)] font-normal ext-[1.8vmax] lg:text-[1vmax] text-white p-[0.5vmax] text-center transition-all my-[2vmax] lg:my-[1vmax]   hover:bg-[rgba(40,111,108)]' 
                to="/password/update">Change Password</Link>
            </div>
        </div>
        </div>
    </Fragment>
  )
}

export default Profile