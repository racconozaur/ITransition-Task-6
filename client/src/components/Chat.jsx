import React, {useEffect, useRef, useState} from 'react';
import Message from './Message';



const DATA = [
    {
        id: 1,
        user: 'Jasa',
        theme: 'node',
        text: 'hello'
    },
    {
        id: 2,
        user: 'asdf',
        theme: 'node',
        text: 'helvrwewlo'
    }
]


const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [theme, setTheme] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket closed')
        }
        socket.current.onerror = () => {
            console.log('Socket err')
        }
    }

    const sendMessage = async () => {

        if(value.trim() == '' || theme.trim() == ''){
            alert('ur data is empty')
        }
        else{
            const message = {
                username,
                message: value,
                theme: theme,
                id: Date.now(),
                event: 'message'
            }
            socket.current.send(JSON.stringify(message));
            setValue('')
            setTheme('')
        }

        
    }

    const data = messages.map(i => 
        <div key={i.id} className=' w-full'>
            {i.event === 'connection'
                                ? <div className="">
                                    Пользователь {i.username} подключился
                                </div>
                                :  <Message
                                    user={i.username}
                                    theme={i.theme}
                                    text={i.message}
                                    />
                
            }
         </div>  
            
    )


    if (!connected) {
        return (
            <div className=' flex items-center flex-col container mx-auto'>
            <div className=' my-4 flex items-center'>
                <input 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Your username" />
                <button
                    onClick={connect}
                    className=' bg-amber-100 rounded-md px-3 py-2 ml-4 hover:bg-amber-200 '
                >Enter</button>
            </div>

        </div>
        )
    }

    return (
        <>
        <div className=' flex items-center flex-col container mx-auto'>
            <div className=' my-4 flex items-end flex-col'>
                <input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Your message" required/>
                <input 
                    value={theme} 
                    onChange={e => setTheme(e.target.value)} 
                    type="text" 
                    className="px-3 py-2 my-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-96 rounded-md sm:text-sm focus:ring-1" 
                    placeholder="Your theme" required/>
                <button
                    onClick={sendMessage}
                    className=' bg-amber-100 rounded-md px-3 py-2 ml-4 hover:bg-amber-200 '
                >Send</button>
            </div>


                {data}

        </div>
        </>
    );
};

export default Chat;