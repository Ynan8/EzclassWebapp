const {io} = require('socket.io-client');
export const initSocket = async () => {
    const options = {
        'force new connection': true,
        'reconnectionAttempt': 'infinity',
        timeout: 10000,
        transports: ['websocket'],
        secure: true,
        rejectUnauthorized: false, 
    };
    return io(process.env.NEXT_PUBLIC_API, options);
}
