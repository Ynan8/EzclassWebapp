import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import axios from 'axios';
import AverageScoreRoom from '../../../../../components/Charts/AverageScoreRoom';
import { BreadcrumbItem, Breadcrumbs, Pagination } from '@nextui-org/react';


const SingleRoom = () => {
    // Show Course Year
    const router = useRouter();
    const { id } = router.query;

    // Load CourseRoom
    const [courseRoomSingle, setCourseRoomSingle] = useState({});


    useEffect(() => {
        if (id) {
            loadCourseRoom();
        }
    }, [id]);


    const loadCourseRoom = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomSingle/${id}`);
                setCourseRoomSingle(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    const courseYearId = courseRoomSingle.courseYearId;


    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (courseYearId) {
            loadCourseYear();
            loadAverageScores();
        }
    }, [courseYearId]);

    const loadCourseYear = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${courseYearId}`);
            const firstElement = data && data.length > 0 ? data[0] : {};
            setCourseYear(firstElement);
            if (firstElement.courseId) {
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
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    const [quizScoreRoom, setQuizScoreRoom] = useState([]);

    useEffect(() => {
        loadQuizScoreRoom();
    }, [id]);

    const loadQuizScoreRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }

            const { data: quizScores } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quizScoreRoom/${id}`);

            // Fetch additional information for each quiz score
            const quizScoresWithData = await Promise.all(quizScores.map(async (quizScore) => {
                const [userResponse, sectionResponse, quizResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API}/user/${quizScore.studentId}`),
                    axios.get(`${process.env.NEXT_PUBLIC_API}/section/${quizScore.sectionId}`),
                    axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/${quizScore.quizId}`) // Add this line to fetch the quiz data
                ]);
                const maxScore = quizResponse.data.questions.reduce((total, currentQuestion) => {
                    return total + currentQuestion.score;
                }, 0);
                return {
                    ...quizScore,
                    studentName: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
                    sectionName: sectionResponse.data.sectionName,
                    quizName: quizResponse.data.quizName,
                    maxScore: maxScore,
                };
            }));

            setQuizScoreRoom(quizScoresWithData);
        } catch (error) {
            console.error('Error loading quiz score:', error);
        }
    };

    const [averageScoresRoom, setAverageScoresRoom] = useState([]);

    const loadAverageScores = async () => {
        try {
            // Use the proper variable names for courseYearId and id (courseRoomId) as they are in your component's state
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/average-scores-room/${courseYearId}/${id}`);
            setAverageScoresRoom(data);
        } catch (error) {
            console.error('Error loading average scores:', error);
        }
    };

    const quizzes = quizScoreRoom.reduce((acc, item) => {
        if (!acc.some(quiz => quiz.quizName === item.quizName)) {
            acc.push({ quizName: item.quizName, maxScore: item.maxScore });
        }
        return acc;
    }, []);




    const highestScoresByStudent = quizScoreRoom.reduce((acc, current) => {
        const existing = acc.find(item => item.studentId === current.studentId);
        if (existing) {
            if (current.score > existing.score) {
                existing.score = current.score;
            }
        } else {
            acc.push({ ...current });
        }
        return acc;
    }, []);

    const scoresByStudent = quizScoreRoom.reduce((acc, current) => {
        acc[current.studentId] = acc[current.studentId] || [];
        acc[current.studentId].push(current.score);
        return acc;
    }, {});

    const highestAndAverageScoresByStudent = Object.entries(scoresByStudent).map(([studentId, scores]) => {
        const highestScore = Math.max(...scores);
        const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const student = quizScoreRoom.find(score => score.studentId === studentId);
        return {
            studentId,
            studentName: student.studentName,
            highestScore,
            averageScore,
        };
    });


    const [student, setStudent] = useState([]);
    const loadStudentCourse = async () => {
        if (id) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['authtoken'] = token;
                }
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/studentRoom/${id}`);
                setStudent(data)
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    useEffect(() => {
        if (id) {
            loadStudentCourse();
        }
    }, [id]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(student.length / itemsPerPage);





    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SidebarTeacherRoom id={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    {/* <pre>{JSON.stringify(courseRoomSingle,null,4)}</pre> */}
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg' maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>{course.courseName} {courseRoomSingle.roomName}</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
                            <BreadcrumbItem>ภาพรวมห้องเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-12 w-full my-8">
                        <div className="flex items-center justify-center flex-wrap ">
                            <AverageScoreRoom
                                averageScoresRoom={averageScoresRoom}
                            />
                        </div>
                        <div>
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
                            {/* <pre>{JSON.stringify(quizScoreRoom, null, 4)}</pre> */}
                        </div>
                        <p className='text-xl font-semibold' >จำนวนนักเรียนทั้งหมด {student.length} คน</p>
                        <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                            <div className="table-container max-w-800 overflow-x-auto">
                                <table className="w-full border-b border-gray-200">
                                    <thead>
                                        <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                                            <td className="py-4 px-4 text-center font-bold">ลำดับ</td>
                                            <td className="py-4 px-4 text-center font-bold">ชื่อ - สกุล</td>
                                            <td className="py-4 px-4 text-center font-bold">คะแนนเฉลี่ยรวม</td>
                                            {quizzes.map((quiz, index) => (
                                                <td key={index} className="py-4 px-4 text-center">
                                                    <div className="flex flex-col items-center justify-center space-y-1">
                                                        <span className="text-center font-bold">{quiz.quizName}</span>
                                                        <button className="text-center">คะแนนเต็ม {quiz.maxScore}</button>
                                                    </div>
                                                </td>
                                            ))}


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student
                                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                            .map((student, index) => {
                                                const matchingScore = highestScoresByStudent.find(
                                                    (score) => score.studentId === student._id
                                                );
                                                const matchingAverageScore = highestAndAverageScoresByStudent.find(
                                                    (score) => score.studentId === student._id
                                                );
                                                return (
                                                    <tr key={student._id} className="hover:bg-gray-100 transition-colors group">
                                                        <td className="text-center py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td className="text-center">{student.firstName} {student.lastName}</td>
                                                        <td className="text-center">
                                                            {matchingAverageScore ? (
                                                                <>
                                                                    คะแนนเฉลี่ย <span className="font-bold">{matchingAverageScore.averageScore} คะแนน</span>
                                                                </>
                                                            ) : (
                                                                "ยังไม่ทำแบบทดสอบ"
                                                            )}
                                                        </td>
                                                        {/* Render score cells */}
                                                        <td className="text-center">
                                                            {matchingScore ? (
                                                                <>
                                                                    คะแนนที่ได้มากที่สุด <span className="font-bold">{matchingScore.score} คะแนน</span>
                                                                </>
                                                            ) : (
                                                                "ยังไม่ทำแบบทดสอบ"
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                                <div className="flex justify-center mt-2">
                                    <Pagination
                                        size='lg'
                                        total={totalPages}
                                        initialPage={1}
                                        page={currentPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />

                                </div>
                                {/* <pre>{JSON.stringify(highestScoresByStudent, null, 4)}</pre>
                                <pre>{JSON.stringify(student, null, 4)}</pre> */}
                                {/* <pre>{JSON.stringify(averageScoresRoom, null, 4)}</pre> */}
                                <div className="flex flex-col text-center mt-4">
                                    {/* {highestScoresByStudent.length === 0 ? (
                                        <>
                                            <h1 className='text-4xl font-bold text-gray-500 mt-4' >ยังไม่มีข้อมูลแบบทดสอบนักเรียน</h1>
                                            <p className="text-gray-600">
                                                คุณยังไม่มีมูลแบบทดสอบนักเรียน คลิกที่เมนู <span className='text-blue-800 font-semibold'>จัดการผู้ใช้</span> เพื่อเพิ่มนักเรียน
                                            </p>
                                        </>
                                    ) : (
                                        ''
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRoom