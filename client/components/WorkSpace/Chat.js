import React, { useEffect, useRef, useState } from 'react'
import { initSocket } from '../../socket';

const Chat = ({ roomId }) => {
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');


    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleError(err));
            socketRef.current.on('connect_failed', (err) => handleError(err));
            const handleError = (e) => {
                console.log('socket err=>', e);
                toast.error('Socket connection failed!!');
            };


            socketRef.current.on("receiveChatMessage", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socketRef.current.off("receiveChatMessage");
            };

        }
        init();


    }, [roomId]);

    const sendMessage = () => {
        socketRef.current.emit("sendChatMessage", { roomId, message: inputMessage });
        setInputMessage('');
    };



    return (
        <div className='text-white' >
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat