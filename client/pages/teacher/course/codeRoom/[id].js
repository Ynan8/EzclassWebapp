import React from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import Image from 'next/image';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import { MdLibraryBooks } from 'react-icons/md'
import { RiCodeBoxFill } from "react-icons/ri";
import { AiOutlinePlus } from 'react-icons/ai'
import bgYearAdd from '../../../../public/bgYearAdd.png'



const CodeRoom = () => {
    const list = [
        {
            title: "Orange",
            img: "/images/fruit-1.jpeg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "/images/fruit-2.jpeg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "/images/fruit-3.jpeg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "/images/fruit-4.jpeg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "/images/fruit-5.jpeg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "/images/fruit-6.jpeg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "/images/fruit-7.jpeg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "/images/fruit-8.jpeg",
            price: "$12.20",
        },
    ];
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarTeacher />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">

                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ไพทอนพื้นฐาน</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา 2567</BreadcrumbItem>
                            <BreadcrumbItem>บทเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    {/* <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                                สร้างห้องเรียนเขียนโค้ด
                            </Button>
                        </div>
                    </div> */}

                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <h2 className='text-3xl mb-6 mt-20 font-semibold'>ห้องเรียนเขียนโค้ด</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                                <Card shadow="sm" >
                                    <CardBody className="overflow-visible p-0">
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            
                                            className="w-full object-cover h-[140px]"
                                            src={bgYearAdd}
                                        />
                                    </CardBody>
                                    <CardFooter className="text-small justify-between">
                                        <b>title</b>
                                        <p className="text-default-500">test</p>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CodeRoom