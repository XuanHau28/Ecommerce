import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MailOutLineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import {useAlert} from 'react-alert';

//import component
import Loader from '../Loader/Loader';



const LoginSignUp = ({ history }) => {

    const dispatch = useDispatch();

    const alert= useAlert();

    const {loading, error, isAuthenticated, } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState("/avatar-1.png");
    const [avatarPreview, setAvatarPreview] = useState("/avatar-1.png");

    const loginSubmit = (e) => {
        e.preventDefault();

      dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({...user, [e.target.name]: e.target.value});
        }
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            history.push("/account");
        }
    }, [dispatch, error, alert, history, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };
      

  return (
    <Fragment>
        {loading ? (<Loader />) : (
            <div className='w-[100vw] h-[100vh] max-w-[100%] flex justify-center items-center bg-white lg:bg-[rgba(231,231,231)] fixed top-0 left-0 pt-[170px] lg:pt-[100px]'>
            <div className='bg-white w-[100vw] h-[95vh] lg:w-[25vw] lg:h-[70vh] box-border overflow-hidden'>
                <div>
                    <div className='flex h-[5vmax] lg:h-[3vmax] '>
                        <p 
                        className='text-[rgba(0,0,0,0.678)] font-semibold lg:font-light lg:text-[1vmax] text-[1.5vmax]  h-[55px]  lg:h-[63px] transition-all cursor-pointer grid place-items-center w-[100%]
                        hover:bg-[rgba(40,111,108)]' 
                        onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p 
                        className='text-[rgba(0,0,0,0.678)] font-semibold lg:font-light lg:text-[1vmax] text-[1.5vmax]  h-[55px] lg:h-[63px] text-[1vmax] transition-all cursor-pointer grid place-items-center w-[100%]
                        hover:bg-[rgba(40,111,108)]'
                        onClick={(e) => switchTabs(e, "register")}>REGISTER</p>                    
                    </div>
                    <button 
                    className='bg-[rgba(40,111,108)] h-1 w-[50%] border-none transition-all'
                    ref={switcherTab}></button>
                </div>
                <form
                className='flex flex-col items-center m-auto p-[5vmax] lg:p-[2vmax] justify-evenly h-[70%] transition-all' 
                ref={loginTab} onSubmit={loginSubmit}>
                    <div className='flex w-[100%] items-center'>
                        <MailOutLineIcon
                        className='absolute translate-x-[1vmax] text-[rgba(0,0,0,0.623)] lg:text-[1.6vmax]  text-[2.6vmax]'  />
                        <input
                            className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                            font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none' 
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            />
                    </div>

                    {/* Login Password */}
                    <div className='flex w-[100%] items-center'>
                        <LockOpenIcon
                        className='absolute translate-x-[1vmax] lg:text-[1.6vmax]  text-[2.6vmax] text-[rgba(0,0,0,0.623)]' />
                        <input
                             className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded-md
                             font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none' 
                            type="password"
                            placeholder='Password'
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>

                    {/* Forget password */}
                    <Link
                    className='text-[rgba(0,0,0,0.651)] self-end transition-all font-medium text-[1.8vmax] lg:text-[0.8vmax] hover:text-[rgba(40,111,108)]'
                    to="/password/forgot">Forget Password ?</Link>
                    <input 
                        className="px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] border-none bg-[rgba(40,111,108)] text-white font-light text-[1.8vmax] lg:text-[0.9vmax] w-[100%] p-[0.8vmax] cursor-pointer
                        transition-all rounded outline-none shadow-[0 2px 5px] shadow-[rgba(0,0,0,0.291)]
                        hover:bg-[#0a4542]"
                        type="submit" value="Login"  />
                </form>

                {/* Sign Up Form */}
                <form
                    className="translate-y-[-100%] translate-x-[-100vmax]
                    flex flex-col items-center m-auto p-[5vmax] lg:p-[2vmax] justify-evenly h-[70%] transition-all"
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}>
            
                {/* Sign Up Name */}
                <div className='signUpName flex w-[100%] items-center pb-5'>
                <FaceIcon
                className='absolute translate-x-[1vmax] lg:text-[1.6vmax]  text-[2.6vmax] text-[rgba(0,0,0,0.623)]'   />
                <input
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="text"
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={registerDataChange}
                />
                </div>

                {/* Sign Up EMail */}
                <div className='signUpEmail flex w-[100%] items-center pb-5 '>
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
                onChange={registerDataChange}/>
                </div>

                {/* Sign Up Password */}
                <div className='signUpPassword flex w-[100%] items-center pb-5'>
                <LockOpenIcon
                className='absolute translate-x-[1vmax] lg:text-[1.6vmax] text-[2.6vmax] text-[rgba(0,0,0,0.623)]' />
                <input 
                className='px-[5vmax] lg:px-[4vmax] py-[2.5vmax] lg:py-[1vmax] pr-[1vmax] w-[100%] box-border border border-[rgba(0,0,0,0.267)] rounded
                font-light text-[1.8vmax] lg:text-[0.9vmax] outline-none'
                type="password"
                required
                placeholder='Password'
                name="password"
                value={password}
                onChange={registerDataChange}/>
                </div>

                {/* Register Image */}
                <div id='registerImage' className='flex w-[100%] items-center pb-5'>
                <img
                 className='lg:w-[3vmax] w-[5vmax] rounded-[100%] mr-5'
                 src={avatarPreview} alt="Avatar Preview" />
                <input 
                className='flex p-[0%] file:cursor-pointer file:w-[100%] file:h-[5vh] file:z-[2] file:border-none file:m-[0%] file:font-normal lg:file:text-[0.8vmax] file:transition-all
                file:py-[1vmax] file:bg-gray-300 file:text-[16px]  file:hover:bg-[rgba(40,111,108)] file:hover:text-white file:text-primary'
                type="file"
                name='avatar'
                accept='image/*' 
                onChange={registerDataChange}
                />
                </div>
                <input
                type="submit"
                value="Register"
                className="border-none bg-[rgba(40,111,108)] text-white font-light text-[1.8vmax] lg:text-[0.9vmax] w-[100%] p-[0.8vmax] cursor-pointer
                transition-all rounded outline-none shadow-[0 2px 5px] h-[7vh] shadow-[rgba(0,0,0,0.291)]
                hover:bg-[#0a4542]"/>
             </form>
            </div>
        </div>
        ) }
    </Fragment>
  )
}

export default LoginSignUp;