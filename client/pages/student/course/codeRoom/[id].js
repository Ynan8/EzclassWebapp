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
import { BreadcrumbItem, Breadcrumbs, Button, Chip, Input, Listbox, ListboxItem, ListboxSection, useDisclosure } from '@nextui-org/react';
import { RiCodeBoxFill } from 'react-icons/ri';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import JoinRoom from '../../../../components/CodeRoomForm/JoinRoom';


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

    
    const handleStartLearning = (roomId) => () => {
        router.push({
            pathname: `/editor/${roomId}`,
            query: { firstName },
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
                    <div className="flex p-8 ">
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
                        {/* Modal */}

                    </div>
                    <div className="px-12 pt-8 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {/* <pre>{JSON.stringify(codeRoom, null, 4)}</pre> */}
                            <Listbox variant="flat" aria-label="Listbox menu with sections">
                                <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                    {codeRoom && codeRoom.map(codeRoom => (
                                        <ListboxItem
                                        onClick={handleStartLearning(codeRoom._id)}
                                            className='mb-2 p-3'
                                            key="delete"
                                            title={
                                                <div
                                                    className='flex items-center text-lg' >
                                                    <div className="flex flex-col space-y-2 p-3">
                                                        <p>
                                                            <span className='font-semibold p-2' >{codeRoom.codeRoomName}</span>
                                                        </p>
                                                        <div className="flex text-sm p-2 items-center font-normal  border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                                            <span className='mr-1' >ระดับความยาก:</span>
                                                            {renderStars(codeRoom.Difficulty)}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                        <Chip
                                                            className="capitalize"
                                                            color="success"
                                                            size="lg"
                                                            variant="flat"
                                                            startContent={ <FaCheckCircle /> }
                                                        >
                                                            ผ่านแล้ว
                                                        </Chip>
                                                    </div>

                                                </div>
                                            }
                                            startContent={
                                                <div className="bg-secondary/10 text-secondary p-2 rounded-md">
                                                    <RiCodeBoxFill size={25} className="text-secondary" />
                                                </div>
                                            }

                                        >
                                        </ListboxItem>
                                    ))}

                                </ListboxSection>
                            </Listbox>
                        </div>
                    </div>
                </div>
            </div>
            <JoinRoom
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleStartLearning={handleStartLearning}
            />
        </StudentRoute >
    )
}

export default CodeRoomStudent