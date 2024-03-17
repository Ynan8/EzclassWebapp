import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        'reconnectionAttempts':
        'timeout': 10000,
        'transports': ['websocket'],
    };
   return io(process.env.NEXT_PUBLIC_API, options)    ;
}
