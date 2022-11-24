import React, {useEffect, useRef, useState} from 'react';
import { registration, send } from '../actions/actions';
import Message from './Message';
import {Link} from "react-router-dom";
import axios from 'axios'





const Chat = (props) => {


    const [value, setValue] = useState('')
    const [theme, setTheme] = useState('')
    const [reciever, setRciever] = useState('')



    const sender = localStorage.getItem('sender');


    const sendMessage = async () => {

        if(value.trim() == '' || theme.trim() == ''){
            alert('ur data is empty')
        }
        else{

            send(sender, reciever, theme, value)

            setRciever('')
            setValue('')
            setTheme('')
            
        }

        
    }

    const data = props.data.map(e => {
        if(e.rciever == sender){
            return (
                <Message
                    key={e._id}
                    sender={e.sender}
                    title={e.title}
                    content={e.content}
                />
            )
        }
        else{
            return 
        }
    })

    // const data = props.data.map(i =>
    //     <Message
    //         key={i._id}
    //         sender={i.sender}
    //         title={i.title}
    //         content={i.content}
    //     />
            
    // )

    return (
        <>
        <div className=' flex items-center flex-col container mx-auto'>
            <div className=' my-4 flex items-end flex-col'>
                <div className=' text-slate-100 mb-2'>
                    User: {sender}
                </div>
                <input 
                    value={reciever} 
                    onChange={e => setRciever(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 mb-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Enter rciever" required/>
                
                <input 
                    value={theme} 
                    onChange={e => setTheme(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Your theme" required/>

                <input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 my-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Your message" required/>
                
                <div className=' flex justify-between w-full'>
                    <Link
                        to={'/'}
                        className=' bg-red-300 rounded-md px-3 py-2  hover:bg-red-400 '
                    >
                        Exit
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className=' bg-green-300 rounded-md px-3 py-2 ml-4 hover:bg-green-400 '
                    >
                        Check for new messages
                    </button>

                    <button
                        onClick={sendMessage}
                        className=' bg-amber-100 rounded-md px-3 py-2 ml-4 hover:bg-amber-200 '
                    >
                        Send
                    </button>
                    
                </div>
                
                
            </div>

                {console.log(props.data)}
                {props.data.length > 0 
                ?
                <div className=' w-full'>{data.reverse()}</div>
                :
                <div className=' text-white'>loading...</div>
                }
        </div>
        </>
    );
};

export default Chat;