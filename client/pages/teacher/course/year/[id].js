import React, { useState } from 'react'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher';
import AddCourseYear from '../../../../components/Modals/AddCourseYear';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import bgYearAdd from '../../../../public/bgYearAdd.png'
import bgYear from '../../../../public/bgYear.png'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";


const TeacherCourse = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const menu = {

    };
    
    return (
        <div>

            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <HeaderBarTeacher />
                <div className="h-full mt-20 mb-4 ">
                    <div className="pl-20 mb-6">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อวิชา</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
                <main className="flex-1 pb-16 sm:pb-32">


                    <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
                        <div className=" rounded py-4  md:py-7 px-4 md:px-8 xl:px-10">
                            <div
                                className="relative flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0 rounded-lg p-3 border border-gray-200 bg-white"
                            >
                                <div className="w-full md:w-1/4 bg-white grid place-items-center">
                                    <img
                                        className="object-cover rounded"
                                        src={bgYearAdd}
                                    />

                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                    <h3 className="font-black md:text-2xl text-xl">
                                        courseName
                                    </h3>
                                    <div className="flex mt-4">
                                        <p className="md:text-lg  text-base"><span className='font-black' >ระดับชั้น :</span> <span className='text-gray-600' >มัธยมศึกษาปีที่ level</span>  </p>
                                    </div>
                                    <p className="md:text-lg text-gray-600 text-base">detail</p>

                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 my-8 mt-4">
                                <Tabs size={"lg"} aria-label="Tabs sizes">
                                    <Tab key="active" title="ปีการศึกษาปัจจุบัน" />
                                    <Tab key="music" title="ปีการศึกษาที่จัดเก็บ" />
                                </Tabs>
                            </div>
                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">

                                <div
                                    className="bg-white shadow-md rounded overflow-hidden hover:text-blue-500 "
                                >
                                    <div className="h-full w-full relative">
                                        <Image
                                            alt='courseYear'
                                            className="w-full h-full object-cover rounded-t"
                                            src={bgYearAdd} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <Button onPress={onOpen} variant='light' startContent={<AiOutlinePlus size={25} />}>เพิ่มปีการศึกษา</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/teacher/course/room/${menu.id}`}
                                >
                                    <div className="bg-white cursor-pointer shadow-md rounded ">
                                        <div className="h-full w-full relative">
                                            <Image className="w-full h-full object-cover rounded-t" src={bgYear} alt='courseYear' />
                                            <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                <p className="text-3xl">ปีการศึกษา</p>
                                                <p className="text-6xl font-semibold">2567</p>
                                            </div>
                                            <div className="absolute top-0 right-0 m-2">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button
                                                            variant="light"
                                                            size='sm'
                                                            startContent={<BsThreeDotsVertical size={25} />}
                                                        >

                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                                        <DropdownItem
                                                            key="new"
                                                        >
                                                            แก้ไข
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="edit"
                                                        >
                                                            คัดคลอก
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="keep"
                                                        >
                                                            จัดเก็บปีการศึกษา
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>

                                        </div>
                                    </div>
                                    </Link>
                                    <div className="bg-white cursor-pointer shadow-md rounded ">
                                        <div className="h-full w-full relative">
                                            <Image className="w-full h-full object-cover rounded-t" src={bgYear} alt='courseYear' />
                                            <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                <p className="text-3xl">ปีการศึกษา</p>
                                                <p className="text-6xl font-semibold">2567</p>
                                            </div>
                                            <div className="absolute top-0 right-0 m-3">
                                                <BsThreeDotsVertical
                                                    size={25}
                                                    className="text-gray-600 cursor-pointer"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="bg-white cursor-pointer shadow-md rounded ">
                                        <div className="h-full w-full relative">
                                            <Image className="w-full h-full object-cover rounded-t" src={bgYear} alt='courseYear' />
                                            <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                <p className="text-3xl">ปีการศึกษา</p>
                                                <p className="text-6xl font-semibold">2567</p>
                                            </div>
                                            <div className="absolute top-0 right-0 m-3">
                                                <BsThreeDotsVertical
                                                    size={25}
                                                    className="text-gray-600 cursor-pointer"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="bg-white cursor-pointer shadow-md rounded ">
                                        <div className="h-full w-full relative">
                                            <Image className="w-full h-full object-cover rounded-t" src={bgYear} alt='courseYear' />
                                            <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                <p className="text-3xl">ปีการศึกษา</p>
                                                <p className="text-6xl font-semibold">2567</p>
                                            </div>
                                            <div className="absolute top-0 right-0 m-3">
                                                <BsThreeDotsVertical
                                                    size={25}
                                                    className="text-gray-600 cursor-pointer"
                                                />
                                            </div>

                                        </div>
                                    </div>
                            </div>

                        </div>
                    </div>
                </main >
            </div >
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <AddCourseYear onClose={onClose} />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}

export default TeacherCourse