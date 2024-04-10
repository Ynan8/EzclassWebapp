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
            <Accordion selectionMode="multiple" variant="splitted">
                {section.map((item, index) => (
                    <AccordionItem
                        key={index}
                        className='p-3'
                        title={
                            <div className='flex items-center' >
                                <p className='text-xl' >
                                    <span className='font-semibold ' >บทที่ {index + 1}</span> {item.sectionName}
                                </p>
                            </div>
                        }
                        startContent={< FaBookOpen size={25} className="text-primary" />}
                    >
                        <Listbox variant="flat" aria-label="Listbox menu with sections">
                            <ListboxSection title="บทเรียนย่อย" showDivider>
                                {item.lessonData?.filter(lesson => lesson.published === "true").map((lesson, lessonIndex) => (
                                    <ListboxItem
                                        className='mb-2'
                                        key={lessonIndex}
                                        title={
                                            <Link href={`/student/course/lesson/view/${id}`}>

                                                <div className='flex justify-between items-center text-lg' >
                                                    <p>
                                                        <span className='font-semibold' >บทเรียนย่อยที่ {index + 1}.{lessonIndex + 1}</span> {lesson.lessonName}
                                                    </p>
                                                    {completedLessons.includes(lesson._id) ? (
                                                        <span>
                                                            <FaCheckCircle size={25} className='text-green-500' />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <IoAlertCircle size={27} className='text-red-500' />
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        }
                                        startContent={
                                            <div className="bg-primary/10 text-primary p-2 rounded-md">
                                                <MdLibraryBooks size={25} className="text-primary" />
                                            </div>
                                        }
                                    >
                                    </ListboxItem>
                                ))}
                            </ListboxSection>

                            <ListboxSection title="แบบทดสอบท้ายบทเรียน" showDivider>
                                {item.quizData?.filter(quiz => quiz.published === "true").map((quiz, quizIndex) => (
                                    <ListboxItem
                                        key={quizIndex}
                                        title={
                                            <Link href={`/student/course/lesson/view/${id}`}>
                                                <div className='flex justify-between items-center text-lg' >
                                                    <p>
                                                        <span className='font-semibold' >แบบทดสอบท้ายบทเรียน</span> {quiz.quizName}
                                                    </p>
                                                    {completedQuiz.includes(quiz._id) ? (
                                                        <span>
                                                            <FaCheckCircle size={25} className='text-green-500' />
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <IoAlertCircle size={27} className='text-red-500' />
                                                        </span>
                                                    )}
                                                </div>
                                            </Link>
                                        }
                                        startContent={
                                            <div className="bg-danger/10 text-danger p-2 rounded-md">
                                                <MdQuiz size={25} className="text-danger" />
                                            </div>
                                        }
                                    >
                                    </ListboxItem>
                                ))}
                            </ListboxSection>

                            <ListboxSection title="งานที่มอบหมาย" showDivider>
                                {item.AssignmentData?.map((assignment, assignmentIndex) => (
                                    assignment.courseRoom.includes(courseRoomStd._id) ? (
                                        <ListboxItem
                                            key={assignmentIndex}
                                            title={
                                                    <Link key={assignmentIndex} href={`/student/course/assignment/detail/${assignment._id}?courseId=${id}`}>

                                                        <div className='flex justify-between items-center text-lg' >
                                                            <p>
                                                                <span className='font-semibold' >งานชิ้นที่ 1</span> {assignment.assignmentName}
                                                            </p>
                                                            {completedAssignments.some(completedId => completedId.assignmentId === assignment._id) ? (
                                                                <span>
                                                                    <FaCheckCircle size={25} className='text-green-500' />
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    <IoAlertCircle size={27} className='text-red-500' />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Link>


                                            }
                                            startContent={
                                                <div className="bg-warning/10 text-warning p-2 rounded-md">
                                                    <MdAssignment size={25} className="text-warning" />

                                                </div>

                                            }
                                        >
                                        </ListboxItem>
                                    ) : (
                                        null
                                    )
                                ))}
                            </ListboxSection>

                        </Listbox>
                    </AccordionItem >
                ))}
            </Accordion >
        </>
    );
};

export default SectionAccordionStd;
