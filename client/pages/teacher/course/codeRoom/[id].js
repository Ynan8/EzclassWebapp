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
import { GiProgression } from "react-icons/gi";
import toast from 'react-hot-toast';
import find from '../../../../public/find.png';




const CodeRoom = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();
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

    const handleEdit = (roomId) => () => {
        router.push({
            pathname: `/teacher/course/codeRoom/edit/${roomId}`,
            query: { courseYear: id },
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

    // Delete Code room
    const [codeRoomId, setCodeRoomId] = useState("");

    const openDeleteModal = (id) => {
        setCodeRoomId(id);
        onOpenModalDelete();
    };

    const handleDeleteCodeRoom = async (codeRoomId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-codeRoom/${codeRoomId}`);

            toast.success('ลบห้องเรียนเขียนโค้ดสำเร็จ');
            loadCodeRoom();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบห้องเรียนเขียนโค้ดได้');
        }
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

                    <div className="flex p-8">
                        <div className="flex space-x-2 ml-auto">
                            <Link href={`/teacher/course/codeRoom/create/${courseId}/?courseYear=${id}`}>
                                <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                                    สร้างห้องเรียนเขียนโค้ด
                                </Button>
                            </Link>
                            <Link href={`/teacher/course/codeRoom/progress/${courseId}/?courseYear=${id}`}>
                                <Button color="warning" className='text-white' variant="shadow" size='lg' radius="md" startContent={<GiProgression />}>
                                    ดูความคืบหน้า
                                </Button>
                            </Link>
                        </div>
                    </div>


                    <div className="px-4 w-full">
                        <div className=" flex flex-col item-center justify-center">
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
                                <div>
                                    {codeRoom.length > 0 ? (
                                        <Listbox variant="flat" aria-label="Listbox menu with sections">
                                            <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                                {codeRoom.map((codeRoom) => {
                                                    let statusColor = "default";
                                                    statusColor = codeRoom.Published === "public" ? "success" : "default";
                                                    return (
                                                        <ListboxItem
                                                            onClick={handleEdit(codeRoom._id)}
                                                            className="mb-2 p-3"
                                                            key={codeRoom._id}
                                                            title={
                                                                <div className="flex items-center text-lg">
                                                                    <div className="flex flex-col space-y-2 p-3">
                                                                        <p className='text-lg md:text-xl' >
                                                                            <span className="font-semibold p-2">{codeRoom.codeRoomName}</span>
                                                                        </p>
                                                                        <div className="flex p-2 items-center font-normal border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                                                            <span className="mr-1 text-sm md:text-base hidden md:inline-block">ระดับความยาก:</span>
                                                                            {renderStars(codeRoom.Difficulty)}
                                                                        </div>

                                                                    </div>
                                                                    <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                                        <Chip
                                                                            className="capitalize"
                                                                            color={statusColor}
                                                                            size="lg"
                                                                            variant="flat"
                                                                        >
                                                                            {codeRoom.Published === "public" ? "เผยแพร่" : "แบบร่าง"}
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
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-[400px]">
                                            <Image width={250} height={200} alt="No course" src={find} />
                                            <p className="md:text-2xl sm:text-lg text-gray-800">ยังไม่มีห้องเรียนเขียนโค้ดในขณะนี้</p>
                                            <p className="md:text-lg sm:text-text-base text-gray-600">
                                                คลิกที่ปุ่ม <span className="text-blue-800 font-semibold">สร้างห้องเรียนเขียนโค้ด</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
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

            {/* Delete */}
            < Modal
                isOpen={isOpenModalDelete}
                onOpenChange={onOpenChangeModalDelete}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องลบห้องเรียนเขียนโค้ดหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบห้องเรียนเขียนโค้ดจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteCodeRoom(codeRoomId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </TeacherRoute>
    )
}

export default CodeRoom