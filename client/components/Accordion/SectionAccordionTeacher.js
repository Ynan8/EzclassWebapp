import React, { useState } from 'react';
import { Accordion, AccordionItem, Listbox, ListboxSection, ListboxItem, Chip, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure, ModalBody } from "@nextui-org/react";
import { FaBookOpen, FaPlus } from 'react-icons/fa';
import { MdLibraryBooks, MdQuiz, MdAssignment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import find from '../../public/find.png'

const SectionAccordion = ({
    section,
    onOpenModalUpdate,
    setCurrentSection,
    onOpenModalDelete,
    openDeleteModal,
    courseYearId,
    loadSection,
}) => {
    const { isOpen: isOpenModalDeleteAssignment, onOpen: onOpenModalDeleteAssignment, onOpenChange: onCloseModalDeleteAssignment } = useDisclosure();
    const { isOpen: isOpenModalDeleteQuiz, onOpen: onOpenModalDeleteQuiz, onOpenChange: onCloseModalDeleteQuiz } = useDisclosure();
    const { isOpen: isOpenModalDeleteLesson, onOpen: onOpenModalDeleteLesson, onClose: onCloseModalDeleteLesson } = useDisclosure();
    const { isOpen: isOpenModalDeleteSection, onOpen: onOpenModalDeleteSection, onClose: onCloseModalDeleteSection } = useDisclosure();

    const handleNoLessonsToast = () => {
        toast.error('ยังไม่มีบทเรียนย่อย กรุณาเพิ่มบทเรียนย่อยก่อน');
    };

    const handleQuizExistsToast = () => {
        toast.error('มีแบบทดสอบท้ายบทแล้ว');
    };


    const handleSetCurrentSection = (sectionId) => {
        const selectedSection = section.find(item => item._id === sectionId);
        setCurrentSection(selectedSection);
    };

    // Delete Lesson
    const [lessonId, setLessonId] = useState("");

    const openDeleteModalLesson = (id) => {
        setLessonId(id);
        onOpenModalDeleteLesson();
    };

    const handleDeleteLesson = async (lessonId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/lesson/${lessonId}`);

            toast.success('ลบบทเรียนย่อยสำเร็จ');
            loadSection();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบบทเรียนย่อยได้');
        }
    };

    // Delete quiz
    const [quizId, setQuizId] = useState("");

    const openDeleteModalQuiz = (id) => {
        setQuizId(id);
        onOpenModalDeleteQuiz();
    };

    const handleDeleteQuiz = async (lessonId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/quiz/${quizId}`);

            toast.success('ลบแบบทดสอบสำเร็จ');
            loadSection();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบแบบทดสอบได้ได้');
        }
    };

    // Delete assignment
    const [assignmentId, setAssignmentId] = useState("");

    const openDeleteModalAssignment = (id) => {
        setAssignmentId(id);
        onOpenModalDeleteAssignment();
    };

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentId}`);

            toast.success('ลบแบบทดสอบสำเร็จ');
            loadSection();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบแบบทดสอบได้ได้');
        }
    };

    return (
        <>
            {/* <pre>{JSON.stringify(section,null,4)}</pre> */}
            {section.length > 0 ? (
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
                                                        <Link href={`/teacher/course/lesson/edit/${lesson._id}?courseYear=${courseYearId}`}>

                                                            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                <CiEdit size={23} className="ml-auto" />
                                                            </span>
                                                        </Link>
                                                        <span
                                                            onClick={() => {
                                                                openDeleteModalLesson(lesson._id)
                                                                onOpenModalDeleteLesson()
                                                            }}
                                                            className="text-lg text-danger cursor-pointer active:opacity-50">
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
                                                        <Link href={`/teacher/course/quiz/edit/${quiz._id}?courseYear=${courseYearId}`}>
                                                            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                <CiEdit size={23} className="ml-auto" />
                                                            </span>
                                                        </Link>

                                                        <span
                                                            onClick={() => {
                                                                openDeleteModalQuiz(quiz._id)
                                                                onOpenModalDeleteQuiz()
                                                            }}
                                                            className="text-lg text-danger cursor-pointer active:opacity-50">
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
                                                        <Link href={`/teacher/course/assignment/edit/${assignment._id}?courseYear=${courseYearId}`}>
                                                            <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                                <CiEdit size={23} className="ml-auto" />
                                                            </span>
                                                        </Link>
                                                        <span
                                                            onClick={() => {
                                                                openDeleteModalAssignment(assignment._id)
                                                                onOpenModalDeleteAssignment()
                                                            }}
                                                            className="text-lg text-danger cursor-pointer active:opacity-50">
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
                                    ))}
                                </ListboxSection>

                                <ListboxItem variant="light" className="hover:bg-transparent">
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                        <Link href={`/teacher/course/lesson/create/${item._id}?courseYear=${courseYearId}`}>
                                            <Button className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="primary" variant="ghost">
                                                บทเรียนย่อย
                                            </Button>
                                        </Link>
                                        {item.lessonData?.length === 0 ? (
                                            <Button onClick={handleNoLessonsToast} className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="default" variant="faded">
                                                แบบทดสอบท้ายบทเรียน
                                            </Button>
                                        ) : item.quizData?.length > 0 ? (
                                            <Button onClick={handleQuizExistsToast} className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="default" variant="faded">
                                                แบบทดสอบท้ายบทเรียน
                                            </Button>
                                        ) : (
                                            <Link href={`/teacher/course/quiz/create/${item._id}?courseYear=${courseYearId}`}>
                                                <Button className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="primary" variant="ghost">
                                                    แบบทดสอบท้ายบทเรียน
                                                </Button>
                                            </Link>
                                        )}

                                        {item.lessonData?.length === 0 ? (
                                            <Button onClick={handleNoLessonsToast} className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="default" variant="faded">
                                                มอบหมายงาน
                                            </Button>
                                        ) : (
                                            <Link href={`/teacher/course/assignment/create/${item._id}?courseYear=${courseYearId}`}>
                                                <Button className="text-base w-full sm:w-auto" startContent={<FaPlus />} color="primary" variant="ghost">
                                                    มอบหมายงาน
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </ListboxItem>



                            </Listbox>
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
                    <p className="md:text-lg  sm:text-text-base text-gray-600">
                        คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>สร้างบทเรียน</span> เพื่อเริ่มบทเรียน
                    </p>
                </div>
            )}
            {/* Delete  Lesson*/}
            <Modal
                isOpen={isOpenModalDeleteLesson}
                onClose={onCloseModalDeleteLesson}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการลบบทเรียนย่อยหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบบทเรียนย่อยจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteLesson(lessonId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Delete  QUIZ*/}
            <Modal
                isOpen={isOpenModalDeleteQuiz}
                onClose={onCloseModalDeleteQuiz}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการลบแบบทดสอบท้ายบทเรียนหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบแบบทดสอบท้ายบทเรียนจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteQuiz(quizId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Delete  Assignment*/}
            <Modal
                isOpen={isOpenModalDeleteAssignment}
                onClose={onCloseModalDeleteAssignment}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการลบงานที่มอบหมายหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบงานที่มอบหมายจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteAssignment(assignmentId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default SectionAccordion;
