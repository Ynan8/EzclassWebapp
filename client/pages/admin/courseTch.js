import React, { useEffect, useState } from "react";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { Pagination } from "@nextui-org/react";


const courseTch = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };
    //list course
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        loadDataCourseList();
    }, []);

    const loadDataCourseList = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/list-course`
        );
        setCourseList(data);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(courseList.length / itemsPerPage);


    return (
        <div>
            <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
                <SideBarAdmin
                    mobileSidebarOpen={mobileSidebarOpen}
                />
                <div class="h-full ml-0 mt-28 mb-10 md:ml-14 lg:ml-80">
                    <div className="main-content  flex flex-col flex-grow p-4 container">
                        <div className="relative shadow-md sm:rounded-lg whitespace-nowrap">
                            {/* <pre>{JSON.stringify(courseList,null,4)}</pre> */}
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            รูปรายวิชา
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            ชื่อวิชา
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            ระดับชั้น
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            ครูผู้สอน
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseList
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((course) => (
                                            <tr key={course._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="text-center px-6 py-4">
                                                    <div
                                                        className="w-full md:w-1/2 sm:w-1/2 bg-white  place-items-center flex justify-center max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                                                        <img
                                                            className="object-cover rounded"
                                                            src={course.image.Location}
                                                            alt={course.courseName}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg dark:text-white">
                                                    {course.courseName}
                                                </td>
                                                <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                                    {course.level}
                                                </td>
                                                <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg dark:text-white">
                                                    {course.teacher?.firstName} {course.teacher?.lastName}
                                                </td>

                                                <td className="text-center px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 hover:text-gray-600">
                                                        <Link
                                                            href={`/admin/courseDetail/[id]`}
                                                            as={`/admin/courseDetail/${course._id}`}
                                                            className="pointer"
                                                        >
                                                            <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 whitespace-nowrap">
                                                                <FaRegEye
                                                                    size={20}
                                                                    className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                />
                                                                <span className="hidden md:inline-block md:text-sm lg:text-base px-1 py-1">
                                                                    ดูเพิ่มเติม
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-2">
                            <Pagination
                                size='lg'
                                total={totalPages}
                                initialPage={1}
                                page={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default courseTch;