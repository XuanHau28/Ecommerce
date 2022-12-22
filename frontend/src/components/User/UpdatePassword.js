import React, { Fragment, useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData';

//import component
import Loader from '../Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';



const UpdatePassword = ({ history }) => {

    const dispatch = useDispatch();

    const alert= useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, loading, isUpdated} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm))
}

useEffect(() => {

    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (isUpdated) {
        alert.success("Password updated Successfully");

        history.push("/account");

        dispatch({
          type: UPDATE_PASSWORD_RESET
        });
    }
}, [dispatch, error, alert, history, isUpdated]);



  return (
    <Fragment>
    { loading ? (<Loader />) : (
        <Fragment>
    <MetaData title="Change Password" />
     <div className='w-[100vw] h-[100vh] max-w-[100%] flex justify-center items-center bg-white 
     lg:bg-[rgba(231,231,231)] fixed top-0 left-0 pt-[170px] lg:pt-[100px]'>
        <div className='bg-white w-[100%] h-[70vh] lg:w-[25vw] lg:h-[70vh] box-border overflow-hidden'>
          <h2 className='text-center text-[rgba(0,0,0,0.664)] font-normal text-[2.3vmax] lg:text-[1.3vmax]
          p-[1.3vmax] border-b border-b-[rgba(0,0,0,0.205)] w-[50%] m-auto md:mb-10'>
            Update Profile </h2>
                {/* Update Password Form */}
                <form
                className="
                flex flex-col items-center m-auto p-[5vmax] lg:p-[2vmax] justify-evenly h-[70%] transition-all"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}>

                {/* Old Password */}
                <div className='signUpPassword flex w-[100%] items-center pb-5'>
                <VpnKeyIcon className='absolute translate-x-[1vmax] lg:text-[1.6vmax] text-[2.6vmax] text-[rgba(0,0,0,0.623)]' />
                <input 
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="password"
                required
                placeholder='Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}/>
                </div>
                
                {/* New Password Password */}
                <div className='signUpPassword flex w-[100%] items-center pb-5 md:my-5'>
                <LockOpenIcon className='absolute translate-x-[1vmax] lg:text-[1.6vmax] text-[2.6vmax] text-[rgba(0,0,0,0.623)]' />
                <input 
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="password"
                required
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
                </div>

                 {/* Confirm  Password */}
                <div className='signUpPassword flex w-[100%] items-center pb-5'>
                <LockIcon className='absolute translate-x-[1vmax] lg:text-[1.6vmax] text-[2.6vmax] text-[rgba(0,0,0,0.623)]' />
                <input 
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="password"
                required
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                <input
                type="submit"
                value="Change"
                className="border-none bg-[rgba(40,111,108)] text-white font-light text-[1.8vmax] lg:text-[0.9vmax] w-[100%] p-[0.8vmax] cursor-pointer
                transition-all rounded outline-none shadow-[0 2px 5px] h-[7vh] shadow-[rgba(0,0,0,0.291)]
                hover:bg-[#0a4542]"
                />
             </form>
        </div>
      </div>
      </Fragment>
    )}
   </Fragment>
  )
}

export default UpdatePassword