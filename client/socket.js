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
   return io("https://backendezclass.onrender.com", options)    ;
>>>>>>> 77156dd33e8779fc80bd8c06254f77ee28ec5913
}
