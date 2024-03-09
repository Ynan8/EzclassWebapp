import React, { useState } from 'react';
import { Accordion, AccordionItem, Listbox, ListboxSection, ListboxItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, ModalBody } from "@nextui-org/react";
import { FaBookOpen, FaCheckSquare, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks, MdQuiz, MdAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const AssignmentAccordionTeacher = ({
    section,
    courseYearId,
}) => {


    return (
        <>
            {/* <pre>{JSON.stringify(section,null,4)}</pre> */}
            {section.map((item, index) => (
                <Listbox variant="flat" aria-label="Listbox menu with sections">
                    <ListboxSection
                        title={
                            <>
                                <p className='text-xl font-medium text-black mb-4'>บทเรียนที่ {index + 1} {item.sectionName}</p>
                            </>
                        }
                        showDivider
                    >
                        {item.AssignmentData?.map((assignment, assignmentIndex) => (
                            <ListboxItem
                                key="delete"
                                title={
                                    <Link key={index} href={`/teacher/course/assignment/check/${assignment._id}?courseYear=${courseYearId}`}>

                                        <div className='flex items-center text-lg' >
                                            <p>
                                                <span className='font-semibold' >งานชิ้นที่ {assignmentIndex + 1}</span> {assignment.assignmentName}
                                            </p>
                                        </div>
                                    </Link>

                                }
                                startContent={
                                    <div className="bg-success/10 text-success p-2 rounded-md">
                                        <FaCheckSquare size={25} className="text-success" />
                                    </div>
                                }
                            >
                            </ListboxItem>
                        ))}
                    </ListboxSection>

                </Listbox>
            ))}
        </>
    );
};

export default AssignmentAccordionTeacher;
