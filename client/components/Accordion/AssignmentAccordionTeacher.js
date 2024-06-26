import React, { useState } from 'react';
import { Accordion, AccordionItem, Listbox, ListboxSection, ListboxItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, ModalBody, Progress, Skeleton } from "@nextui-org/react";
import { FaBookOpen, FaCheckSquare, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks, MdQuiz, MdAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from "moment/min/moment-with-locales";
import Image from 'next/image';
import find from '../../public/find.png'



const AssignmentAccordionTeacher = ({
    section,
    courseYearId,
    courseRoomId,
    isLoading,
    calculateSubmissionPercentage
}) => {
    if (isLoading) {
        return (
            <div className="mt-4 w-full flex items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                </div>
            </div>
        );
    }

    return (
        <>
            {section.map((item, index) => (
                item.AssignmentData && item.AssignmentData.length > 0 ? ( // Check if AssignmentData exists and has length greater than 0
                    <div className='flex flex-col '  key={index}>
                        <p className='text-xl font-medium text-black my-4'>บทเรียนที่ {index + 1} {item.sectionName}</p>
                        {item.AssignmentData.map((assignment, assignmentIndex) => (
                            <div key={assignment._id} >
                                <Link href={`/teacher/course/room/assignment/check/${assignment._id}?courseRoomId=${courseRoomId}`}>
                                    <div className='flex items-center text-lg'>
                                        <p>
                                            <span className='font-semibold'>งานชิ้นที่ {assignmentIndex + 1}</span> {assignment.assignmentName}
                                        </p>
                                    </div>
                                    <div className='flex flex-col sm:flex-row  items-center  bg-gray-100 p-4 rounded-md'>

                                        <div className='flex items-center space-x-2'>
                                            <div className="bg-warning/10 text-warning p-4 rounded-md">
                                                <MdAssignment size={25} className="text-warning" />
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Progress
                                                    aria-label="Downloading..."
                                                    size="md"
                                                    label="นักเรียนส่งงานแล้ว"
                                                    value={calculateSubmissionPercentage(assignment._id)}
                                                    color="success"
                                                    showValueLabel={true}
                                                    className="max-w-md"
                                                />
                                                <div className="">
                                                    <p className='text-base'>
                                                        <span className='font-semibold'>มอบหมายเมื่อ:</span> {moment(assignment.createdAt)
                                                            .locale('th')
                                                            .format('LL HH:mm')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:ml-auto flex flex-col justify-center items-center space-y-2">
                                            <Chip
                                                className="capitalize"
                                                color={"primary"}
                                                size="lg"
                                                variant="flat"
                                            >
                                                {assignment.scoreLimit} คะแนน
                                            </Chip>
                                            <p className='text-base flex flex-col items-center'>
                                                <span className='font-semibold'>กำหนดส่ง</span>
                                                <span>
                                                    {moment(assignment.assignmentDue)
                                                        .locale('th')
                                                        .format('LL HH:mm')
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : null
            ))}
        </>

    );

};

export default AssignmentAccordionTeacher;


