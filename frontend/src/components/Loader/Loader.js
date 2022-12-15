import React from 'react'

const Loader = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-white flex items-center justify-center max-w-[100%]'>
            <div className='w-[10vmax] h-[10vmax] border-b-[5px] border-[rgb(40,111,108)] rounded-[50%] animate-spin'></div>
        </div>
)
};  

export default Loader;