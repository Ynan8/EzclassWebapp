import React, { useContext, useEffect, useState } from 'react'
import TeacherRoute from '../../../../components/Routes/TeacherRoute';
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import Image from 'next/image';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input, Listbox, ListboxItem, ListboxSection, Skeleton } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaPlus, FaUsers } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import { MdContentCopy, MdLibraryBooks, MdQuiz } from 'react-icons/md'
import { RiCodeBoxFill } from "react-icons/ri";
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai'
import BgCodeRoom from '../../../../public/BgCodeRoom.png'
import bgYearAdd from '../../../../public/bgYearAdd.png'
import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { Context } from '../../../../context';
import Link from 'next/link';



const CodeRoom = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const { id } = router.query;
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };



    const { state: { user }, dispatch } = useContext(Context);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        if (user && user.firstName) {
            setFirstName(user.firstName);
        }
    }, [user]);

    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (id) {
            loadCourseYear();
            loadCodeRoom();
        }
    }, [id]);

    const loadCourseYear = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${id}`);
            // Select the first element from the array (if it exists)
            const firstElement = data && data.length > 0 ? data[0] : {};
            setCourseYear(firstElement);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const courseId = courseYear.courseId;

    const [course, setCourse] = useState({});


    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [courseId]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }


    const [codeRoom, setCodeRoom] = useState([]);

    const loadCodeRoom = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/codeRoom`, {
                params: {
                    courseYearId: id,
                },
            });
            setCodeRoom(data)
            console.log(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        } finally {
            setIsLoading(false);  // Set loading to false after fetching data
        }
    };

    const handleStartTeaching = (roomId) => () => {
        router.push({
            pathname: `/editor/${roomId}`,
            query: { firstName },
        });
    };



    const menu = {
        id: id
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
        <TeacherRoute>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={id} />
                <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
                <div className="h-full mt-28 mb-10 md:ml-64">
                    <div className="px-10">

                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href={'/teacher/home'} >
                                    หน้าหลัก
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href={'/teacher/home'} >
                                    {course.courseName} ม.{course.level}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href={`/teacher/course/year/${course._id}`}>
                                    ปีการศึกษา {courseYear.year}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียนเขียนโค้ด</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <Link href={`/teacher/course/codeRoom/create/${courseId}/?courseYear=${id}`} >
                                <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                                    สร้างห้องเรียนเขียนโค้ด
                                </Button>
                            </Link>
                            <Button onPress={onOpen} color="warning" variant="bordered" size='lg' radius="md" startContent={<FaUsers />}>
                                เข้าร่วมห้องเรียนเขียนโค้ด
                            </Button>
                        </div>
                        {/* Modal */}

                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="p-4 w-full flex items-center gap-3">
                                        <Skeleton className="flex rounded-full w-12 h-12" />
                                        <div className="w-full flex flex-col gap-3">
                                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Listbox variant="flat" aria-label="Listbox menu with sections">
                                    <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                        {codeRoom && codeRoom.map(codeRoom => (
                                            <ListboxItem
                                                className='mb-2 p-3'
                                                key="delete"
                                                title={
                                                    <div
                                                      //  onClick={handleStartTeaching(codeRoom._id)}
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
                                                                size="md"
                                                                variant="flat"
                                                            >
                                                                เผยแพร่
                                                            </Chip>
                                                            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                <CiEdit size={23} className="ml-auto" />
                                                            </span>
                                                            <span
                                                                className="text-lg text-danger cursor-pointer active:opacity-50">
                                                                <GoTrash size={20} className="" />
                                                            </span>
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">รหัสเข้าร่วมห้องเรียนเขียนโค้ด</ModalHeader>
                            <ModalBody>
                                <Input
                                    type="text"
                                    placeholder='กรอกรหัสเข้าร่วม'
                                    variant="bordered"
                                    className="w-full"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    เข้าร่วม
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </TeacherRoute>
    )
}

export default CodeRoom