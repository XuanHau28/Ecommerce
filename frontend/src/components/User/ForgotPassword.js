import React, { Fragment, useEffect, useState } from 'react';
import MailOutLineIcon from '@material-ui/icons/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData';

//import component
import Loader from '../Loader/Loader';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const alert= useAlert();
  
    const { error, loading, message} = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");
    
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
      
          if(error) {
              alert.error(error);
              dispatch(clearErrors());
          }
          if (message) {
              alert.success(message);
          }
      }, [dispatch, error, alert, message]);

  return (
    <Fragment>
    { loading ? (<Loader />) : (
     <Fragment>
       <MetaData title="Forgot Password" />
     <div className='w-[100vw] h-[100vh] max-w-[100%] flex justify-center items-center bg-white 
     lg:bg-[rgba(231,231,231)] fixed top-0 left-0 pt-[170px] lg:pt-[100px]'>
        <div className='bg-white w-[100%] h-[70vh] lg:w-[25vw] lg:h-[70vh] box-border overflow-hidden'>
          <h2 className='text-center text-[rgba(0,0,0,0.664)] font-normal text-[2.3vmax] lg:text-[1.3vmax]
          p-[1.3vmax] border-b border-b-[rgba(0,0,0,0.205)] w-[60%] m-auto'>
            Forgot Password </h2>
                {/* Forgot Password Form */}
                <form
                    className="
                    flex flex-col items-center m-auto p-[5vmax] lg:p-[2vmax] justify-evenly h-[70%] transition-all"
                    encType="multipart/form-data"
                    onSubmit={forgotPasswordSubmit}>

                {/* Forgot Password */}
                <div className='flex w-[100%] items-center pb-5 '>
                <MailOutLineIcon
                className='absolute translate-x-[1vmax] lg:text-[1.6vmax]  text-[2.6vmax] text-[rgba(0,0,0,0.623)]'     />
                <input
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded-md
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="email"
                required
                placeholder='Email'
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <input
                type="submit"
                value="Send"
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

export default ForgotPassword