import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profilePng from '../../assets/img/avatar-1.png'

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        ifHalf: true
    };

  return (
    <div className='flex-none shadow-[0 0 5px rgba(0,0,0,0.226)] w-[30vmax] border border-[rgba(56,56,56,0.116)]
    flex flex-col items-center m-[1vmax] p-[3vmax]' >
        <img className="w-[5vmax]" src={profilePng} alt="User" />
        <p className='text-[rgba(0,0,0,0.836)] font-semibold text-base'>{review.name}</p>
        <ReactStars {...options} />
        <span className='text-[rgba(0,0,0,0.445)] font-light text-sm'>{review.comment}</span>
    </div>
  );
};
export default ReviewCard