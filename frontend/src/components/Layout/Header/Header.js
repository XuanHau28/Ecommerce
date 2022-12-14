import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import logo
import Logo from '../../../assets/img/logo.png';
// import icons
import { CgMenuRight, CgClose } from 'react-icons/cg';
// import components
import NavMobile from './NavMobile';
//import icon
import {
  IoIosSearch,
  IoIosCart,
  IoMdContact
} from 'react-icons/io';

const Header = () => {
  // const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  // useEffect(() => {
  //   // add event listener
  //   window.addEventListener('scroll', () => {
  //     // when scrollY is bigger than 50px setBg to true, else false
  //     return window.scrollY > 50 ? setBg(true) : setBg(false);
  //   });
  // });

  

  return (
    <header
      className='bg-primary
      fixed left-0 py-1 z-10 w-full transition-all duration-200'
    >
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          {/* logo */}
          <Link to='/'>
            <img className='h-24 lg:h-32' src={Logo} alt='' />
          </Link>
          {/* menu icon */}
          <div
            onClick={() => setMobileNav(!mobileNav)}
            className='md:hidden text-2xl lg:text-3xl text-white cursor-pointer'
          >
            {mobileNav ? <CgClose /> : <CgMenuRight />}
          </div>
          {/* nav */}
          <nav className='hidden md:flex'>
            <ul className='md:flex md:gap-x-12 text-white '>
            <Link className='capitalize transition-all hover:border-b' to="/"><li>Home</li></Link>
            <li className='hover:border-b'>About</li>
            <Link className='capitalize transition-all hover:border-b' to="/products"><li className='hover:border-b'>Product</li></Link>
            <li className='hover:border-b'>Contact</li>
              <li className='text-white flex justify-between items-center gap-x-4 text-xl'>
                <Link to='/search'><IoIosSearch /></Link>
                <a href='#'><IoIosCart /></a>
                <a href='#'><IoMdContact /></a>
              </li>
            </ul>
          </nav>
          {/* nav mobile */}
          <div
            className={`${
              mobileNav ? 'left-0' : '-left-full'
            } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
          >
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;