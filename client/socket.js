import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        'reconnectionAttempt': 'infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io( "http://localhost:8000", options)
<<<<<<< HEAD
}
=======
}
>>>>>>> 5c2f2b3de74b1c9503188a00ae943e019ad87ccd
