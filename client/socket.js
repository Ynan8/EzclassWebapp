import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        'reconnectionAttempt': 'infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
<<<<<<< HEAD
   return io("http://localhost:8000", options)    ;
=======
   return io("https://backendezclass.onrender.com", options);
>>>>>>> c0d612f8b5d333d0b5d25c8d80ce6381f9016651
}
