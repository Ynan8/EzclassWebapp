import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import SectionAccordionTeacher from '../../../../components/Accordion/SectionAccordionTeacher';
import UpdateSection from '../../../../components/Modals/UpdateSection';

const LessonCourse = () => {

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


    const courseId = courseYear.courseId;

    const [course, setCourse] = useState({});


    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [courseId]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    const { isOpen: isOpenModalCreate, onOpen: onOpenModalCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
    const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();


    // Add section
    const handleAddSection = async (sectionName) => {
        if (sectionName.trim().length === 0) {
            toast.error('กรุณากรอกชื่อบทเรียน');
            return;  // Exit the function if sectionName is not valid
        }
    
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/section/${id}/${courseId}`,
                { sectionName: sectionName }
            );
            loadSection();
            toast.success('สร้างบทเรียนสำเร็จ');
            onOpenChangeModalCreate(false);  // Close the modal after a successful submission
        } catch (error) {
            console.error('Error creating section:', error);
            toast.error('ไม่สามารถสร้างบทเรียนได้');
        }
    };
    

    // Show section
    useEffect(() => {
        if (courseId) {
            loadSection();
        }
    }, [courseId]);
    const [section, setSection] = useState([])
    const loadSection = async () => {
        try {
            const { data: sections } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section`, {
                params: {
                    courseYearId: id,
                },
            });

            // Fetch lesson and quiz data for each section
            const sectionsWithData = await Promise.all(
                sections.map(async (section) => {
                    const lessonData = await Promise.all(
                        section.lesson.map(async (lessonId) => {
                            try {
                                const { data: lesson } = await axios.get(`${process.env.NEXT_PUBLIC_API}/lesson/${lessonId}`);
                                return lesson;
                            } catch (error) {
                                console.error('Error loading lesson:', error);
                                return null;
                            }
                        })
                    );

                    const quizData = await Promise.all(
                        section.quiz.map(async (quizId) => {
                            try {
                                const { data: quiz } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/${quizId}`);
                                return quiz;
                            } catch (error) {
                                console.error('Error loading quiz:', error);
                                return null;
                            }
                        })
                    );

                    const AssignmentData = await Promise.all(
                        section.assignment.map(async (assignmentId) => {
                            try {
                                const { data: assignment } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentId}`);
                                return assignment;
                            } catch (error) {
                                console.error('Error loading assignment:', error);
                                return null;
                            }
                        })
                    );

                    return { ...section, lessonData, quizData, AssignmentData };
                })
            );

            setSection(sectionsWithData);
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    };

    // Update Section
    const [currentSection, setCurrentSection] = useState({});

    const handleUpdateSection = async (e) => {
        e.preventDefault();
        if (currentSection.sectionName.trim().length === 0) {
            toast.error('กรุณากรอกชื่อบทเรียน');
            return;  // Exit the function if sectionName is not valid
        }
        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/section/${courseId}/${currentSection._id}`,
                currentSection
            );
            onOpenChangeModalUpdate(false);  // Close the modal after a successful submission
            loadSection();
            toast.success('อัปเดตบทเรียนสำเร็จ');
        } catch (err) {
            console.log(err);
            toast.error("ไม่สามารถอัปเดตบทเรียนได้");
        }
    };

    // Delete Section
    const [sectionId, setSectionId] = useState("");

    const openDeleteModal = (id) => {
        setSectionId(id);
        onOpenModalDelete();
    };

    const handleDeleteSection = async (sectionId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/section/${sectionId}`);

            toast.success('ลบบทเรียนสำเร็จ');
            loadSection();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบบทเรียนได้');
        }
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
                            <BreadcrumbItem>{course.courseName} ม.{course.level}</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
                            <BreadcrumbItem>บทเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <Button onPress={onOpenModalCreate} color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                                สร้างบทเรียน
                            </Button>
                        </div>
                        {/* Modal */}

                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {/* <pre>{JSON.stringify(section,null,4)}</pre> */}
                            {/* SectionAccordion */}
                            <div className="flex flex-col space-y-4">
                                <SectionAccordionTeacher
                                    onOpenModalUpdate={onOpenModalUpdate}
                                    section={section}
                                    setCurrentSection={setCurrentSection}
                                    onOpenModalDelete={onOpenModalDelete}
                                    openDeleteModal={openDeleteModal}
                                    courseYearId={id}
                                    loadSection={loadSection}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-center">
                            {section.length === 0 ? (
                                <>
                                    <h1 className='text-4xl font-bold text-gray-500 mb-3' >ยังไม่มีบทเรียน</h1>
                                    <p className="text-gray-600">
                                        คุณยังไม่มีบทเรียนในรายวิชานี้ คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>สร้างบทเรียน</span> เพื่อเพิ่มบทเรียนใหม่
                                    </p>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                </div>
            </div>

            {/* Create */}
            <Modal
                isOpen={isOpenModalCreate}
                onOpenChange={onOpenChangeModalCreate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <AddSection
                                handleAddSection={handleAddSection}
                                onClose={onClose}
                            />
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Update */}
            <Modal
                isOpen={isOpenModalUpdate}
                onOpenChange={onOpenChangeModalUpdate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <UpdateSection
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                            handleUpdateSection={handleUpdateSection}
                            onClose={onClose}
                        />
                    )}
                </ModalContent>
            </Modal>


            {/* Delete */}
            <Modal
                isOpen={isOpenModalDelete}
                onOpenChange={onOpenChangeModalDelete}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องลบบทเรียนหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบบทเรียนจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteSection(sectionId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default LessonCourse