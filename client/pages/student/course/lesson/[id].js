import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Skeleton } from '@nextui-org/react';
import StudentRoute from '../../../../components/Routes/StudentRoute';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import SectionAccordionStd from '../../../../components/Accordion/SectionAccordionStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import { Context } from '../../../../context';

const LessonStudent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSectionsLoading, setIsSectionsLoading] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };


    const { state: { user },
        dispatch,
    } = useContext(Context);

    // Load course 
    const [course, setCourse] = useState({});


    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();
        }
    }, [id]);

    const loadCourse = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
            setCourse(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error loading course:", error);
            setIsLoading(false);
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

    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (courseYearId) {
            loadCourseYear();
        }
    }, [courseYearId]);

    const loadCourseYear = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${courseYearId}`);
            const firstElement = data && data.length > 0 ? data[0] : {};
            setCourseYear(firstElement);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };


    console.log(courseYear)


    // Show section
    useEffect(() => {
        if (id) {
            loadSection();
        }
    }, [course, courseYearId]);

    const [section, setSection] = useState([])
    const loadSection = async () => {
        setIsSectionsLoading(true);
        try {
            const { data: sections } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section`, {
                params: {
                    courseYearId: courseYearId,
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
            setIsSectionsLoading(false);
        } catch (error) {
            console.error('Error loading sections:', error);
            setIsSectionsLoading(false);
        }
    };


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

    const [isNavigating, setIsNavigating] = useState(false);


    const handleGoToLessonView = () => {
        setIsNavigating(true); // Set loading to true

        router.push(`/student/course/lesson/view/${id}`).then(() => {
            setIsNavigating(false); // Set loading to false after navigation is complete
        }).catch((error) => {
            console.error('Navigation error:', error);
            setIsNavigating(false); // Set loading to false if navigation fails
        });
    };

    const [completedLessons, setCompletedLessons] = useState([]);

    // complete lesson
    useEffect(() => {
        if (id) loadCompletedLessons();
    }, [id]);

    const loadCompletedLessons = async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/list-completed`, {
            courseId: id
        })
        setCompletedLessons(data)
    }

    const [completedQuiz, setCompletedQuiz] = useState([]);


    // complete quiz
    useEffect(() => {
        if (id) loadCompletedQuiz();
    }, [id]);


    const loadCompletedQuiz = async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/list-completedQuiz`, {
            courseId: id
        })
        setCompletedQuiz(data)
    }

    const [completedAssignments, setCompletedAssignments] = useState([]);

    // complete lesson
    useEffect(() => {
        if (id) loadCompletedAssignments();
    }, [id]);

    const loadCompletedAssignments = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/complete-assignment/${id}`)
        setCompletedAssignments(data)
    }
    let completedProgress = 0;

    completedProgress = completedQuiz.length + completedLessons.length + + completedAssignments.length

    const totalTodo = section.reduce((acc, cur) => acc + cur.lessonData.length + cur.quizData.length, 0)

    const noCompleted = totalTodo - completedProgress;



    return (
        <StudentRoute>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SideBarStudent mobileSidebarOpen={mobileSidebarOpen} id={id} />
                <HeaderBarStd handleSidebarToggle={toggleSidebar} />
                <div className="h-full mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href='/student/home' >
                                    หน้าหลัก
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href='/student/home' >
                                    {course.courseName} {courseRoomStd.roomName}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>บทเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-4 w-full mt-10">
                        <div className="flex flex-col item-center justify-center">
                            {isLoading ? (
                                // Render Skeleton components when data is loading
                                <div className="w-full flex items-center gap-3">
                                    <Skeleton className="flex rounded-full w-32 h-32" />
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    </div>
                                </div>
                            ) : (
                                // Render actual data once it's loaded
                                <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0 rounded-lg p-3 border border-gray-200 bg-white">
                                    <div className="w-full md:w-1/4 bg-white grid place-items-center">
                                        {course && course.image && (
                                            <img
                                                className="w-full md:w-auto max-w-xs h-auto object-cover rounded" // Ensures the image is full width on small screens and automatically sized on md screens
                                                src={course.image.Location}
                                                alt={course.courseName}
                                            />
                                        )}
                                    </div>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                        <h3 className="font-black text-xl md:text-2xl">
                                            {course.courseNo} : {course.courseName}
                                        </h3>
                                        <p className="text-base md:text-lg text-gray-600">
                                            {course.detail}
                                        </p>
                                        <div className="flex flex-col md:flex-row mt-4 space-y-2 md:space-y-0 md:space-x-4">
                                            <p className="text-base md:text-lg">
                                                <span className='font-black'>ระดับชั้น: </span>
                                                <span className='text-gray-600'>{courseRoomStd.roomName}</span>
                                            </p>
                                            <p className="text-base md:text-lg">
                                                <span className='font-black'>ปีการศึกษา: </span>
                                                <span className='text-gray-600'>{courseYear.year}</span>
                                            </p>
                                        </div>
                                        <div className="">
                                            <Button
                                                onClick={handleGoToLessonView}
                                                className='w-full md:w-auto md:px-24 py-2'
                                                radius='md'
                                                size='lg'
                                                color="primary"
                                                variant='shadow'
                                                disabled={isNavigating}
                                                isLoading={isNavigating}
                                            >
                                                {isNavigating ? 'กำลังโหลด...' : 'เข้าเรียน'}
                                            </Button>

                                        </div>
                                    </div>
                                </div>

                            )}
                            {/* {isSectionsLoading ? (
                                <Skeleton className=" mt-8 rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-100"></div>
                                </Skeleton>
                            ) : (
                                <Card className='p-3 mt-8'>
                                    <CardBody>
                                        <div className="flex justify-between items-center flex-col md:flex-row">
                                            <p className='text-2xl text-gray-700 font-semibold'>สิ่งที่ต้องทำ</p>
                                            <div className="flex items-center space-x-4 md:space-x-12 mt-4 md:mt-0">
                                                <div className="flex flex-col items-center text-default-500">
                                                    <p className='text-2xl md:text-3xl font-semibold'>{section.reduce((acc, cur) => acc + cur.lessonData.length + cur.quizData.length + cur.AssignmentData.length, 0)}</p>
                                                    <p className='text-lg'>สิ่งที่ต้องทำ</p>
                                                </div>

                                                <div className="flex flex-col items-center text-green-500">
                                                    <p className='text-2xl md:text-3xl font-semibold'>{completedProgress}</p>
                                                    <p className='text-lg'>ทำเสร็จแล้ว</p>
                                                </div>
                                                <div className="flex flex-col items-center text-red-500">
                                                    <p className='text-2xl md:text-3xl font-semibold'>{noCompleted}</p>
                                                    <p className='text-lg'>ยังไม่เสร็จ</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                            )} */}

                            <div className="flex justify-between items-center mt-4">
                                <h1 className="p-3 text-2xl font-semibold text-gray-700"
                                >
                                    บทเรียนทั้งหมด
                                </h1>
                            </div>
                            <div className="flex flex-col space-y-4 mt-4">
                                {isSectionsLoading ? (
                                    <div className="p-4 w-full flex items-center gap-3">
                                        <Skeleton className="flex rounded-full w-12 h-12" />
                                        <div className="w-full flex flex-col gap-3">
                                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        </div>
                                    </div>
                                ) : (
                                    <SectionAccordionStd
                                        section={section}
                                        id={id}
                                        courseRoomStd={courseRoomStd}
                                        completedLessons={completedLessons}
                                        completedQuiz={completedQuiz}
                                        completedAssignments={completedAssignments}
                                    />
                                )}
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </StudentRoute >
    )
}

export default LessonStudent
