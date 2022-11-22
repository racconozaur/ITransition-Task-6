import React from 'react';

const Message = (props) => {
    return (
        <div className=' flex flex-col  rounded-lg border-4 p-2 my-4'>
            <h2 className=' text-white font-bold text-lg'>Name: {props.user == '' ? 'Anonimus' : props.user}</h2>
            <h3 className=' text-amber-100 font-semibold text-lg '>Theme: {props.theme}</h3>
            <p className=' text-white'>Message: {props.text}</p>
        </div>
    );
};

export default Message;