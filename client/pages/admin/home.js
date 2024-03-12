import React, { useEffect, useState } from 'react'
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import HeaderBarAdmin from '../../components/HeaderBar/HeaderBarAdmin';
import SideBarAdmin from '../../components/Sidebar/SideBarAdmin';
import AdminTeacherCard from '../../components/Cards/AdminTeacherCard';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import InfoTeacher from '../../components/Modals/InfoTeacher';


const home = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //list student
    const [studentList, setStudentList] = useState([]);
    useEffect(() => {
        loadDataStd();
    }, []);

    const loadDataStd = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/list-student`);
        setStudentList(data);
    };

    //list teacher
    const [teacherList, setTeacherList] = useState([]);
    useEffect(() => {
        loadDataTch();
    }, []);
    const loadDataTch = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/list-teacher`);
        setTeacherList(data);
    };

    //list course
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        loadDataCourseList();
    }, []);
    const loadDataCourseList = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/list-course`);
        setCourseList(data);
    };

    const [teacher, setTeacher] = useState("");

    const teacherModal = (teacher) => {
        setTeacher(teacher);
        onOpen();
    };


    return (
        <div>
            <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-50  text-black ">
                <SideBarAdmin
                    mobileSidebarOpen={mobileSidebarOpen}
                    setMobileSidebarOpen={setMobileSidebarOpen}
                />
                <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
                <div class="h-full ml-14 mt-28 mb-10 md:ml-80">
                    {/* <div className="px-10">
                        <nav className="text-gray-500" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <a href="#">หน้าหลัก</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li>
                                    <a href="#" className=" text-blue-500 font-bold" aria-current="page">ภาพรวม</a>
                                </li>
                            </ol>
                        </nav>
                    </div> */}
                    <div className="main-content  flex flex-col flex-grow  container">
                        <div className="flex flex-wrap ">
                            <div className="flex w-full flex-col">
                                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4 gap-8 xl:w-full ">
                                    <div className="flex items-center  p-10 bg-white shadow rounded-lg border-b-4 border-b-[#9d47ec]">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                            <HiOutlineUserGroup size={30} />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold pl-6">
                                                {studentList.length}
                                            </span>
                                            <span className="block text-gray-500 pl-6">
                                                นักเรียนทั้งหมด
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center  p-10 bg-white shadow rounded-lg  border-b-4 border-b-[#16a34a]">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                                            <FaChalkboardTeacher size={30} />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold pl-6">
                                                {teacherList.length}
                                            </span>
                                            <span className="block text-gray-500 pl-6">
                                                ครูทั้งหมด
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center  p-10 bg-white shadow rounded-lg border-b-4 border-b-[#1D4ED8] ">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold pl-6">
                                                {courseList.length}
                                            </span>
                                            <span className="block text-gray-500 pl-6">
                                                รายวิชาทั้งหมด
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="flex flex-col mt-5 pb-2">
                                <p className="text-gray-700 text-2xl px-3 border-l-4 border-blue-400">
                                    รายชื่อคุณครู
                                </p>
                            </div>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 py-4 gap-8 xl:w-full cursor-pointer"
                            >
                                {teacherList.map((teacher, index) => (
                                    <div
                                        onClick={() => {
                                            teacherModal(teacher);
                                        }}
                                    >
                                        <AdminTeacherCard key={index} teacher={teacher} />
                                    </div>
                                ))}
                            </div>
                            <Modal
                                size={"4xl"}
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalBody>
                                                <InfoTeacher teacher={teacher} />
                                            </ModalBody>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home