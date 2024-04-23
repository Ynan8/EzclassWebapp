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
import { Tabs, Tab, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal, Textarea, Accordion, AccordionItem, Chip } from '@nextui-org/react';
import axios from 'axios';
import { BiSolidPencil } from 'react-icons/bi';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { TbAlertSquareFilled } from "react-icons/tb";
import { FiAlertCircle } from 'react-icons/fi';



const Playground = ({
    fetchedCode,
    onCodeChange,
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    editorRef,
    languages,
    onSelect,
    executeCode,
    problem,
    showConfetti,
    setShowConfetti,
    clients,
    userData
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenModalSubmit, onOpen: onOpenModalSubmit, onOpenChange: onOpenChangeModalSubmit } = useDisclosure();

    const [activeTab, setActiveTab] = useState("playground");

    const isCurrentUser = clients.some(client => userData && client.user && userData._id === client.user._id);

    const router = useRouter();

    const { id, firstName } = router.query;

    const [activeSection, setActiveSection] = useState(null);
    const toggleSection = (section) => {
        if (activeSection === section) {
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    };

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus();
    }
    const [input, setInput] = useState('');
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isError, setIsError] = useState(false);
    const errorStyle = {
        border: '2px solid red',
        color: 'red',
    };

    const [percentPass, setPercentPass] = useState('');


    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const result = await executeCode(language, sourceCode, input); // Pass the input to the executeCode function
            setOutput(result.run.output.split("\n"));
            result.run.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            console.log(error);
            toast.error(
                <div>
                    <strong>An error occurred.</strong>
                    <p>Unable to run code</p>
                </div>
            )
        } finally {
            setIsLoading(false);
        }
    };

    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
        if (problem) {
            setTestCases([
                { input: problem.input1, expectedOutput: problem.output1, status: '' },
                { input: problem.input2, expectedOutput: problem.output2, status: '' },
                { input: problem.input3, expectedOutput: problem.output3, status: '' },
            ]);
        }
    }, [problem]);



    const submitCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        let passedCases = 0;
        const updatedTestCases = testCases.map((testCase) => {
            return { ...testCase };
        });

        for (let i = 0; i < updatedTestCases.length; i++) {
            try {
                setIsLoadingSubmit(true);
                const testCase = updatedTestCases[i];
                const result = await executeCode(language, sourceCode, testCase.input);
                if (result && result.run && result.run.output !== undefined) {
                    const actualOutput = result.run.output.trim();
                    if (actualOutput === testCase.expectedOutput) {
                        passedCases++;
                        updatedTestCases[i].status = 'passed';
                    } else {
                        updatedTestCases[i].status = 'failed';
                    }
                    result.run.stderr ? setIsError(true) : setIsError(false);
                } else {
                    setIsError(true);
                    updatedTestCases[i].status = 'failed';
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    <div>
                        <strong>An error occurred.</strong>
                        <p>Unable to run code</p>
                    </div>
                );
                updatedTestCases[i].status = 'failed';
            } finally {
                setIsLoadingSubmit(false);
            }
        }
        setActiveTab("result");

        const score = ((passedCases / updatedTestCases.length) * 100).toFixed(2);
        setPercentPass(score);
        let finalScore = score === '100.00' ? 1 : 0;
        if (score === '100.00') {
            toast.success("ยินดีด้วย! คุณผ่านโจทย์ข้อนี้แล้ว.");
            setShowConfetti(true);

            // You may want to reset the confetti after a certain duration
            setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
        } else {
            toast.error(`โค้ดยังไม่สมบูรณ์! กรุณาตรวจสอบที่ผลลัพธ์`);
        }

        console.log(`Score: ${score}%`);
        setTestCases(updatedTestCases); // Update the testCases state to trigger re-render

        // Submit the code and score to the server
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/codeRoom/submit`, {
                codeRoomId: id,
                score: finalScore,
                percentPass: parseFloat(score),
                code: sourceCode,
                status: score === '100.00' ? 'passed' : 'failed'
            });
            console.log('Submission response:', response.data);
        } catch (error) {
            console.error('Error submitting code:', error);
            toast.error('Failed to submit code.');
        }
    };


    // Get course submit
    const [stdSubmitCode, setStdSubmitCode] = useState({});

    useEffect(() => {
        if (id) {
            loadStdSubmitCode();
        }
    }, [id]);


    const loadStdSubmitCode = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std-submitCode/${id}`);
            setStdSubmitCode(data);
            console.log("Loading student submit code", data);
        } catch (error) {
            console.error("Error loading submit code:", error);
        } finally {
        }
    };


    return (
        <div className=" bg-[#282827] min-h-screen  overflow-x-hidden">
            <nav className="flex justify-between items-center bg-[#1e1e1e] px-4 py-2">
                <div className="text-white">
                    <h1 className="text-xl font-bold">ห้องเรียนเขียนโค้ด</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                        <select
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                onSelect(e.target.value); // Call onSelect function when language is changed
                            }}
                            className="flex border-2 border-[#282827] cursor-pointer items-center rounded-md focus:outline-none  w-full px-2 py-2 font-medium"
                        >
                            {languages.map(([lang, version]) => (
                                <option key={lang} value={lang}>
                                    {lang} ({version})
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button
                        onPress={onOpen}
                        size='sm'
                        variant='faded'
                        className='py-4'
                        startContent={<AiFillSetting size={25} />}
                    >
                    </Button>
                    {/* <Button
                        color='success'
                        variant='shadow'
                        size='sm'
                        className='text-sm px-6 py-3 sm:px-3 text-white'
                        onPress={onOpen}
                    >
                        Submit
                    </Button> */}
                </div>

            </nav>
            <Split className="h-[calc(100vh-90px)] w-[calc(100vh)]" direction="vertical" sizes={[60, 40]} minSize={60}>
                <div className="w-full overflow-auto">
                    {/* <pre>{JSON.stringify(stdSubmitCode, null, 4)}</pre> */}
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
                    <div className="w-full ">
                        <Tabs color='default' size='lg' variant="bordered" aria-label="Tabs variants" value={activeTab}>
                            <Tab key="playground" title="ผลรันโค้ด" >
                                <div className='ml-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                                    <p className='text-base font-semibold mb-4 sm:mb-0'>ทดสอบผลรันของคุณ</p>
                                    <div className="flex space-x-3">

                                        <Button
                                            color='warning'
                                            size='md'
                                            className='text-sm px-6 py-2 sm:px-14 text-white'
                                            onClick={runCode}
                                            isLoading={isLoading}
                                        >
                                            Run
                                        </Button>
                                        {userData && userData.role === "teacher" ? (
                                            ""
                                        ) : (
                                            <Button
                                                color='success'
                                                size='md'
                                                className='text-sm px-6 py-2 sm:px-14 text-white'
                                                // onClick={submitCode}
                                                onPress={onOpenChangeModalSubmit}
                                                isLoading={isLoadingSubmit}
                                            >
                                                {isLoadingSubmit ? "กำลังโหลด" : "Submit"}
                                            </Button>
                                        )}

                                    </div>


                                </div>
                                <div className="mt-5 pb-7 space-x-2 w-full flex flex-row">
                                    <div className="w-full  mb-4 sm:mb-0">
                                        <p className="text-sm mb-1 ml-4">Input:</p>
                                        <Textarea
                                            variant="faded"
                                            labelPlacement="outside"
                                            className="w-full text-gray-500"
                                            placeholder='Input...'
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm mb-1 ml-4">Output:</p>
                                        <Textarea
                                            isReadOnly
                                            variant="faded"
                                            labelPlacement="outside"
                                            value={output ? output.join('\n') : 'กดปุ่ม "Run" เพื่อดูผลลัพธ์'}
                                            className={`w-full text-gray-500 ${isError ? 'text-red-500' : ''}`}
                                        />
                                    </div>
                                </div>
                            </Tab>
                            <Tab
                                key="result"
                                title={
                                    <div className='flex items-center space-x-2'>
                                        <p>ผลลัพธ์</p>
                                    </div>
                                }
                            >
                                {stdSubmitCode ? (
                                    <div className="flex items-center space-x-3 my-2">
                                        <p className='p-3'>ผลลัพธ์</p>
                                        <Chip size='lg' color='success' className='text-white'>ความถูกต้อง {stdSubmitCode.percentPass}%</Chip>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <Accordion selectionMode="multiple" variant="splitted">
                                    {testCases.map((testCase, index) => (
                                        <AccordionItem
                                            key={index}
                                            aria-label={`Test Case ${index + 1}`}
                                            title={`Test Case ${index + 1}`}
                                            startContent={
                                                testCase.status === 'passed' ? (
                                                    <BsFillClipboardCheckFill size={25} className="text-success" />
                                                ) : (
                                                    <TbAlertSquareFilled size={25} className="text-danger" />
                                                )
                                            }
                                        >
                                            <div className="mt-2  pb-7 w-full flex flex-col sm:flex-row">
                                                <div className="w-full sm:w-1/2 sm:mr-2 mb-4 sm:mb-0">
                                                    <p className="text-sm mb-1 ml-4">Input:</p>
                                                    <Textarea
                                                        variant="faded"
                                                        labelPlacement="outside"
                                                        className="w-full text-gray-500"
                                                        value={testCase.input}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2">
                                                    <p className="text-sm mb-1 ml-4">Output:</p>
                                                    <Textarea
                                                        isReadOnly
                                                        variant="faded"
                                                        labelPlacement="outside"
                                                        className={`w-full text-gray-500 ${isError ? 'text-red-500' : ''}`}
                                                        value={testCase.expectedOutput}
                                                    />
                                                </div>
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </Tab>
                        </Tabs>

                    </div>
                </div>

            </Split>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ตั้งค่า</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col space-y-3 p-2 ">
                                    {/* <div className="flex flex-col">
                                        <label className='text-lg mb-2' >เลือกภาษา</label>
                                        <select
                                            value={language}
                                            onChange={(e) => {
                                                setLanguage(e.target.value);
                                                onSelect(e.target.value); // Call onSelect function when language is changed
                                            }}
                                            className="flex border-2 border-[#282827] cursor-pointer items-center rounded-md focus:outline-none  w-full px-2 py-2 font-medium"
                                        >
                                            {languages.map(([lang, version]) => (
                                                <option key={lang} value={lang}>
                                                    {lang} ({version})
                                                </option>
                                            ))}
                                        </select>
                                    </div> */}
                                    <div className="flex flex-col">
                                        <label className='text-lg mb-2'>เลือกขนาดตัวอักษร</label>
                                        <select
                                            value={fontSize} onChange={(e) => setFontSize(e.target.value)}
                                            className="flex border-2 border-[#282827] cursor-pointer items-center rounded-md focus:outline-none  w-full px-2 py-2 font-medium"
                                        >
                                            <option value="12">12 px</option>
                                            <option value="14">14 px</option>
                                            <option value="16">16 px</option>
                                            <option value="18">18 px</option>
                                            <option value="20">20 px</option>
                                            {/* Add more font sizes as needed */}
                                        </select>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className='text-lg mb-2' >เลือกธีม</label>
                                        <select
                                            className="flex border-2 border-[#282827]  cursor-pointer items-center rounded-md focus:outline-none w-full px-2 py-2 font-medium"
                                            value={theme} onChange={(e) => setTheme(e.target.value)}
                                        >
                                            <option value="vs-dark">Dark</option>
                                            <option value="light">Light</option>
                                            {/* Add more themes as needed */}
                                        </select>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenModalSubmit} onOpenChange={onOpenChangeModalSubmit} placement='top-center'>
                <ModalContent  >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col  justify-center items-center gap-1">
                                <FiAlertCircle
                                    className='text-yellow-500 '
                                    size={60}
                                />
                                <p className='text-2xl'>คุณต้องการส่งคำตอบใช่หรือไม่</p>
                            </ModalHeader>
                            <ModalBody>
                                <p className='flex flex-col items-center justify-center space-y-1 px-6'>
                                    หากยังไม่มั่นใจสามารถตรวจสอบข้อมูลให้ถูกต้อง ก่อนที่จะกดปุ่ม "ยืนยัน"
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button
                                    isLoading={isLoadingSubmit}
                                    color="primary"
                                    onPress={onClose}
                                    onClick={submitCode}
                                >
                                    {isLoading ? "" : "ยืนยัน"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Playground;
