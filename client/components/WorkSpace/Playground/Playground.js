import React, { useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import AceEditor from 'react-ace';
import Editor from '@monaco-editor/react';
import { initSocket } from '../../../socket';

// Import the necessary modes and themes for the Ace editor
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { AiFillSetting } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import Client from '../Client';
import { Button } from '@nextui-org/react';


const Playground = ({
    fetchedCode,
    onCodeChange ,
    language,
    theme,
    fontSize,
    handleEditorDidMount
}) => {
    const [activeSection, setActiveSection] = useState(null);
    const toggleSection = (section) => {
        if (activeSection === section) {
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    };


    return (
        <div className="flex bg-[#282827]  overflow-x-hidden">
            <Split className="h-[calc(100vh-90px)] w-[calc(100vh)]" direction="vertical" sizes={[60, 40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <Editor
                        width={`100%`}
                        language={language}
                        theme={theme}
                        value={fetchedCode}
                        onChange={onCodeChange}
                        options={{ fontSize: fontSize }}
                        
                    />
                </div>
                <div className='text-white p-4 mt-2 rounded-b-md'>
                    <div className="w-full overflow-auto">
                        <div className='flex justify-between'>
                            <p className='text-base font-semibold'>ทดสอบผลรันของคุณ</p>
                            <Button
                                color='success'
                                variant='shadow'
                                size='md'
                                className='px-14 text-white'
                            >
                                Run
                            </Button>

                        </div>
                        <div className="mt-5 pb-7 w-full flex">
                            <div className="w-1/2 mr-2">
                                <p className="text-sm mb-1">Input:</p>
                                <textarea
                                    className='p-2 pt-3 pb-5 w-full h-60 text-black resize-none rounded-sm focus:outline-none'
                                    placeholder='Input...'
                                />
                            </div>
                            <div className="w-1/2 h-2/3 cursor-default">
                                <p className="text-sm mb-1">Output:</p>
                                <div className="p-2 pt-3 pb-5 w-full h-60 text-gray-500 bg-white whitespace-pre small-overflow overflow-y-hidden">
                                    <p className="font-mono cursor-text">
                                        output
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Split>
        </div>
    );
};

export default Playground;
