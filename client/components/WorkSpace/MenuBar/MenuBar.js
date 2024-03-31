import { Tabs, Tab, Button, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, Modal, Input, Avatar, User, Tooltip } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaTrophy, FaUsers } from 'react-icons/fa';
import { BsSend } from "react-icons/bs";
import Client from '../Client';
import { IoChatbox } from "react-icons/io5";
import { useRouter } from 'next/router'
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
import { initSocket } from '../../../socket';
import { IoIosCopy } from "react-icons/io";




const MenuBar = ({
    clients,
    userData,
    roomId,
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    codeJoin,
}) => {
    const [isLoadingLeave, setIsLoadingLeave] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const { id } = router.query;
    const socketRef = useRef(null);

    const lastMessageRef = useRef();




    const leaveRoom = () => {
        setIsLoadingLeave(true); // Set loading to true

        // Simulate a delay to leave the room (e.g., API call)
        setTimeout(() => {
            router.push(`/${userData.role}/home`);
            setIsLoadingLeave(false); // Set loading to false
        }, 1000); // Adjust the delay as needed
    };



    // Send Message
    const sendMessage = async (message) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/messages/send/${id}`, {
                message,
                codeRoomId: id,
            });

            if (response && response.data) {
                console.log('Message sent:', response.data);
            } else {
                console.error('Error sending message: No response data');
            }
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
        }
    };


    // const handleSendMessage = async () => {
    //     if (inputMessage.trim() !== '') {
    //         await sendMessage(inputMessage);
    //         setInputMessage('');
    //     }
    // };

    const [inputMessage, setInputMessage] = useState('');

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };


    //Get Message
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/messages/${id}`);
            if (response && response.data) {
                setMessages(response.data);
            } else {
                console.error('Error getting messages: No response data');
            }
        } catch (error) {
            console.error('Error getting messages:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getMessages();
    }, [, id]);


    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            // Existing event listeners...

            // Listen for received chat messages
            socketRef.current.on("receiveChatMessage", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        };
        init();

        // Clean up
        return () => {
            if (socketRef.current) {
                socketRef.current.off("receiveChatMessage");
            }
        };
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            await sendMessage(inputMessage);
            setInputMessage('');
            socketRef.current.emit("sendChatMessage", {
                roomId: roomId,
                message: {
                    senderId: userData._id,
                    message: inputMessage,
                    createdAt: new Date().toISOString(), // Add a timestamp
                }
            });
            setInputMessage('');
            getMessages();
        }
    };


    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);


    return (
        <div className='min-h-screen bg-[#282827]'>
            <div className='flex flex-col px-0  min-h-screen'>
                {/* <pre>{JSON.stringify(userData, null, 4)}</pre> */}
                <Tabs
                    size='md'
                    className='flex justify-center mt-4'
                    aria-label="Options"
                    color="primary"
                    variant="bordered" >
                    <Tab
                        key="user"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaUsers />
                                <span>ผู้เข้าร่วม</span>
                            </div>
                        }
                    >
                        {/* <div className=" text-lg pl-3 mt-6  text-white text-center">อันดับคะแนน</div> */}
                        {/* <div className="flex justify-center items-center space-x-20 mt-3">
                            <div className="flex flex-col justify-center items-center text-white">
                                <p className='mb-2 text-2xl' >2</p>
                                <Avatar size='lg' className='w-16 h-16' isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <p className='mt-2' >2 คะแนน</p>
                            </div>
                            <div className="flex flex-col justify-center items-center text-white">
                                <p className='mb-2 text-2xl' ><FaTrophy className='text-yellow-500 shadow-md' size={30} /></p>
                                <Avatar size='lg' className='w-20 h-20 ' isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                <p className='mt-2 mb-16' >5 คะแนน</p>
                            </div>
                            <div className="flex flex-col justify-center items-center text-white">
                                <p className='mb-2 text-2xl' >3</p>
                                <Avatar size='lg' className='w-16 h-16' isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                                <p className='mt-2' >3 คะแนน</p>
                            </div>

                        </div> */}
                        <div className="flex flex-col items-center pl-3 my-4">
                            <p className='text-lg text-white' >รหัสเข้าร่วม:</p>
                            <Button
                                size="md"
                                className='px-24 text-lg'
                                color="primary"
                                endContent={
                                    <IoIosCopy />
                                }
                            >
                                {codeJoin}
                            </Button>
                        </div>

                        <div className=" text-lg pl-3 mt-6 text-white">ผู้เข้าร่วม {clients.length} คน</div>
                        <div
                            onClick={() => userData.role === "teacher" ? onOpen() : null}
                            className="cursor-pointer grid grid-cols-2 gap-4 my-4">
                            {clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    firstName={client.firstName}
                                    userData={userData}
                                />
                            ))}
                        </div>

                    </Tab>

                    <Tab
                        key="chatRoom"
                        title={
                            <div className="flex items-center space-x-2">
                                <IoChatbox />
                                <span>แชท</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col items-center justify-center h-[750px] bg-[#282827] text-gray-800 p-10">
                            <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden ">
                                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                                    {messages.map((msg, index) => {
                                        const fromMe = msg.senderId === userData._id; // Check if the message is from the current user
                                        const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-400"; // Set background color based on sender

                                        // Find the user object corresponding to the senderId of the message
                                        const senderUser = clients.find(user => user._id === msg.senderId);

                                        return (
                                            <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null} className={`flex w-full mt-2 space-x-3 max-w-xs ${fromMe ? "justify-end" : ""}`}>
                                                {!fromMe && <User src={senderUser ? senderUser.image : null} name={senderUser ? senderUser.firstName : ''} />}
                                                <div>
                                                    <Tooltip
                                                        showArrow
                                                        placement="right"
                                                        content={
                                                            <>
                                                                <div className="chat-footer opacity-50 text-sm flex gap-1 p-2 items-center">
                                                                    {moment(msg.createdAt).locale('th').format('LLL')}
                                                                </div>
                                                            </>
                                                        }
                                                        classNames={{
                                                            base: [
                                                                "before:bg-neutral-400 dark:before:bg-white",
                                                            ],

                                                        }}
                                                    >
                                                        <div className={`p-3 rounded-lg ${bubbleBgColor}`}>
                                                            <p className="chat-bubble text-white">{msg.message}</p>
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                                <div className="bg-gray-300 p-2 w-full relative">
                                    <input
                                        className="flex items-center h-10 w-full rounded px-3 text-sm"
                                        type="text"
                                        placeholder="Type your message…"
                                        value={inputMessage}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button onClick={handleSendMessage} type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 mr-3'>
                                        <BsSend />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                <div className="flex flex-col space-y-4 items-center justify-center mt-auto mb-10">
                    <Button
                        onClick={leaveRoom}
                        size="md"
                        className='px-24'
                        color="danger"
                        variant="shadow"
                        disabled={isLoadingLeave} // Disable the button while loading
                        isLoading={isLoadingLeave}
                  >
                        {isLoadingLeave ? 'กำลังออกจากห้อง...' : 'ออกจากห้อง'}
                    </Button>
                </div>
            </div>
            <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">ให้คะแนน</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col space-y-2 justify-center items-center">
                                    <p className='text-lg' >คะแนนสะสม : <span className='font-semibold'>5</span></p>
                                    <Avatar className='w-14 h-14' size='lg' name="Junior" />
                                    <p>นันฐวุฒิ ต้นสวรรค์</p>
                                </div>
                                <Input
                                    type="number"
                                    variant='bordered'
                                    placeholder="กรุณากรอกคะแนน"
                                />
                                <p className='text-center text-red-500' >*หมายเหตุ สามารถลบคะแนนผู้เรียนได้โดยใส่เครื่องหมาย - เช่น -1</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default MenuBar;
