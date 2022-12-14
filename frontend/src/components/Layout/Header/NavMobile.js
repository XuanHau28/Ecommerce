import React from 'react';
import { Link } from 'react-router-dom';

// import data
import { navigation } from '../../../data';

//import icon
import {
  IoIosSearch,
  IoIosCart,
  IoMdContact
} from 'react-icons/io';

const NavMobile = () => {
  return (
    <nav className='bg-white shadow-2xl w-full h-full'>
      <ul className='text-center h-full flex flex-col items-center justify-center gap-y-6'>
        {navigation.map((item, index) => {
          return (
            <li key={index}>
              <a className='text-xl font-medium capitalize' href={item.href}>
                {item.name}
              </a>
            </li>
          );
        })}
        <li className='text-primary flex flex-col justify-between items-center gap-4 text-2xl'>
        <Link to="/search"><IoIosSearch /></Link>
        <Link to='/cart'><IoIosCart /></Link>
        <Link to="/login"><IoMdContact /></Link>
              </li>
      </ul>
    </nav>
  );
};

export default NavMobile;