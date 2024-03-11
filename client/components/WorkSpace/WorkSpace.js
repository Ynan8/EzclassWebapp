import React, { useEffect, useRef, useState } from 'react'
import Split from 'react-split'
import ProblemDetail from './ProblemDetail/ProblemDetail'
import Playground from './Playground/Playground'
import MenuBar from './MenuBar/MenuBar'
import Navbar from './Navbar/Navbar'
import { useRouter } from 'next/router'
import { initSocket } from '../../socket'
import toast from 'react-hot-toast'

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import RandomColor from "randomcolor";



const WorkSpace = ({


}) => {
    const socketRef = useRef(null);
    const [EditorRef, setEditorRef] = useState(null);

    const handleEditorDidMount = (editor) => {
        setEditorRef(editor);
      };

      useEffect(() => {
    
    if (EditorRef) {
      const ydoc = new Y.Doc(); //create a ydoc 

      let provider = null;
      try {
        provider = new WebrtcProvider("Any Room Name" , ydoc, { //Remember the other tab or 
                                                    //other user should be in same room for seeing real-time changes
          signaling: [
            "wss://signaling.yjs.dev",
            'wss://y-webrtc-signaling-eu.herokuapp.com', 
            'wss://y-webrtc-signaling-us.herokuapp.com'
          ]
        });

        const yText = ydoc.getText("codemirror");
        
        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; //awareness is what makes other user aware about your actions 
        
        const color = RandomColor(); //Provied any random color to be used for each user
        
        awareness.setLocalStateField("user", {
          name: "Users Name",
          color: color,
        });
        
        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });
        
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
      }
      return () => {
        
        if (provider) {
          provider.disconnect(); //We destroy doc we created and disconnect 
          ydoc.destroy();  //the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [EditorRef]);

    const router = useRouter();
    const { roomId, firstName } = router.query;
    const [clients, setClients] = useState([]);
    const [fetchedCode, setFetchedCode] = useState("");
    const [currentUser, setCurrentUser] = useState('');

    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(16);


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
                firstName,
            });

            socketRef.current.on('joined', ({ clients, firstName, socketId }) => {
                if (firstName) {
                    toast.success(`${firstName} เข้าร่วมห้องเรียน.`);
                }
                setClients(clients);
            });


            socketRef.current.on("code-change", ({ code, firstName }) => {
                setFetchedCode(code);
                setCurrentUser(firstName);
                console.log(`${firstName} made a code change:`, code);
            });


            socketRef.current.on('disconnected', ({ socketId, firstName }) => {
                toast.success(`${firstName} ออกจากห้องเรียน`);
                setClients((prev) => prev.filter((client) => client.socketId !== socketId));
            });

        }
        init();

        // Remove listeners on cleanup
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off('connect_error');
            socketRef.current.off('connect_failed');
            socketRef.current.off('joined');
            socketRef.current.off("code-change");
            socketRef.current.off('disconnected');

        };
    }, [roomId, firstName]);

    const onCodeChange = (newCode) => {
        setFetchedCode(newCode);
        socketRef.current.emit('code-change', {
            roomId,
            code: newCode,
            firstName
        });
    };

   

    return (
        <div >
            {/* <Navbar /> */}
            <Split className='split' minSize={[0, 100, 50]} sizes={[40, 60, 20]}>
                <ProblemDetail />

                <Playground
                    fetchedCode={fetchedCode}
                    onCodeChange={onCodeChange}
                    language={language}
                    theme={theme}
                    fontSize={fontSize}
                />

                <MenuBar
                    clients={clients}
                    language={language}
                    theme={theme}
                    setLanguage={setLanguage}
                    setTheme={setTheme}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                />
            </Split>
        </div>
    )
}

export default WorkSpace