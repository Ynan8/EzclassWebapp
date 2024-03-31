import { useRouter } from 'next/router';
import StudentRoute from '../../../../components/Routes/StudentRoute';
import React, { useContext, useEffect, useState } from 'react'
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';
import { BreadcrumbItem, Breadcrumbs, Card, CardBody } from '@nextui-org/react';
import { Context } from '../../../../context';
import axios from 'axios';
import Link from 'next/link';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const studentGradeBook = () => {
    const router = useRouter();
    const { id } = router.query;
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    // Load course 
    const [course, setCourse] = useState({});



    const { state: { user }, dispatch } = useContext(Context);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        if (user && user.firstName) {
            setFirstName(user.firstName);
        }
    }, [user]);



    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();
        }
    }, [id]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    // Get course Year Id
    const [courseYearId, setCourseYearId] = useState()
    const loadCourseYearId = async () => {
        if (id) {

            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseYearId/${id}`);
                setCourseYearId(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }
    useEffect(() => {
        if (courseYearId) {
            loadCodeRoom();
        }
    }, [courseYearId]);


    // Show CodeRoom
    const [codeRoom, setCodeRoom] = useState([])


    const loadCodeRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/codeRoom`, {
                params: {
                    courseYearId: courseYearId,
                },
            });
            setCodeRoom(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }

    // Show Course Room
    const [courseRoomStd, setCourseRoomStd] = useState({})
    useEffect(() => {
        loadCourseRoomStd()
    }, [id])

    const loadCourseRoomStd = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomStd/${id}/${user._id}`);
            setCourseRoomStd(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const courseRoomId = courseRoomStd._id


    const [assignmentScoreRoom, setAssignmentScoreRoom] = useState([]);

    useEffect(() => {
        if (courseRoomId) {  // Make sure id is defined before making the API call
            loadAssignmentRoom(courseRoomId);
        }
    }, [courseRoomId]);  // Add id as a dependency to useEffect

    const loadAssignmentRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }

            const { data: assignmentScores } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignmentRoom/${courseRoomId}`);

            // Filter assignment scores for the specific student
            const filteredScores = assignmentScores.filter(score => score.studentId === user._id);

            // Fetch additional information for each assignment score
            const assignmentScoresWithData = await Promise.all(filteredScores.map(async (assignmentScore) => {
                const [userResponse, assignmentResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API}/user/${assignmentScore.studentId}`),
                    axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentScore.assignmentId}`)
                ]);

                return {
                    ...assignmentScore,
                    studentName: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
                    studentNo: `${userResponse.data.username}`,
                    assignmentName: assignmentResponse.data.assignmentName,
                    scoreLimit: assignmentResponse.data.scoreLimit,
                    weight: assignmentResponse.data.weight
                };
            }));

            setAssignmentScoreRoom(assignmentScoresWithData);
        } catch (error) {
            console.error('Error loading assignment score:', error);
        }
    };

    const totalWeightedScore = assignmentScoreRoom.reduce((total, assignment) => {
        return total + (assignment.score);
    }, 0);

    const totalPossibleScore = assignmentScoreRoom.reduce((total, assignment) => {
        return total + assignment.scoreLimit;
    }, 0);

    const percentage = assignmentScoreRoom.reduce((total, assignment) => {
        return total + (assignment.score / assignment.scoreLimit) * assignment.weight;
    }, 0);


    const calculateGrade = (score) => {
        if (score >= 80) return 4;
        else if (score >= 75) return 3.5;
        else if (score >= 70) return 3;
        else if (score >= 65) return 2.5;
        else if (score >= 60) return 2;
        else if (score >= 55) return 1.5;
        else if (score >= 50) return 1;
        else return 0;
      }

      
    return (
        <StudentRoute>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarStudent mobileSidebarOpen={mobileSidebarOpen} id={id} />
                <HeaderBarStd handleSidebarToggle={toggleSidebar} />
                <div className="h-full mt-28 mb-10 md:ml-64">
                    <div className="px-4 md:px-10"> {/* Use smaller padding on smaller screens */}
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href='/student/home'>
                                    หน้าหลัก
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href='/student/home'>
                                    {course.courseName} {courseRoomStd.roomName}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>ผลการเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-4 md:px-12 pt-8 w-full"> {/* Use smaller padding on smaller screens */}
                        <div className="mx-auto max-w-4xl flex flex-col item-center justify-center"> {/* Center content and limit max width */}
                            {/* <pre>{JSON.stringify(assignmentScoreRoom, null, 4)}</pre> */}
                            <Card className='p-4'>
                                <CardBody>
                                    <div className="flex justify-between items-center flex-col md:flex-row">
                                        <p className='text-2xl font-semibold'>ผลการเรียน</p>
                                        <div className="flex items-center space-x-4 md:space-x-12 mt-4 md:mt-0">
                                            <div className="flex flex-col items-center">
                                                <p className='text-lg md:text-xl font-semibold'>{totalWeightedScore}/{totalPossibleScore}</p>
                                                <p>คะแนน</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className='text-lg md:text-xl font-semibold'>{percentage}%</p>
                                                <p>เปอร์เซ็น</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <p className='text-lg md:text-xl font-semibold'>{calculateGrade(percentage)}</p>
                                                <p>เกรด</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            <Table className="mt-4">
                                <TableHeader>
                                    <TableColumn className='text-base md:text-lg'>ชื่องาน</TableColumn>
                                    <TableColumn className='text-base md:text-lg'>คะแนนเต็ม</TableColumn>
                                    <TableColumn className='text-base md:text-lg'>คะแนนที่ได้</TableColumn>
                                    <TableColumn className='text-base md:text-lg'>คิดเป็น</TableColumn>
                                </TableHeader>

                                <TableBody>
                                    {assignmentScoreRoom.map((assignment, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='text-base md:text-lg'>{assignment.assignmentName}</TableCell>
                                            <TableCell className='text-base md:text-lg'>{assignment.scoreLimit}</TableCell>
                                            <TableCell className='text-base md:text-lg'>{assignment.score}</TableCell>
                                            <TableCell className='text-base md:text-lg'> {(assignment.score / assignment.scoreLimit) * assignment.weight.toFixed(2)} คะแนน</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </StudentRoute>
    )
}

export default studentGradeBook