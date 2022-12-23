import React from 'react';
import { Rating } from '@material-ui/lab';
import profilePng from '../../assets/img/avatar-1.png'

const ReviewCard = ({ review }) => {

  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5
  };

  return (
    <div className='flex-none shadow-[0 0 5px rgba(0,0,0,0.226)] w-[30vmax] border border-[rgba(56,56,56,0.116)]
    flex flex-col items-center m-[1vmax] p-[3vmax]' >
        <img className="w-[5vmax]" src={profilePng} alt="User" />
        <p className='text-[rgba(0,0,0,0.836)] font-semibold text-base'>{review.name}</p>
        <Rating {...options} />
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  );
};
export default ReviewCard

