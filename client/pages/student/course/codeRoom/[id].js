import axios from 'axios';
import StudentRoute from '../../../../components/Routes/StudentRoute';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { BiCheck, BiCodeAlt } from 'react-icons/bi';
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';
import { Context } from '../../../../context';
import { BreadcrumbItem, Breadcrumbs, Button, Chip, Input, Listbox, ListboxItem, ListboxSection, Spinner, useDisclosure } from '@nextui-org/react';
import { RiCodeBoxFill } from 'react-icons/ri';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import JoinRoom from '../../../../components/CodeRoomForm/JoinRoom';
import { BsExclamationCircle } from 'react-icons/bs';
import { IoAlertCircle } from "react-icons/io5";


const CodeRoomStudent = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };
    // Load course 
    const [course, setCourse] = useState({});

    const router = useRouter();
    const { id } = router.query;

    const { state: { user }, dispatch } = useContext(Context);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        if (user && user.firstName) {
            setFirstName(user.firstName);
        }
    }, [user]);

    const [userData, setUserData] = useState('');


    useEffect(() => {
        if (user) {
            setUserData(user)
        }
    }, [user]);

    const generateRoomId = (length = 5) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const [joinCode, setJoinCode] = useState(generateRoomId());

    const generateNewRoomId = () => {
        setJoinCode(generateRoomId());
    };

    useEffect(() => {
        const interval = setInterval(generateNewRoomId, 3600000); // Generate new room ID every 1 hour

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, []);


    const [isStartingLearning, setIsStartingLearning] = useState(false);

    const handleStartLearning = (roomId) => () => {
        setIsStartingLearning(true); // Set loading to true

        router.push({
            pathname: `/editor/${roomId}`,
            query: {
                firstName,
                joinCode
            },
        }).then(() => {
            setIsStartingLearning(false); // Set loading to false after navigation is complete
        }).catch((error) => {
            console.error('Navigation error:', error);
            setIsStartingLearning(false); // Set loading to false if navigation fails
        });
    };


    const handleToRoom = (roomId, password) => () => {
        router.push({
            pathname: `/editor/${roomId}`,
            query: {
                firstName,
                password
            }
        });
    };



    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();
        }
    }, [id]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    // Get course Year Id
    const [courseYearId, setCourseYearId] = useState()
    const loadCourseYearId = async () => {
        if (id) {

            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseYearId/${id}`);
                setCourseYearId(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }
    useEffect(() => {
        if (courseYearId) {
            loadCodeRoom();
        }
    }, [courseYearId]);


    // Show CodeRoom
    const [codeRoom, setCodeRoom] = useState([])


    const loadCodeRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/codeRoom`, {
                params: {
                    courseYearId: courseYearId,
                },
            });
            setCodeRoom(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }

    // Show Course Room
    const [courseRoomStd, setCourseRoomStd] = useState({})
    useEffect(() => {
        loadCourseRoomStd()
    }, [id])

    const loadCourseRoomStd = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomStd/${id}/${user._id}`);
            setCourseRoomStd(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const renderStars = (difficulty) => {

        const starArray = Array.from({ length: 5 }, (_, index) => index <= difficulty);

        return (
            <>
                {starArray.map((isFilled, index) => (
                    <AiFillStar
                        key={index}
                        className={isFilled ? 'text-[#FFDC5C]' : ''}
                        size={20}
                    />
                ))}
            </>
        );
    };


    const [stdSubmitCodeAll, setStdSubmitCodeAll] = useState({});

    useEffect(() => {
        if (id) {
            loadStdSubmitCodeAll();
        }
    }, [id]);


    const loadStdSubmitCodeAll = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std-submitCodeAll/${id}`);
            setStdSubmitCodeAll(data);
            console.log("Loading student submit code all", data);
        } catch (error) {
            console.error("Error loading course:", error);
        } finally {
        }
    };


    return (
        <StudentRoute>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarStudent mobileSidebarOpen={mobileSidebarOpen} id={id} />
                <HeaderBarStd handleSidebarToggle={toggleSidebar} />
                <div className="h-full  mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href='/student/home' >
                                    หน้าหลัก
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href='/student/home' >
                                    {course.courseName} {courseRoomStd.roomName}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียนเขียนโค้ด</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    {/* <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <Button
                                onPress={onOpen}
                                color="warning"
                                variant="bordered"
                                size='lg'
                                radius="md"
                                startContent={<FaUsers />}>
                                เข้าร่วมห้องเรียนเขียนโค้ด
                            </Button>
                        </div>
                    </div> */}
                    <div className="px-12 pt-8 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {/* <pre>{JSON.stringify(stdSubmitCodeAll, null, 4)}</pre> */}
                            {isStartingLearning ? (
                                <div className="flex space-x-2 items-center justify-center">
                                    <Spinner size="lg" /> <p>กำลังไปที่หน้าห้องเรียนเขียนโค้ด...</p>
                                </div>
                            ) : (
                                <Listbox
                                    disabledKeys={isStartingLearning ? codeRoom.map(room => room._id) : []}
                                    variant="flat" aria-label="Listbox menu with sections">
                                    <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                        {codeRoom && codeRoom.map(codeRoom => {
                                            // Find the submission status for the current codeRoom
                                            const submission = stdSubmitCodeAll.find(submission => submission.codeRoomId === codeRoom._id);
                                            // Determine the status text and color for the Chip component
                                            let statusText = "ยังไม่เคยทำ";
                                            let statusColor = "default"; // Set default color here
                                            if (submission) {
                                                statusText = submission.status === "passed" ? "ผ่านแล้ว" : "ยังทำไม่เสร็จ";
                                                statusColor = submission.status === "passed" ? "success" : "danger";
                                            }


                                            return (
                                                <ListboxItem
                                                    key={codeRoom._id}
                                                    onClick={handleStartLearning(codeRoom._id)}
                                                    className='mb-2 p-3'
                                                    disabled={isStartingLearning}
                                                    title={
                                                        <div className='flex items-center text-lg'>
                                                            <div className="flex flex-col space-y-2 p-3">
                                                                <p>
                                                                    <span className='font-semibold p-2'>{codeRoom.codeRoomName}</span>
                                                                </p>
                                                                <div className="flex text-sm p-2 items-center font-normal border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                                                    <span className='mr-1'>ระดับความยาก:</span>
                                                                    {renderStars(codeRoom.Difficulty)}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                                <Chip
                                                                    className={`capitalize ${statusColor === 'success' ? 'text-green-500' : statusColor === 'danger' ? 'text-red-500' : 'text-gray-500'}`}
                                                                    color={statusColor}
                                                                    size="lg"
                                                                    variant="flat"
                                                                    startContent={submission && submission.status === 'passed' ? <FaCheckCircle size={30} /> : <IoAlertCircle size={30} />}
                                                                >
                                                                    <span className='font-semibold'>{statusText}</span>

                                                                </Chip>

                                                            </div>
                                                        </div>
                                                    }
                                                    startContent={
                                                        <div className="bg-secondary/10 text-secondary p-2 rounded-md">
                                                            <RiCodeBoxFill size={25} className="text-secondary" />
                                                        </div>
                                                    }
                                                />

                                            );
                                        })}
                                    </ListboxSection>

                                </Listbox>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <JoinRoom
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleStartLearning={handleStartLearning}
                handleToRoom={handleToRoom}
            />
        </StudentRoute >
    )
}

export default CodeRoomStudent