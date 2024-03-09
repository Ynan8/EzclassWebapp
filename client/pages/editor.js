import React, { useEffect, useRef, useState } from 'react';
import CodeEditor from '../components/Editor/CodeEditor';
import { useRouter } from 'next/router';
import { initSocket } from '../socket';
import toast from 'react-hot-toast';

const Editor = () => {
    const socketRef = useRef(null);

    const router = useRouter();
    const { roomId, username } = router.query;
    const [clients, setClients] = useState([]);
    const [fetchedCode, setFetchedCode] = useState("");
    const [currentUser, setCurrentUser] = useState('');


    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleError(err));
            socketRef.current.on('connect_failed', (err) => handleError(err));
            const handleError = (e) => {
                console.log('socket err=>', e);
                toast.error('Socket connection failed!!');
            };

            socketRef.current.emit('join', {
                roomId,
                username,
            });

            socketRef.current.on('joined', ({ clients, username, socketId }) => {
                if (!username) {
                    toast.success(`${username} joined the room.`);
                }
                setClients(clients);
            });

            socketRef.current.on("code-change", ({ code, username }) => {
                setFetchedCode(code);
                setCurrentUser(username);
                console.log(`${username} made a code change:`, code);
            });

        }
        init();

        // Remove listeners on cleanup
        return () => {
            socketRef.current.off('connect_error');
            socketRef.current.off('connect_failed');
            socketRef.current.off('joined');
            socketRef.current.off("code-change");
        };
    }, [roomId, username]);

    const onCodeChange = (newCode) => {
        setFetchedCode(newCode);
        socketRef.current.emit('code-change', {
            roomId,
            code: newCode,
            username
        });
    };

    return (
        <div className="container min-h-screen bg-gray-900 text-white">
            <div className="flex h-full">
                <aside className="w-2/12 bg-gray-800 p-5">
                    {/* Your content here */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                            Room Id : {roomId}
                        </div>
                        <span className="ml-2">Username : {username}</span>
                    </div>
                    <div>
                        <span>Status: Connected</span>
                        <div className="current-user-info">
    {currentUser && <p>{currentUser} is typing...</p>}
</div>

                        {/* Add additional menu items here */}
                    </div>
                </aside>
                <main className="w-10/12">
                    <div className="p-5 h-full">
                       
                        <CodeEditor
                            roomId={roomId}
                            username={username}
                            code={fetchedCode}
                            onChange={onCodeChange}
                        />
                    </div>
                </main>

            </div>
        </div>
    )
}

export default Editor;
