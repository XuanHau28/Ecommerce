import React, { Fragment, useEffect, useState } from 'react';
import MailOutLineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import MetaData from '../Layout/MetaData';
//import component
import Loader from '../Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstans';

const UpdateProfile = ({ history }) => {

  const dispatch = useDispatch();

  const alert= useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated} = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/avatar-1.png");

  
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm))
}

const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
};

useEffect(() => {

  if(user) {
    setName(user.name);
    setEmail(user.email);
    setAvatarPreview(user.avatar.url);
  }

    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    if (isUpdated) {
        alert.success("Profile updated Successfully");
        dispatch(loadUser());

        history.push("/account");

        dispatch({
          type: UPDATE_PROFILE_RESET
        });
    }
}, [dispatch, error, alert, history, user, isUpdated]);


  return (
    <Fragment>
     { loading ? (<Loader />) : (
      <Fragment>
        <MetaData title="Update Profile" />
      <div className='w-[100vw] h-[100vh] max-w-[100%] flex justify-center items-center bg-white 
      lg:bg-[rgba(231,231,231)] fixed top-0 left-0 pt-[170px] lg:pt-[100px]'>
         <div className='bg-white w-[100%] h-[70vh] lg:w-[25vw] lg:h-[70vh] box-border overflow-hidden'>
           <h2 className='text-center text-[rgba(0,0,0,0.664)] font-normal text-[2.3vmax] lg:text-[1.3vmax]
           p-[1.3vmax] border-b border-b-[rgba(0,0,0,0.205)] w-[50%] m-auto'>
             Update Profile </h2>
                 {/* Sign Up Form */}
                 <form
                     className="
                     flex flex-col items-center m-auto p-[5vmax] lg:p-[2vmax] justify-evenly h-[70%] transition-all"
                     encType="multipart/form-data"
                     onSubmit={updateProfileSubmit}>
             
                 {/* Udape Profile Name */}
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
                 onChange={(e) => setName(e.target.value)}
                 />
                 </div>
 
                 {/* Update Profile EMail */}
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
                 onChange={(e) => setEmail(e.target.value)}/>
                 </div>
 
                 {/* Update Profile Image */}
                 <div id='updateProfileImage' className='flex w-[100%] items-center pb-5'>
                 <img
                  className='lg:w-[3vmax] w-[5vmax] rounded-[100%] mr-5'
                  src={avatarPreview} alt="Avatar Preview" />
                 <input 
                 className='flex p-[0%] file:cursor-pointer file:w-[100%] file:h-[5vh] file:z-[2] file:border-none file:m-[0%] file:font-normal lg:file:text-[0.8vmax] file:transition-all
                 file:py-[1vmax] file:bg-gray-300 file:text-[16px]  file:hover:bg-[rgba(40,111,108)] file:hover:text-white file:text-primary'
                 type="file"
                 name='avatar'
                 accept='image/*' 
                 onChange={updateProfileDataChange}
                 />
                 </div>
                 <input
                 type="submit"
                 value="Update Profile"
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

export default UpdateProfile