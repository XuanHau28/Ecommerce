import React from 'react'
import { Link } from 'react-router-dom'

const CardItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className='CartItemCard flex p-[3vmax] lg:p-[1vmax] h-[25vmax] lg:h-[8vmax] items-center box-border'>
      <img 
      className='w-[10vmax] lg:w-[5vmax]'
      src={item.image} alt="vdc" />
      <div className='flex my-[1vmax] mx-[2vmax] lg:my-[0.3vmax] lg:mx-[1vmax] flex-col'>
        <Link
        className='font-medium text-[1.9vmax] lg:text-[0.9vmax] text-[rgba(24,24,24,0.815)]'
        to={`/product/${item.product}`}>{item.name}</Link>
        <span
        className='font-light text-[1.9vmax] lg:text-[0.9vmax] text-[rgba(24,24,24,0.815)]'
        >{`Price: $${item.price}`}</span>
        <p
        className='text-[tomato] font-thin text-[2vmax] lg:text-[0.8vmax] cursor-pointer'
        onClick={() => deleteCartItems(item.product)}
        >Remove</p>
      </div>
    </div>
  )
}

export default CardItemCard;