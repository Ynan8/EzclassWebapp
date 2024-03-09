import React, { useEffect, useState } from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import Image from 'next/image';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input, Link, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import { MdContentCopy, MdLibraryBooks } from 'react-icons/md'
import { RiCodeBoxFill } from "react-icons/ri";
import { AiOutlinePlus } from 'react-icons/ai'
import BgCodeRoom from '../../../../public/BgCodeRoom.png'
import bgYearAdd from '../../../../public/bgYearAdd.png'
import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';



const CodeRoom = () => {
    const router = useRouter();
    const { id } = router.query;


    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (id) {
            loadCourseYear();
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

    const courseId = courseYear.courseId

    console.log(courseId)

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
                            <BreadcrumbItem>ไพทอนพื้นฐาน</BreadcrumbItem>
                            <BreadcrumbItem>2567</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียนเขียนโค้ด</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>


                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <h2 className='text-3xl mb-6 mt-20 font-semibold'>ห้องเรียนเขียนโค้ด</h2>


                            <div className="flex flex-wrap gap-4 my-8 mt-4">

                                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                                    <Link href={`/teacher/course/codeRoom/create/${courseId}/?courseYear=${id}`} >
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
                                    </Link>
                                    <Link
                                        href={`/teacher/course/codeRoom/info-steaming/[id]`}
                                    >
                                        <Card className="py-3">
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
                                                                <DropdownItem
                                                                    key="edit"
                                                                // onClick={() => {
                                                                //     onOpenModalUpdate();
                                                                //     setCurrentCourseYear(yearData);
                                                                // }}
                                                                >
                                                                    <p>แก้ไข</p>
                                                                </DropdownItem>


                                                                <DropdownItem key="archived">
                                                                    <p>จัดเก็บ</p>
                                                                </DropdownItem>

                                                            </DropdownSection>
                                                            <DropdownSection>
                                                                <DropdownItem
                                                                    key="delete"
                                                                    className="text-danger"
                                                                    color="danger"
                                                                // onPress={onOpenModalDelete}
                                                                >
                                                                    <p>
                                                                        ลบปีการศึกษา
                                                                    </p>
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
                                                <p className='md:text-2xl sm:text-lg font-semibold'>โปรแกรมคำนวนเกรด</p>
                                            </CardFooter>
                                        </Card>
                                    </Link>
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