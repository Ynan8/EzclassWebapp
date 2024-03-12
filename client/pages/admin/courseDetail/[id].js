import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminCourseDetail from "../../../components/Charts/AdminCourseDetail";
import {
    Breadcrumbs,
    BreadcrumbItem,
    Tabs,
    Tab,
    Button,
    Input,
} from "@nextui-org/react";


import HeaderBarAdmin from "../../../components/HeaderBar/HeaderBarAdmin";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { Avatar } from "@nextui-org/react";
import moment from "moment/min/moment-with-locales";

const CourseDetails = () => {
    // Load course
    const [course, setCourse] = useState({});
    const [teacher, setTeacher] = useState({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();

        }
    }, [id]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API}/course/${id}`
                );
                setCourse(data);

                // Check if the course has a teacher
                if (data.teacher && data.teacher._id) {
                    // Fetch additional information about the teacher
                    const teacherData = await axios.get(
                        `${process.env.NEXT_PUBLIC_API}/teacher/${data.teacher._id}`
                    );
                    setTeacher(teacherData.data);
                }
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    };
    //list course
    const [courseList, setCourseList] = useState([]);
    useEffect(() => {
        loadDataCourseList();
    }, []);
    const loadDataCourseList = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/list-course`);
        setCourseList(data);
    };

    const [tch, setTch] = useState("");

    const tchModal = (teacher) => {
        setTch(teacher);
        onOpen();
    };
    // 1 Get course Year Id
    const [courseYearId, setCourseYearId] = useState();
    const loadCourseYearId = async () => {
        if (id) {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API}/admin/getCourseYearId/${id}`
                );
                setCourseYearId(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    };

    // Show Course Room
    const [courseRoom, setCourseRoom] = useState([]);
    useEffect(() => {
        if (id) {
            loadCourseRoom();
        }
    }, [courseYearId]);

    const loadCourseRoom = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/courseRoom/${courseYearId}`
            );
            setCourseRoom(data);
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };

    console.log(courseYearId);
    const totalStudents = courseRoom.reduce(
        (total, room) => total + room.studentId.length,
        0
    );

    const [QuizScoreCourse, setQuizScoreCourse] = useState({});

    useEffect(() => {
        loadQuizScore();
    }, []);

    const loadQuizScore = async (Id) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common["authtoken"] = token;
            }

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/quizScoreCourse/${Id}`
            );
            setQuizScoreCourse(data);
            console.log(data);
        } catch (error) {
            console.error("Error loading quiz score:", error);
        }
    };

    const [averageScores, setAverageScores] = useState([]);

    const loadAverageScores = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/average-scores/${courseYearId}`
            );
            setAverageScores(data);
        } catch (error) {
            console.error("Error loading average scores:", error);
        }
    };
    console.log(averageScores);

    useEffect(() => {
        if (id) {
            loadSection();
        }
    }, [course, courseYearId]);
    useEffect(() => {
        if (id) {
            loadAverageScores();
        }
    }, [course, courseYearId]);

    const [section, setSection] = useState([]);
    const loadSection = async () => {
        try {
            const { data: sections } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/section`,
                {
                    params: {
                        courseYearId: courseYearId,
                    },
                }
            );

            // Fetch lesson and quiz data for each section
            const sectionsWithData = await Promise.all(
                sections.map(async (section) => {
                    const lessonData = await Promise.all(
                        section.lesson.map(async (lessonId) => {
                            try {
                                const { data: lesson } = await axios.get(
                                    `${process.env.NEXT_PUBLIC_API}/lesson/${lessonId}`
                                );
                                return lesson;
                            } catch (error) {
                                console.error("Error loading lesson:", error);
                                return null;
                            }
                        })
                    );

                    const quizData = await Promise.all(
                        section.quiz.map(async (quizId) => {
                            try {
                                const { data: quiz } = await axios.get(
                                    `${process.env.NEXT_PUBLIC_API}/quiz/${quizId}`
                                );
                                return quiz;
                            } catch (error) {
                                console.error("Error loading quiz:", error);
                                return null;
                            }
                        })
                    );

                    const AssignmentData = await Promise.all(
                        section.assignment.map(async (assignmentId) => {
                            try {
                                const { data: assignment } = await axios.get(
                                    `${process.env.NEXT_PUBLIC_API}/assignment/${assignmentId}`
                                );
                                return assignment;
                            } catch (error) {
                                console.error("Error loading assignment:", error);
                                return null;
                            }
                        })
                    );

                    return { ...section, lessonData, quizData, AssignmentData };
                })
            );

            setSection(sectionsWithData);
        } catch (error) {
            console.error("Error loading sections:", error);
        }
    };
    const totalAssignments = section.reduce(
        (total, sec) => total + sec.AssignmentData.length,
        0
    );




    return (
        <>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <HeaderBarAdmin />
                <div className="h-full mt-28 ">
                    {/* Breadcrumb */}
                    <div className="px-12 mb-4">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size="lg">
                            <BreadcrumbItem
                                href="/admin/home"
                                style={{ cursor: "pointer", color: "black" }}
                            >
                                หน้าหลัก
                            </BreadcrumbItem>
                            <BreadcrumbItem style={{ color: "blue" }}>
                                {course.courseName} ม.{course.level}
                            </BreadcrumbItem>
                        </Breadcrumbs>
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
                                                className="w-32 h-32"
                                                color="primary"
                                                src={
                                                    teacher.image
                                                        ? teacher.image.Location
                                                        : "/profile.png"
                                                }
                                                name={teacher.firstName}
                                            />
                                            <div className="flex justify-center items-center space-x-4 px-8 sm:mt-4">
                                                <h1 className="text-xl font-bold text-center sm:mt-0">
                                                    {teacher.firstName ? teacher.firstName : ""}{" "}
                                                    {teacher.lastName ? teacher.lastName : ""}
                                                </h1>
                                            </div>
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
                                        {/* <pre>{JSON.stringify(averageScores, null, 4)}</pre> */}
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
                                                    {totalStudents} คน
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        ห้องเรียนทั้งหมด :
                                                    </span>
                                                    {courseRoom.length} ห้อง
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        บทเรียนทั้งหมด :
                                                    </span>
                                                    {section.length} บทเรียน
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        แบบทดสอบทั้งหมด :
                                                    </span>
                                                    {totalAssignments} แบบทดสอบ
                                                </p>
                                                <p className="md:text-lg sm:text-base">
                                                    <span className="mr-2 font-semibold">
                                                        งานนที่มอบหมายทั้งหมด :
                                                    </span>
                                                    {totalAssignments} งาน
                                                </p>
                                            </div>
                                        </div>
                                        {/* chart */}
                                        <div className=" w-full xl:w-4/6 px-2 mt-12 ">
                                            <AdminCourseDetail
                                                QuizScoreCourse={QuizScoreCourse}
                                                courseRoom={courseRoom}
                                                section={section}
                                                averageScores={averageScores}
                                            />
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
                                                        {courseRoom.map((roomData, index) => (
                                                            <tr className="hover:bg-gray-100 transition-colors group">
                                                                <td className="text-center py-4">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="text-center">
                                                                    {roomData.roomName}
                                                                </td>
                                                                <td className="py-4 px-4 text-center">
                                                                    {" "}
                                                                    {roomData.studentId.length}
                                                                </td>
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
                                                                        {/* {moment(tchData.createdAt)
                              .locale("th")
                              .format("LLL")} */}
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 px-4 text-center">
                                                                    <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                        {/* <Link href="/admin/std">
                                      <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 white-space: nowrap line-height: 1">
                                        <FaRegEye
                                          size={20}
                                          className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                        />
                                        <span className="text-base px-1 py-1">
                                          ดูห้องเรียน
                                        </span>
                                      </div>
                                    </Link> */}
                                                                        <Link
                                                                            href={`/admin/std/`}
                                                                            className="pointer"
                                                                        >
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
                                                        ))}
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