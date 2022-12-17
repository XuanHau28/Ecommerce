import React, {useState, Fragment} from 'react';
import MetaData from '../Layout/MetaData';

const Search = ( {history}) => {

    const [keyword, setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    }

  return (
    <Fragment>
        <MetaData  title="Search -- AmadoShop"/>
        <form className='w-[100vw] h-[50vw] max-w-[100%] flex justify-center items-center 
        bg-[rgba(231,231,231)] lg:top-[0%] top-[10%] left-0 fixed' onSubmit={searchSubmitHandler}>
            <input type="text"
            placeholder='Search a Product...'
             className='bg-white text-primary  border cursor-pointer lg:w-[40%] lg:h-[6%] w-[60%] h-[10%]
             outline-none box-border focus:border-gray-500 focus:cursor-text pl-12 focus:pl-10 focus:pr-4 focus:text-sm'
            onChange={(e) => setKeyword(e.target.value)}
            />
            <input className='z-30 lg:h-[6%] lg:w-[6%] w-[15%] h-[15px] bg-[rgba(40,111,108)] border-none font-light cursor-pointer transition-all text-white
            hover:bg-[rgba(55,97,214)]' type='submit' value="Search" />
        </form>
    </Fragment>
  )
}

export default Search