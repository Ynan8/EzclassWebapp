import { BreadcrumbItem, Breadcrumbs, Link } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import SectionAccordionStd from '../../../../components/Accordion/SectionAccordionStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import { Context } from '../../../../context';

const LessonStudent = () => {
    const { state: { user },
    dispatch,
} = useContext(Context);
    // Load course 
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);


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
        } catch (error) {
            console.error('Error loading sections:', error);
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


    const [checkSubmit, setCheckSubmit] = useState({})

    useEffect(() => {
        loadCheckSubmit();
    }, [id]);

    const loadCheckSubmit = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/check-submit/${id}`);
            setCheckSubmit(data)
            console.log(data)
        } catch (error) {
            console.error('Error loading assignment submit:', error);
        }
    };


    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SideBarStudent id={id}  />
                <HeaderBarStd />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>{course.courseName} {courseRoomStd.roomName}</BreadcrumbItem>
                            <BreadcrumbItem>บทเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-12 w-full mt-10">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <div
                                className="relative flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0 rounded-lg p-3 border border-gray-200 bg-white"
                            >
                                <div className="w-full md:w-1/4 bg-white grid place-items-center">

                                    {course && course.image && (
                                        <img
                                            className="object-cover rounded"
                                            src={course.image.Location}
                                            alt={course.courseName}
                                        />
                                    )}

                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                    <h3 className="font-black md:text-2xl text-xl">
                                        {course.courseNo} : {course.courseName}
                                    </h3>
                                    <p className="md:text-lg text-gray-600 text-base">{course.detail}</p>
                                    <div className="flex mt-4">
                                        <p className="md:text-lg  text-base"><span className='font-black' >ระดับชั้น :</span> <span className='text-gray-600' > {courseRoomStd.roomName}</span>  </p>
                                        <p className="ml-4 md:text-lg  text-base"><span className='font-black' >ปีการศึกษา :</span> <span className='text-gray-600' >{courseYear.year}</span>  </p>

                                    </div>
                                    <Link href={`/student/course/lesson/view/${id}`}>
                                        <button
                                            className="flex text-lg bg-blue-500 shadow-md shadow-blue-500/50 hover:bg-blue-700 duration-300 py-3  text-white px-24 rounded"
                                        >
                                            เข้าเรียน
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <h1 className=" text-2xl font-semibold text-gray-700"
                                >
                                    บทเรียนทั้งหมด
                                </h1>
                                {/* <div className="flex space-x-12 justify-center ่">
                                    <div className="flex flex-col items-center">
                                        <p className='text-3xl' >5</p>
                                        <p>สิ่งที่ต้องทำ</p>
                                    </div>
                                    <div className="flex flex-col items-center text-green-400">
                                        <p className='text-3xl' >4</p>
                                        <p>ทำเสร็จแล้ว</p>
                                    </div>
                                    <div className="flex flex-col items-center text-red-400">
                                        <p className='text-3xl' >1</p>
                                        <p>ยังทำไม่เสร็จ</p>
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex flex-col space-y-4 mt-4">
                                <SectionAccordionStd
                                    section={section}
                                    id={id}
                                    courseRoomStd={courseRoomStd}
                                    checkSubmit={checkSubmit}
                                    
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonStudent