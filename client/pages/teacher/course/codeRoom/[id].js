import React, { useContext, useEffect, useState } from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import Image from 'next/image';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input, Link, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import { MdContentCopy, MdLibraryBooks, MdQuiz } from 'react-icons/md'
import { RiCodeBoxFill } from "react-icons/ri";
import { AiOutlinePlus } from 'react-icons/ai'
import BgCodeRoom from '../../../../public/BgCodeRoom.png'
import bgYearAdd from '../../../../public/bgYearAdd.png'
import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { Context } from '../../../../context';



const CodeRoom = () => {
    const router = useRouter();
    const { id } = router.query;



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




    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarTeacher courseYearId={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">

                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>{course.courseName} ม.{course.level}</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
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
                        </div>
                        {/* Modal */}

                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <Listbox variant="flat" aria-label="Listbox menu with sections">
                                <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                    {codeRoom && codeRoom.map(codeRoom => (
                                        <ListboxItem
                                            className='mb-2 p-3'
                                            key="delete"
                                            title={
                                                <div
                                                    onClick={handleStartTeaching(codeRoom._id)}
                                                    className='flex items-center text-lg' >
                                                    <p>
                                                        <span className='font-semibold' >{codeRoom.codeRoomName}</span>
                                                    </p>
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
                            <div className="flex flex-col text-center mt-4">
                                {codeRoom.length === 0 ? (
                                    <>
                                        <h1 className='text-4xl font-bold text-gray-500 mb-3' >ยังไม่มีห้องเรียนเขียนโค้ด</h1>
                                        <p className="text-gray-600">
                                            คุณยังไม่มีห้องเรียนเขียนโค้ดในรายวิชานี้ คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>สร้างห้องเรียนเขียนโค้ด</span> เพื่อสร้างห้องเรียนเขียนโค้ด
                                        </p>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 my-8 mt-4">

                                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                                    {/* <Link href={`/teacher/course/codeRoom/create/${courseId}/?courseYear=${id}`} >
                                        <div
                                            className="cursor-pointer  bg-white shadow-md border rounded-xl overflow-hidden hover:text-blue-500 "
                                        >
                                            <div className="h-full w-full relative">
                                                <Image
                                                    alt='addCourseYear'
                                                    className="w-full h-full object-cover rounded-t"
                                                    src={bgYearAdd}
                                                />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <div className="flex flex-col items-center justify-center space-y-2">
                                                        <p className="text-xl"><AiOutlinePlus size={45} /></p>
                                                        <p className="text-2xl">สร้างห้องเรียนเขียนโค้ด</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link> */}

                                    {/* {codeRoom && codeRoom.map(codeRoom => (
                                        <Card
                                            className="py-3">
                                            <CardHeader className="flex-col items-start">
                                                <div className="absolute top-0 right-0 m-2">
                                                    <Dropdown>
                                                        <DropdownTrigger>
                                                            <Button
                                                                size='sm'
                                                                variant="light"
                                                                startContent={<BsThreeDotsVertical size={18} />}
                                                            />
                                                        </DropdownTrigger>
                                                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                            <DropdownSection showDivider>
                                                                <DropdownItem key="edit">
                                                                    <p>แก้ไข</p>
                                                                </DropdownItem>
                                                                <DropdownItem key="archived">
                                                                    <p>จัดเก็บ</p>
                                                                </DropdownItem>
                                                            </DropdownSection>
                                                            <DropdownSection>
                                                                <DropdownItem key="delete" className="text-danger" color="danger">
                                                                    <p>ลบปีการศึกษา</p>
                                                                </DropdownItem>
                                                            </DropdownSection>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="overflow-visible ">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={BgCodeRoom}
                                                />
                                            </CardBody>
                                            <CardFooter className="flex justify-center items-center">
                                                <button
                                                    onClick={handleStartTeaching(codeRoom._id)}
                                                    className='md:text-2xl sm:text-lg font-semibold'>
                                                    {codeRoom.codeRoomName}
                                                </button>
                                            </CardFooter>
                                        </Card>


                                    ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CodeRoom