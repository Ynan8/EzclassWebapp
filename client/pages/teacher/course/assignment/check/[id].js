import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import { BiBookAdd } from 'react-icons/bi';
import Link from 'next/link';
import { BsJournalCheck } from 'react-icons/bs';
import { FaRegEdit, FaTrash } from 'react-icons/fa';

const AssignmentCheck = () => {
    // Load course 
    const [course, setCourse] = useState({});
    const [assignments, setAssignments] = useState([]); // Changed the state variable name to be more descriptive

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            loadAssignment();
        }
    }, [id]); // Depend on id instead of course

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

    const loadAssignment = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment`, {
                params: {
                    courseId: id,
                }
            });
            setAssignments(data);
        } catch (error) {
            console.error('Error loading assignments:', error);
        }
    };

    // Show section
    const [section, setSection] = useState([])

    useEffect(() => {
        loadSection();
    }, [id]);

    const loadSection = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section`, {
                params: {
                    courseId: id,
                },
            });
            setSection(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    };

    // student submit
    const [studentSubmit, setStudentSubmit] = useState([])

    useEffect(() => {
        loadStdSubmit();
    }, []);

    const loadStdSubmit = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/all/student-submit/${id}`);
            setStudentSubmit(data)
        } catch (error) {
            console.error('Error loading assignments:', error);
        }
    };


    useEffect(() => {
        if (id) {
            loadStudentCourse();
        }
    }, [id]);

    // student enroll
    const [student, setSetStudent] = useState([]);

    const loadStudentCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/student/enroll/${id}`);
                setSetStudent(data)
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    const calculateSubmissionPercentage = (assignmentId) => {
        // Filter students who have submitted the assignment
        const studentsWithSubmission = studentSubmit.filter((submission) => submission.assignmentId === assignmentId);
    
        // Calculate the percentage
        const totalStudents = student.length;
        const percentage = totalStudents > 0 ? (studentsWithSubmission.length / totalStudents) * 100 : 0;
    
        return percentage.toFixed(2); // Round to two decimal places
    };
    



    const handleCreateAssignment = () => {
        router.push({
            pathname: '/teacher/course/assignment/createAssignment',
            query: {
                courseId: id,
            }
        });
    };


    return (
        <>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                {/* <SidebarView id={id} />
                <HeaderBarView course={course} /> */}
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        <nav className="text-gray-500" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <a href="#">หน้าหลัก</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li>
                                    <a href="#" className=" text-blue-500 font-bold" aria-current="page">มอบหมายงาน</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="flex p-8 ">
                        <div className="flex space-x-2 ml-auto">
                            <button
                                onClick={() => {
                                    handleCreateAssignment();
                                }}
                                className="flex text-lg bg-blue-500 hover:bg-blue-700 duration-300 shadow-xl py-2  text-white  px-4 rounded"
                            >
                                <BiBookAdd className='flex justify-center mr-1 items-center' size={25} /> + มอบหมายงาน
                            </button>
                        </div>

                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {section.map((sectionItem, sectionIndex) => (
                                <div key={sectionItem._id} className="my-2">
                                    {/* Check if there are assignments for the current section */}
                                    {assignments.some((assignment) => assignment.sectionId === sectionItem._id) && (
                                        <p className='text-2xl font-medium mb-3'>บทที่ {sectionIndex + 1} {sectionItem.sectionName}</p>
                                    )}
                                    {assignments.map((assignment, index) => (
                                        assignment.sectionId === sectionItem._id && (
                                            <Link key={index} href={`/teacher/course/assignment/check/${assignment._id}?courseId=${id}`}>
                                                <div className="p-3 w-full bg-white mb-4 border-2 shadow-sm rounded-lg cursor-pointer">
                                                    <div className="flex flex-col space-y-3">
                                                        <div className="flex">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="bg-blue-500 p-2 rounded-full">
                                                                    <BsJournalCheck size={25} color="white" />
                                                                </div>
                                                                <p className="text-[22px] font-medium">
                                                                    งานชิ้นที่ {index + 1} {assignment.assignmentName}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col  space-y-2">
                                                            <div className="w-[230px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                                <div className="bg-green-500 h-2.5  rounded-full" style={{ width: `${calculateSubmissionPercentage(assignment._id)}%` }}></div>
                                                            </div>
                                                            <p>ส่งงานแล้ว {calculateSubmissionPercentage(assignment._id)}%</p>
                                                            <div className=" rounded-lg ">
                                                                <p className='font-bold' >กำหนดส่ง {moment(assignment.assignmentDue)
                                                                    .locale('th')
                                                                    .format('LL')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AssignmentCheck