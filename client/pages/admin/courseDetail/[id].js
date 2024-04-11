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
    Progress,
} from "@nextui-org/react";

import HeaderBarAdmin from "../../../components/HeaderBar/HeaderBarAdmin";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import moment from "moment/min/moment-with-locales";
import { Pagination } from '@nextui-org/react';

const CourseDetails = () => {
    const [selectedCourseYearId, setSelectedCourseYearId] = useState("");
    const [courseYearIdByCourse, setCourseYearIdByCourse] = useState([]);
    const [selectedCourseData, setSelectedCourseData] = useState(null);

    const [course, setCourse] = useState({});
    const [teacher, setTeacher] = useState({});
    // const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();
            // setIsClient(true);
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
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["authtoken"] = token;
        }
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/list-course`
        );
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
        if (selectedCourseYearId) {
            loadCourseRoom();
        }
    }, [selectedCourseYearId]);

    const loadCourseRoom = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/courseRoom/${selectedCourseYearId}`
            );
            setCourseRoom(data);
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };

    const totalStudents = courseRoom.reduce(
        (total, room) => total + room.studentId.length,
        0
    );

    const [QuizScoreCourse, setQuizScoreCourse] = useState({});

    useEffect(() => {
        if (selectedCourseYearId) {
        loadQuizScore();
    }
    }, [selectedCourseYearId]);

    const loadQuizScore = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common["authtoken"] = token;
            }

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/quizScoreCourse/${id}`
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
                `${process.env.NEXT_PUBLIC_API}/average-scores/${selectedCourseYearId}`
            );
            setAverageScores(data);
        } catch (error) {
            console.error("Error loading average scores:", error);
        }
    };

    useEffect(() => {
        if (selectedCourseYearId) {
            loadSection();
        }
    }, [course, selectedCourseYearId]);
    
    useEffect(() => {
        if (selectedCourseYearId) {
            loadAverageScores();
        }
    }, [course, selectedCourseYearId]);

    const [section, setSection] = useState([]);

    const loadSection = async () => {
        try {
            const { data: sections } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/section`,
                {
                    params: {
                        courseYearId: selectedCourseYearId,
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




    useEffect(() => {
        if(id){
            loadCourseYearIdByCourse();
        }
    }, [id]);

    const loadCourseYearIdByCourse = async () => {
        if (!id) {
            return; // Skip the API request if id is undefined
        }
    
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/courseYearIdByCourse/${id}`
            );
            setCourseYearIdByCourse(data);
            if (data.length > 0) {
                setSelectedCourseYearId(data[0]._id); // Select the first year by default
            }
        } catch (error) {
            console.error("Error loading course year id by course:", error);
        }
    };
    

    useEffect(() => {
        if (selectedCourseYearId) {
            loadSelectedCourseData(selectedCourseYearId);
        }
    }, [selectedCourseYearId]);

    const loadSelectedCourseData = async (courseYearId) => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/selected-course-data/${courseYearId}`
            );
            setSelectedCourseData(data);
        } catch (error) {
            console.error("Error loading selected course data:", error);
        }
    };

    const handleYearChange = (event) => {
        const selectedYearId = event.target.value;
        setSelectedCourseYearId(selectedYearId);
        loadSelectedCourseData(selectedYearId); // Fetch data based on the selected year ID
    };


    //Progress Room
    const totalQuizCount = section.reduce((total, currentSection) => total + currentSection.quizData.length, 0);

    const [roomProgress, setRoomProgress] = useState([]);

    // Load the progress data when the selectedCourseYearId changes
    useEffect(() => {
        if (selectedCourseYearId) {
            loadRoomProgress(selectedCourseYearId);
        }
    }, [selectedCourseYearId]);

    // Function to load the progress data for each room
    const loadRoomProgress = async (courseYearId) => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/room-progress/${courseYearId}`
            );
            setRoomProgress(data);
        } catch (error) {
            console.error("Error loading room progress:", error);
        }
    };

    const totalCompletionPercentage = roomProgress.reduce((acc, curr) => acc + curr.completionPercentage, 0);
    const courseProgress = totalCompletionPercentage / courseRoom.length;


    
    return (
        <>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
                <HeaderBarAdmin />
                <div className="h-full mt-28 px-0 mx-0 sm:px-4 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="px-6 sm:px-20 md:px-16 lg:px-24 mb-4">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size="lg">
                            <BreadcrumbItem
                                href="/admin/home"
                                style={{ cursor: "pointer", color: "black" }}
                            >
                                หน้าหลัก
                            </BreadcrumbItem>
                            <BreadcrumbItem style={{ color: "blue" }}>
                                {course.courseName}
                            </BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    <main className="flex-1 pb-16 sm:pb-32">
                        <div className="px-0 sm:px-6 md:px-6 lg:px-12 xl:px-12">
                            <div class="  px-4 md:px-8 xl:px-10">
                                <div className="flex flex-col item-center justify-center ">
                                    <div class="flex items-center text-black w-full sm:w-64 md:w-96 h-12 border-none">
                                        <button
                                            onClick={() => router.push("/admin/home")}
                                            className="flex items-center text-base sm:text-lg"
                                        >
                                            <AiOutlineLeft
                                                size={15}
                                                className="inline-block align-text-bottom mx-2 sm:size-25"
                                            />
                                            ย้อนกลับ
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between mt-4">
                                        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 px-4 pb-4 sm:pb-0">
                                            <Avatar
                                                size="lg"
                                                isBordered
                                                className="w-24 sm:w-32 h-24 sm:h-32"
                                                color="primary"
                                                src={
                                                    teacher.image
                                                        ? teacher.image.Location
                                                        : "/profile.png"
                                                }
                                                name={teacher.firstName}
                                            />
                                            <div className="flex justify-center items-center text-center sm:text-left mt-4 sm:mt-0">
                                                <h1 className="text-lg text-blue-600 sm:text-xl font-bold">
                                                    {teacher.firstName ? teacher.firstName : ""}{" "}
                                                    {teacher.lastName ? teacher.lastName : ""}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center space-x-4 px-4 sm:mt-4">
                                            {/* <pre>{JSON.stringify(roomProgress, null, 4)}</pre> */}
                                            <label className="text-sm sm:text-base md:text-lg lg:text-xl">
                                                เลือกปีการศึกษา:
                                            </label>
                                            <select
                                                className="border-2  border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                value={selectedCourseYearId}
                                                onChange={handleYearChange}
                                            >
                                                {courseYearIdByCourse.map((year) => (
                                                    <option key={year._id} value={year._id}>
                                                        {year.year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="relative flex py-4 items-center">
                                        <div class="flex-grow border-t border-gray-400"></div>
                                        <div class="flex-grow border-t border-gray-400"></div>
                                    </div>
                                    <div className="flex flex-wrap ">
                                        <div className="w-full xl:w-2/6 px-2 mt-4 sm:mt-12">
                                            <div className="flex flex-col space-y-2 mr-auto">
                                                <h2 className="mb-2 md:text-xl sm:text-lg font-semibold">
                                                    {course.courseNo} : {course.courseName}
                                                </h2>

                                                <p className="md:text-xl sm:text-lg font-light pr-4">
                                                    <span className="mr-2 font-medium">
                                                        นักเรียนทั้งหมด :
                                                    </span>
                                                    {totalStudents} คน
                                                </p>
                                                <p className="md:text-xl sm:text-lg font-light">
                                                    <span className="mr-2 font-medium">
                                                        ห้องเรียนทั้งหมด :
                                                    </span>
                                                    {courseRoom.length} ห้อง
                                                </p>
                                                <p className="md:text-xl sm:text-lg font-light">
                                                    <span className="mr-2 font-medium">
                                                        บทเรียนทั้งหมด :
                                                    </span>
                                                    {section.length} บทเรียน
                                                </p>
                                                <p className="md:text-xl sm:text-lg font-light">
                                                    <span className="mr-2 font-medium">
                                                        แบบทดสอบทั้งหมด :
                                                    </span>
                                                    {totalQuizCount} แบบทดสอบ
                                                </p>
                                                <p className="md:text-xl sm:text-lg font-light">
                                                    <span className="mr-2 font-medium">
                                                        งานนที่มอบหมายทั้งหมด :
                                                    </span>
                                                    {totalAssignments} งาน
                                                </p>
                                            </div>
                                        </div>
                                        {/* chart */}
                                        <div className=" w-full xl:w-4/6 px-2 mt-8 ">
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
                                            <p className="flex items-center text-xl mt-5 mb-4 mr-4 md:text-xl sm:text-sm font-semibold">
                                                <GiProgression
                                                    style={{ alignSelf: 'center' }} // This ensures the icon aligns itself to the center of the flex container
                                                    className="w-4 h-4 sm:w-6 sm:h-6 mr-2 mb-0 md:mb-2 sm:mb-4  align-middle" />
                                                ความคืบหน้ารายวิชา
                                            </p>


                                            {/* progress bar */}
                                            <div className=" flex space-x-2 items-center w-full rounded-xl shadow-sm overflow-hidden">
                                                <Progress
                                                    size="lg"
                                                    radius="sm"
                                                    color="success"
                                                    label=""
                                                    value={courseProgress}
                                                    showValueLabel={false}
                                                />
                                                <p className="text-2xl" >{`${courseProgress.toFixed(2)}%`}</p>
                                            </div>

                                            <div className="table-container overflow-x-auto w-full ">
                                                {/* <pre>{JSON.stringify(courseRoom, null, 4)}</pre> */}
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
                                                                ความคืบหน้าห้องเรียน
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold">
                                                                เข้าดูห้องเรียน
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {courseRoom.map((roomData, index) => {
                                                            // Find the progress data for the current room
                                                            const progressData = roomProgress.find(progress => progress.roomId === roomData._id);
                                                            const completionPercentage = progressData ? progressData.completionPercentage : 0;

                                                            return (
                                                                <tr className="hover:bg-gray-100 transition-colors group" key={roomData._id}>
                                                                    <td className="text-center py-4">{index + 1}</td>
                                                                    <td className="text-center">{roomData.roomName}</td>
                                                                    <td className="py-4 px-4 text-center">{roomData.studentId.length}</td>
                                                                    <td className="flex space-x-2 items-center justify-center py-4 px-4 text-center">
                                                                        <Progress
                                                                            size="md"
                                                                            radius="sm"
                                                                            color="success"
                                                                            value={completionPercentage}
                                                                            showValueLabel={false}
                                                                            className="max-w-28"
                                                                        />
                                                                        <p className="text-lg">{`${completionPercentage.toFixed(2)}%`}</p>
                                                                    </td>
                                                                    <td className="py-4 px-4 text-center">
                                                                        <div className="flex items-center justify-center space-x-2 hover:text-gray-600">
                                                                            <Link href={`/admin/room/${roomData._id}`} className="pointer">
                                                                                <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 whitespace-nowrap">
                                                                                    <FaRegEye size={20} className="text-black-500 cursor-pointer mr-1 hover:text-gray-500" />
                                                                                    <span className="hidden md:inline-block md:text-sm lg:text-base px-1 py-1">
                                                                                        ดูห้องเรียน
                                                                                    </span>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
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