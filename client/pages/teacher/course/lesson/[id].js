import React, { useState } from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input, Tooltip, Chip } from "@nextui-org/react";
import { FaPlus, FaRegEdit, FaTrash } from 'react-icons/fa';
import { MdAssignment, MdLibraryBooks, MdQuiz } from 'react-icons/md';
import { Accordion, AccordionItem } from "@nextui-org/react";
import AddCourseYear from '../../../../components/Modals/AddCourseYear';
import { BsBook } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiSearch } from "react-icons/ci";
import { Listbox, ListboxItem, ListboxSection, cn } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Link } from "@nextui-org/react";
import AddSection from '../../../../components/Modals/AddSection';

const LessonCourse = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


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
                    <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <Button onPress={onOpen} color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                                สร้างบทเรียน
                            </Button>
                        </div>
                        {/* Modal */}

                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <div className="flex flex-col space-y-4">
                                <Accordion selectionMode="multiple" variant="splitted" >
                                    <AccordionItem
                                        className='p-3'
                                        title={
                                            <div className='flex items-center' >
                                                <p className='text-xl' >
                                                    <span className='font-semibold ' >บทที่ 1</span> พื้นฐานไพทอน
                                                </p>
                                                <div className="flex space-x-4 mr-4 ml-auto">
                                                    <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                        <CiEdit size={23} className="ml-auto" />
                                                    </span>
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                        <GoTrash size={20} className="" />
                                                    </span>

                                                </div>
                                            </div>
                                        }
                                        startContent={<FaBookOpen size={25} className="text-primary" />}
                                    >
                                        <Listbox variant="flat" aria-label="Listbox menu with sections">
                                            <ListboxSection title="บทเรียนย่อย" showDivider>
                                                <ListboxItem
                                                    key="new"
                                                    title={
                                                        <div className='flex items-center text-lg' >
                                                            <p>
                                                                <span className='font-semibold' >บทเรียนย่อยที่ 1.1</span> พื้นฐานไพทอน
                                                            </p>
                                                            <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                                <Chip className="capitalize" color={"success"} size="md" variant="flat">
                                                                    เผยแพร่
                                                                </Chip>
                                                                <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                    <CiEdit size={23} className="ml-auto" />
                                                                </span>
                                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                                    <GoTrash size={20} className="" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    }
                                                    startContent={
                                                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                                                            <MdLibraryBooks size={25} className="text-primary" />
                                                        </div>
                                                    }


                                                >
                                                </ListboxItem>
                                            </ListboxSection>

                                            <ListboxSection title="แบบทดสอบท้ายบทเรียน" showDivider>
                                                <ListboxItem
                                                    key="delete"
                                                    title={
                                                        <div className='flex items-center text-lg' >
                                                            <p>
                                                                <span className='font-semibold' >แบบทดสอบท้ายบทเรียน</span> พื้นฐานไพทอน
                                                            </p>
                                                            <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                                <Chip className="capitalize" color={"success"} size="md" variant="flat">
                                                                    เผยแพร่
                                                                </Chip>
                                                                <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                    <CiEdit size={23} className="ml-auto" />
                                                                </span>
                                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                                    <GoTrash size={20} className="" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    }
                                                    startContent={
                                                        <div className="bg-danger/10 text-danger p-2 rounded-md">
                                                            <MdQuiz size={25} className="text-danger" />
                                                        </div>
                                                    }

                                                >
                                                </ListboxItem>
                                            </ListboxSection>

                                            <ListboxSection title="งานที่มอบหมาย" showDivider>
                                                <ListboxItem
                                                    key="delete"
                                                    title={
                                                        <div className='flex items-center text-lg' >
                                                            <p>
                                                                <span className='font-semibold' >งานชิ้นที่ 1</span> พื้นฐานไพทอน
                                                            </p>
                                                            <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                                <Chip className="capitalize" color={"success"} size="md" variant="flat">
                                                                    เผยแพร่
                                                                </Chip>
                                                                <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                    <CiEdit size={23} className="ml-auto" />
                                                                </span>
                                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                                    <GoTrash size={20} className="" />
                                                                </span>

                                                            </div>
                                                        </div>
                                                    }
                                                    startContent={
                                                        <div className="bg-warning/10 text-warning p-2 rounded-md">
                                                            <MdAssignment size={25} className="text-warning" />
                                                        </div>
                                                    }

                                                >

                                                </ListboxItem>
                                            </ListboxSection>

                                            <ListboxItem
                                                variant="light"
                                                className='hover:bg-transparent'
                                            >
                                                <div className="flex space-x-4">
                                                    <Button className='text-base' startContent={<FaPlus />} color="primary" variant="ghost">
                                                        บทเรียนย่อย
                                                    </Button>
                                                    <Button className='text-base' startContent={<FaPlus />} color="primary" variant="ghost">
                                                        แบบทดสอบท้ายบทเรียน
                                                    </Button>
                                                    <Button className='text-base' startContent={<FaPlus />} color="primary" variant="ghost">
                                                        มอบหมายงาน
                                                    </Button>
                                                </div>
                                            </ListboxItem>


                                        </Listbox>
                                    </AccordionItem>
                                </Accordion>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <AddSection onClose={onClose} />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LessonCourse