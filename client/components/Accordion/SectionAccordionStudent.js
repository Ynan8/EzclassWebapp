import React, { useState } from 'react';
import { Accordion, AccordionItem, Listbox, ListboxSection, ListboxItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, ModalBody } from "@nextui-org/react";
import { FaBookOpen, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks, MdQuiz, MdAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const SectionAccordionStd = ({
    section,
}) => {
  

    return (
        <>
        {/* <pre>{JSON.stringify(section,null,4)}</pre> */}
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
                                {item.lessonData?.map((lesson, lessonIndex) => (
                                    <ListboxItem
                                        className='mb-2'
                                        key={lessonIndex}
                                        title={
                                            <div className='flex items-center text-lg' >
                                                <p>
                                                    <span className='font-semibold' >บทเรียนย่อยที่ {index + 1}.{lessonIndex + 1}</span> {lesson.lessonName}
                                                </p>
                                                <div className="flex items-center space-x-4 mr-4 ml-auto">

                                                    <Chip
                                                        className="capitalize"
                                                        color={lesson.published === "true" ? "success" : "default"}
                                                        size="md"
                                                        variant="flat"
                                                    >
                                                        {lesson.published === "true" ? "เผยแพร่" : "แบบร่าง"}
                                                    </Chip>
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
                                ))}
                            </ListboxSection>

                            <ListboxSection title="แบบทดสอบท้ายบทเรียน" showDivider>
                                {item.quizData?.map((quiz, lessonIndex) => (
                                    <ListboxItem
                                        key="delete"
                                        title={
                                            <div className='flex items-center text-lg' >
                                                <p>
                                                    <span className='font-semibold' >แบบทดสอบท้ายบทเรียน</span> {quiz.quizName}
                                                </p>
                                                <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                    <Chip
                                                        className="capitalize"
                                                        color={quiz.published === "true" ? "success" : "default"}
                                                        size="md"
                                                        variant="flat"
                                                    >
                                                        {quiz.published === "true" ? "เผยแพร่" : "แบบร่าง"}
                                                    </Chip>
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
                                ))}
                            </ListboxSection>

                            <ListboxSection title="งานที่มอบหมาย" showDivider>
                                {item.AssignmentData?.map((assignment, lessonIndex) => (
                                    <ListboxItem
                                        key="delete"
                                        title={
                                            <div className='flex items-center text-lg' >
                                                <p>
                                                    <span className='font-semibold' >งานชิ้นที่ 1</span> {assignment.assignmentName}
                                                </p>
                                                <div className="flex items-center space-x-4 mr-4 ml-auto">
                                                    <Chip className="capitalize" color={"success"} size="md" variant="flat">
                                                        เผยแพร่
                                                    </Chip>
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
