import React, { useContext, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import ProblemDetail from './ProblemDetail/ProblemDetail';
import Playground from './Playground/Playground';
import MenuBar from './MenuBar/MenuBar';
import Navbar from './Navbar/Navbar';
import { useRouter } from 'next/router';
import { initSocket } from '../../socket';
import toast from 'react-hot-toast';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import RandomColor from 'randomcolor';
import { Context } from '../../context';
import axios from 'axios';
const { nanoid } = require('nanoid');

const WorkSpace = ({ id, showConfetti, setShowConfetti }) => {
  const socketRef = useRef(null);
  const editorRef = useRef();
  const [userData, setUserData] = useState('');

  const generateRoomId = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const [codeJoin, setCodeJoin] = useState(generateRoomId());

  const generateNewRoomId = () => {
    setCodeJoin(generateRoomId());
  };

  useEffect(() => {
    const interval = setInterval(generateNewRoomId, 3600000); // Generate new room ID every 1 hour

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const LANGUAGE_VERSIONS = {
    python: '3.10.0',
    javascript: '18.15.0',
    typescript: '5.0.3',
    java: '15.0.2',
    csharp: '6.12.0',
    php: '8.2.3',
  };

  const languages = Object.entries(LANGUAGE_VERSIONS);

  // Assuming 'Context' is your context imported from somewhere else in your app.
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const router = useRouter();
  const { roomId, firstName } = router.query;
  const [clients, setClients] = useState([]);
  const [fetchedCode, setFetchedCode] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [language, setLanguage] = useState('python');
  const onSelect = (language) => {
    setLanguage(language);
  };

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

      socketRef.current.on('code-change', ({ code, firstName }) => {
        setFetchedCode(code);
        setCurrentUser(firstName);
        console.log(`${firstName} made a code change:`, code);
      });

      socketRef.current.on('disconnected', ({ socketId, firstName }) => {
        toast.success(`${firstName} ออกจากห้องเรียน`);
        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
      });
    };
    init();

    // Remove listeners on cleanup
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off('connect_error');
      socketRef.current.off('connect_failed');
      socketRef.current.off('joined');
      socketRef.current.off('code-change');
      socketRef.current.off('disconnected');
    };
  }, [roomId, firstName]);

  const onCodeChange = (newCode) => {
    setFetchedCode(newCode);
    socketRef.current.emit('code-change', {
      roomId,
      code: newCode,
      firstName,
    });
  };

  // Load Problem
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    loadProblem();
  }, [id]);

  const loadProblem = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/problem/${id}`);
      setProblem(data);
      // console.log(data);
    } catch (error) {
      console.error('Error loading problem:', error);
    }
  };

  // Run Code
  const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
  });

  const executeCode = async (language, sourceCode, input) => {
    const response = await API.post('/execute', {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
      stdin: input,
    });
    return response.data;
  };

  return (
    // Use flex-col for mobile and switch to flex-row for larger screens
    <div className="flex flex-col md:flex-row">
      {/* Assign flex-grow classes and responsive display/hiding as necessary */}
      <div className="flex-grow w-full md:w-2/5 lg:w-2/5 xl:w-1/4">
        <ProblemDetail problem={problem} />
      </div>

      {/* Playground occupies more space on larger screens */}
      <div className="flex-grow w-full md:w-3/5 lg:w-3/5 xl:w-1/2">
        <Playground
          fetchedCode={fetchedCode}
          onCodeChange={onCodeChange}
          language={language}
          theme={theme}
          setLanguage={setLanguage}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          roomId={roomId}
          editorRef={editorRef}
          languages={languages}
          onSelect={onSelect}
          executeCode={executeCode}
          problem={problem}
          showConfetti={showConfetti}
          setShowConfetti={setShowConfetti}
        />
      </div>

      {/* MenuBar takes a smaller fraction of the space */}
      <div className="flex-grow w-full md:w-full lg:w-1/5 xl:w-1/4">
        <MenuBar
          clients={clients}
          language={language}
          theme={theme}
          setLanguage={setLanguage}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          userData={userData}
          roomId={roomId}
          codeJoin={codeJoin}
        />
      </div>
    </div>
  );
};

export default WorkSpace;
