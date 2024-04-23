import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, Listbox, ListboxSection, ListboxItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, ModalBody } from "@nextui-org/react";
import { FaBookOpen, FaCheckCircle, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks, MdQuiz, MdAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoAlertCircle } from "react-icons/io5";
import Image from 'next/image';
import find from '../../public/find.png'


const SectionAccordionStd = ({
    section,
    id,
    courseRoomStd,
    completedLessons,
    completedQuiz,
    completedAssignments,
}) => {




    return (
        <>
            {/* <pre>{JSON.stringify(completedAssignments, null, 4)}</pre> */}
            {section.length > 0 ? (
                <Accordion selectionMode="multiple" variant="splitted">
                    {section.map((item, index) => (
                        <AccordionItem
                            key={index}
                            className='p-3'
                            title={
                                <div className='flex items-center' >
                                    <p className='text-lg md:text-xl' >
                                        <span className='font-semibold'>บทที่ {index + 1}</span> {item.sectionName}
                                    </p>

                                    <div className="flex space-x-4 mr-4 ml-auto">
                                        <span
                                            onClick={() => {
                                                onOpenModalUpdate();
                                                handleSetCurrentSection(item._id);
                                            }}
                                            className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                            <CiEdit size={23} className="ml-auto" />
                                        </span>

                                        <span

                                            className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <GoTrash
                                                onClick={() => {
                                                    onOpenModalDelete();
                                                    openDeleteModal(item._id);
                                                }}
                                                size={20} className="" />
                                        </span>
                                    </div>
                                </div>
                            }
                            startContent={< FaBookOpen size={25} className="text-primary" />}
                        >
                            <div className="flex flex-col space-y-2 mb-2">
                                {item.lessonData?.map((lesson, lessonIndex) => (
                                    <div className='flex justify-between items-center bg-gray-100 p-4 rounded-md'>
                                        <div className='flex items-center space-x-2'>
                                            <div className="bg-primary/10 text-primary p-2 rounded-md">
                                                <MdLibraryBooks size={25} className="text-primary" />
                                            </div>
                                            <span className='font-semibold mr-2 sm:text-sm md:text-lg'>บทเรียนย่อยที่ {index + 1}.{lessonIndex + 1}</span>
                                            <p className='sm:text-sm md:text-lg'>{lesson.lessonName}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>


                            <div className="flex flex-col space-y-2 mb-2">
                                {item.quizData?.map((quiz, lessonIndex) => (
                                    <div className='flex justify-between items-center text-lg bg-gray-100 p-4 rounded-md'>
                                        <div className='flex items-center space-x-2' >
                                            <div className="bg-danger/10 text-danger p-2 rounded-md">
                                                <MdQuiz size={25} className="text-danger" />
                                            </div>
                                            <span className='font-semibold mr-2 sm:text-sm md:text-lg'>แบบทดสอบท้ายบทเรียน </span>
                                            <p className='sm:text-sm md:text-lg'>{quiz.quizName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col space-y-2 mb-2">
                                {item.AssignmentData?.map((assignment, lessonIndex) => (
                                    <div className='flex justify-between items-center text-lg bg-gray-100 p-4 rounded-md'>
                                        <div className='flex items-center space-x-2' >
                                            <div className="bg-warning/10 text-warning p-2 rounded-md">
                                                <MdAssignment size={25} className="text-warning" />
                                            </div>
                                            <span className='font-semibold mr-2 sm:text-sm md:text-lg'>งานชิ้นที่ {lessonIndex + 1} </span>
                                            <p className='sm:text-sm md:text-lg'>{assignment.assignmentName}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </AccordionItem >
                    ))}
                </Accordion>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-[400px]">
                    <Image
                        width={250}
                        height={200}
                        alt="No course"
                        src={find}
                    />
                    <p className="md:text-2xl sm:text-lg text-gray-800">ยังไม่มีบทเรียนในขณะนี้</p>
                </div>
            )}
        </>
    );
};

export default SectionAccordionStd;
