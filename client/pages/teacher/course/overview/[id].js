import React, { useEffect, useState } from 'react'
import TeacherRoute from '../../../../components/Routes/TeacherRoute';
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input, Card, Skeleton } from "@nextui-org/react";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBook, BsJournalCheck } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';
import CardOverviewCourse from '../../../../components/Cards/CardOverviewCourse';
import AverageScoreCourse from '../../../../components/Charts/AverageScoreCourse';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';


const OverviewCourse = () => {
    const [isCourseLoading, setIsCourseLoading] = useState(true);
    const [isAverageScoresLoading, setIsAverageScoresLoading] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const router = useRouter();
    const { id } = router.query;

    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (id) {
            loadCourseYear();
            loadAverageScores();
        }
    }, [id]);

    const loadCourseYear = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${id}`);
            const firstElement = data && data.length > 0 ? data[0] : {};
            setCourseYear(firstElement);
            if (firstElement.courseId) {
                loadQuizScore(firstElement.courseId);
                loadAverageScores(); // Load average scores
            }
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
        setIsCourseLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
            setCourse(data);
        } catch (error) {
            console.error("Error loading course:", error);
        } finally {
            setIsCourseLoading(false);
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

    // Show Course Room
    const [courseRoom, setCourseRoom] = useState([])
    useEffect(() => {
        if (id) {
            loadCourseRoom()
        }
    }, [id])

    const loadCourseRoom = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoom/${id}`);
            setCourseRoom(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const totalStudents = courseRoom.reduce((total, room) => total + room.studentId.length, 0);

    const totalAssignments = section.reduce((total, sec) => total + sec.AssignmentData.length, 0);


    const [QuizScoreCourse, setQuizScoreCourse] = useState({})

    useEffect(() => {
        loadQuizScore();
    }, []);


    const loadQuizScore = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quizScoreCourse/${courseId}`);
            setQuizScoreCourse(data)
            console.log(data)
        } catch (error) {
            console.error('Error loading quiz score:', error);
        }
    };



    const [averageScores, setAverageScores] = useState([]);

    const loadAverageScores = async () => {
        setIsAverageScoresLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/average-scores/${id}`);
            setAverageScores(data);
        } catch (error) {
            console.error('Error loading average scores:', error);
        } finally {
            setIsAverageScoresLoading(false);
        }
    };





    return (
        <TeacherRoute>
            <div className="min-h-screen flex flex-col flex-auto  bg-gray-50 text-black ">
                <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={id} />
                <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
                <div className="h-full mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href={'/teacher/home'} >
                                    หน้าหลัก
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href={'/teacher/home'} >
                                    {course.courseName} ม.{course.level}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href={`/teacher/course/year/${course._id}`}>
                                    ปีการศึกษา {courseYear.year}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>ภาพรวมรายวิชา</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-4 w-full">

                        {/* Card */}
                        {isCourseLoading ? (
                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Card className="w-[340px] h-[200] space-y-5 p-4" radius="lg" key={index}>
                                        <Skeleton className="rounded-lg">
                                            <div className="h-24 rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <CardOverviewCourse
                                section={section}
                                courseRoom={courseRoom}
                                totalAssignments={totalAssignments}
                                totalStudents={totalStudents}
                                id={id}
                            />
                        )}



                        {/* Chart */}
                        <div className="flex items-center justify-center flex-wrap ">
                            {isAverageScoresLoading ? (
                                <Card className="w-full h-[350px] space-y-5 p-4 mt-4" radius="lg">
                                    <Skeleton className="rounded-lg">
                                        <div className="h-80 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </Card>
                            ) : (
                                <AverageScoreCourse
                                    QuizScoreCourse={QuizScoreCourse}
                                    courseRoom={courseRoom}
                                    section={section}
                                    averageScores={averageScores}
                                />
                            )}
                        </div>

                        {/* <h2>Average Scores</h2> */}
                        {/* {averageScores.map((lesson) => (
                                <div key={lesson.name}>
                                    <h3>{lesson.name}</h3>
                                    <ul>
                                        {lesson.scores.map((score, index) => (
                                            <li key={index}>Room {index + 1}: {score}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))} */}
                        {/* <pre>{JSON.stringify(averageScores, null, 4)}</pre> */}
                    </div>
                </div>
            </div>
        </TeacherRoute>
    )
}

export default OverviewCourse