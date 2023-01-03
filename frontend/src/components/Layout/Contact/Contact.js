import React, { Fragment, useState } from 'react';
import { send } from 'emailjs-com';



const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleEMail = (e) => {
    setEmail(e.target.value);

    }

    const sendMail = (e) => {
        e.preventDefault();
    send (
        'service_vuwhew5',
        'template_q8376pl',
        {name, email, message},
        'ooGURfHNkEHu214FZ'
    ).then ((response) => {
        console.log("Message sent successfully", response.status, response.text);

    })
    .catch ((err) => {
        console.log(err);
    })
    setName('');
    setMessage('');
    setEmail('');
    }


  return (
    <div className='pt-[10vw]'>
        <h1 className='text-center font-normal text-[3rem] text-'>CONTACT US</h1>
        <form
        className='flex justify-center items-center flex-col gap-[2vw] border border-[rgba(231,231,231)] w-[30%] m-auto bg-white shadow h-[60vh] mb-[5vw]'
        onSubmit={sendMail} >
            <input 
            className='w-[80%] border border-[#b6b3b3] p-[1vmax_2vmax]'
            type='text' 
            value={name}
            required 
            placeholder='Your Name'
            onChange={handleName}
            />
            <input
            className='w-[80%] border border-[#b6b3b3] p-[1vmax_2vmax]'
            type='email' required placeholder='Your Email' value={email}
            onChange={handleEMail}/>
            <textarea 
            className='w-[80%] border border-[#b6b3b3] p-[1vmax_2vmax] h-[10vmax]'
            name='message' value={message} required placeholder='Your Message'
            onChange={handleMessage}/>
            <button 
            className='p-[1vmax_1vmax] bg-[#2eaf77] rounded hover:bg-[#194f37] text-white'

            type='submit'>Send Email</button>
        </form>
    </div>
  )
}

export default Contact