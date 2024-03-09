import React, { useEffect, useState } from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input } from "@nextui-org/react";

import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBook, BsJournalCheck } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';
import CardOverviewCourse from '../../../../components/Cards/CardOverviewCourse';
import AverageScoreCourse from '../../../../components/Charts/AverageScoreCourse';
import { useRouter } from 'next/router';
import axios from 'axios';


const OverviewCourse = () => {
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

    const courseId = courseYear.courseId

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
        try {
            
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/average-scores/${id}`);
            setAverageScores(data);
        } catch (error) {
            console.error('Error loading average scores:', error);
        }
    };



    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto  bg-gray-50 text-black ">
                <SideBarTeacher courseYearId={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อวิชา</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อปีการศึกษา</BreadcrumbItem>
                            <BreadcrumbItem>ภาพรวมรายวิชา</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-12 w-full">
                        {/* Card */}
                        {/* <pre>{JSON.stringify(QuizScoreCourse, null, 4)}</pre> */}
                        <CardOverviewCourse
                            section={section}
                            courseRoom={courseRoom}
                            totalAssignments={totalAssignments}
                            totalStudents={totalStudents}

                        />


                        {/* Chart */}
                        <div className="flex items-center justify-center flex-wrap ">
                            <AverageScoreCourse
                                QuizScoreCourse={QuizScoreCourse}
                                courseRoom={courseRoom}
                                section={section}
                                averageScores={averageScores}
                            />
                        </div>
                        <div>
                            <h2>Average Scores</h2>
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
                            <pre>{JSON.stringify(averageScores, null, 4)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCourse