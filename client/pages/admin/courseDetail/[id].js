import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminCourseDetail from "../../../components/Charts/AdminCourseDetail";

//import { Avatar } from "antd";
//import { UserOutlined } from "@ant-design/icons";
// import { Avatar } from "antd";


import HeaderBarAdmin from "../../../components/HeaderBar/HeaderBarAdmin";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";

const CourseDetails = () => {
    const [course, setCourse] = useState({});
    const [teacher, setTeacher] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [id]);

    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
                setCourse(data);

                // Check if the course has a teacher
                if (data.teacher && data.teacher._id) {
                    // Fetch additional information about the teacher
                    const teacherData = await axios.get(`${process.env.NEXT_PUBLIC_API}/teacher/${data.teacher._id}`
                    );
                    setTeacher(teacherData.data);
                }
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <HeaderBarAdmin />
                <div className="h-full mt-28 ">
                    {/* Breadcrumb */}
                    <div className="pl-20 mb-6">
                        <nav className="text-gray-900 text-lg" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link
                                        className="flex  items-center space-x-2"
                                        href="/admin/home"
                                    >
                                        <p> หน้าหลัก</p>
                                        <svg
                                            className="fill-current w-3 h-3 mx-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512"
                                        >
                                            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <a
                                        href="#"
                                        className=" text-blue-500 font-bold"
                                        aria-current="page"
                                    >
                                        รายวิชาที่สอน
                                    </a>

                                </li>

                            </ol>
                        </nav>
                    </div>

                    <main className="flex-1 pb-16 sm:pb-32">
                        <div className="  px-4 sm:px-6 xl:px-12">
                            {/* <pre>{JSON.stringify(teacher, null, 4)}</pre> */}
                            <div class=" rounded  px-4 md:px-8 xl:px-10">
                                <div className="px-[40px] flex flex-col item-center justify-center ">
                                    <div class="flex items-center text-black  w-96 md:w-96 h-12  border-none">
                                        <button
                                            onClick={() => router.push("/admin/home")}
                                            className=" text-lg"
                                        >
                                            <AiOutlineLeft
                                                size={25}
                                                className="inline-block align-text-bottom mx-2"
                                            />
                                            ย้อนกลับ
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap justify-between mt-4">
                                        <div className="flex flex-wrap space-x-3 px-4 ">
                                            {/* <Avatar
                        src={teacher.image ? teacher.image.Location : "/"}
                        className="w-32 h-32 bg-gray-200 text-7xl md:m-auto xl:m-0 flex items-center justify-center"
                      >
                        {teacher.image ? null : ""}
                      </Avatar> */}
                                            <Avatar
                                                size="lg"
                                                isBordered
                                                className="w-40 h-40"
                                                color="primary"
                                                src={teacher.image ? teacher.image.Location : "/profile.png"}
                                                name={teacher.firstName}
                                            />
                                            <h1 className="text-xl font-bold text-center mt-5 px-4 sm:mt-0">
                                                {teacher.firstName ? teacher.firstName : ""}{" "}
                                                {teacher.lastName ? teacher.lastName : ""}
                                            </h1>
                                        </div>
                                        <div className="flex justify-center items-center space-x-4 px-4 sm:mt-4">
                                            <label className="text-lg font-semibold">
                                                เลือกปีการศึกษา:
                                            </label>
                                            <select className="border-2  border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                                <option value="choose">เลือกทั้งหมด</option>
                                                <option value="2566">2566</option>
                                                <option value="2565">2565</option>
                                                <option value="2564">2564</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="relative flex py-4 items-center">
                                        <div class="flex-grow border-t border-gray-400"></div>
                                        {/* <span class="flex-shrink mx-4 text-gray-400">Content</span> */}
                                        <div class="flex-grow border-t border-gray-400"></div>
                                    </div>
                                    <div className="flex flex-wrap ">

                                        <div className="w-full xl:w-2/6 px-2 mt-12">
                                            <div className="flex flex-col space-y-2 mr-auto">
                                                <h2 className="mb-2 md:text-xl sm:text-base font-semibold">
                                                    {course.courseNo} : {course.courseName}
                                                </h2>

                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        นักเรียนทั้งหมด :
                                                    </span>
                                                    150 คน
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        ห้องเรียนทั้งหมด :
                                                    </span>
                                                    5 ห้อง
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        บทเรียนทั้งหมด :
                                                    </span>
                                                    10 บทเรียน
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        แบบทดสอบทั้งหมด :
                                                    </span>
                                                    10 แบบทดสอบ
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        งานนที่มอบหมายทั้งหมด :
                                                    </span>
                                                    8 งาน
                                                </p>
                                            </div>
                                        </div>
                                        {/* chart */}
                                        <div className=" w-full xl:w-4/6 px-2 mt-12 ">
                                            <AdminCourseDetail />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="table-container max-w-800 overflow-x-auto w-full ">
                                            <p className="text-xl mt-5 mb-4 font-semibold ">
                                                ความคืบหน้ารายวิชา
                                            </p>
                                            {/* progress bar */}
                                            <div className="rounded-xl shadow-sm overflow-hidden">
                                                <div className="relative bg-gray-100 h-6 flex items-center justify-center">
                                                    <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[50%] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                                                    <div className="relative text-blue-900 font-medium text-sm">
                                                        50%
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table-container overflow-x-auto w-full ">
                                                <table className="w-full border-b border-gray-200 mt-5 whitespace-nowrap">
                                                    <thead>
                                                        <tr className="text-base font-medium text-gray-700 border-b border-gray-200">
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                ลำดับ
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                ชื่อห้อง
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                จำนวนนักเรียน
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                ความคืบหน้า
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                บทเรียนล่าสุด
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                วันที่สอนล่าสุด
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                เข้าดูห้องเรียน
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="hover:bg-gray-100 transition-colors group">
                                                            <td className="text-center py-4">1</td>
                                                            <td className="text-center">ม.4/1</td>

                                                            <td className="py-4 px-4 text-center">30</td>
                                                            <td className="flex items-center justify-center py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                                        <div
                                                                            className="bg-sky-400 h-2.5 rounded-full "
                                                                            style={{ width: 100 }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="px-2">50%</p>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    บทที่ 1
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    25 มกราคม 2024 08:30:00
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                    <Link href="/admin/std">
                                                                        <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                                                            <FaRegEye
                                                                                size={20}
                                                                                className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                            />
                                                                            <span className="text-base px-1 py-1">
                                                                                ดูห้องเรียน
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="hover:bg-gray-100 transition-colors group">
                                                            <td className="text-center py-4">2</td>
                                                            <td className="text-center">ม.4/2</td>

                                                            <td className="py-4 px-4 text-center">30</td>
                                                            <td className="flex items-center justify-center py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                                        <div
                                                                            className="bg-sky-400 h-2.5 rounded-full"
                                                                            style={{ width: 100 }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="px-2">50%</p>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    บทที่ 2
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    4 กุมภาพันธ์ 2024 10:30:00
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                    <Link href="/admin/std">
                                                                        <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                                                            <FaRegEye
                                                                                size={20}
                                                                                className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                            />
                                                                            <span className="text-base px-1 py-1">
                                                                                ดูห้องเรียน
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="hover:bg-gray-100 transition-colors group">
                                                            <td className="text-center py-4">3</td>
                                                            <td className="text-center">ม.4/3</td>

                                                            <td className="py-4 px-4 text-center">30</td>
                                                            <td className="flex items-center justify-center py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                                        <div
                                                                            className="bg-sky-400 h-2.5 rounded-full"
                                                                            style={{ width: 100 }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="px-2">50%</p>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    บทที่ 2
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    30 มกราคม 2024 08:30:00
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                    <Link href="/admin/std">
                                                                        <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                                                            <FaRegEye
                                                                                size={20}
                                                                                className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                            />
                                                                            <span className="text-base px-1 py-1">
                                                                                ดูห้องเรียน
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="hover:bg-gray-100 transition-colors group">
                                                            <td className="text-center py-4">4</td>
                                                            <td className="text-center">ม.4/4</td>

                                                            <td className="py-4 px-4 text-center">30</td>
                                                            <td className="flex items-center justify-center py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                                        <div
                                                                            className="bg-sky-400 h-2.5 rounded-full"
                                                                            style={{ width: 100 }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="px-2">50%</p>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    บทที่ 1
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    25 มกราคม 2024 08:30:00
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                    <Link href="/admin/std">
                                                                        <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                                                            <FaRegEye
                                                                                size={20}
                                                                                className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                            />
                                                                            <span className="text-base px-1 py-1">
                                                                                ดูห้องเรียน
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="hover:bg-gray-100 transition-colors group">
                                                            <td className="text-center py-4">5</td>
                                                            <td className="text-center">ม.4/5</td>

                                                            <td className="py-4 px-4 text-center">30</td>
                                                            <td className="flex items-center justify-center py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                                                                        <div
                                                                            className="bg-sky-400 h-2.5 rounded-full"
                                                                            style={{ width: 100 }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                <p className="px-2">50%</p>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    บทที่ 1
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    25 มกราคม 2024 08:30:00
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                    <Link href="/admin/std">
                                                                        <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                                                            <FaRegEye
                                                                                size={20}
                                                                                className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                                            />
                                                                            <span className="text-base px-1 py-1">
                                                                                ดูห้องเรียน
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
