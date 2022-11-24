import React from 'react';
import { useState } from 'react';
import { registration } from '../actions/actions';


const Auth = (props) => {

    const [name, setName] = useState('')


    const connect = () => {

        if(name.trim() == ''){
            alert('Name should-not be empty')
        }
        else{
            
            localStorage.setItem("sender", name);
            registration(name)
            window.location.href = "/chat";
        }

        

    }

    return (
        <div className=' flex items-center flex-col container mx-auto'>
                <div className=' my-4 flex items-center'>
                    <input 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        type="text" 
                        className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                        placeholder="Your username" />
                    <button
                        onClick={connect}
                        className=' bg-amber-100 rounded-md px-3 py-2 ml-4 hover:bg-amber-200 '
                    >Enter</button>
                </div>

            </div>
    );
};

export default Auth;