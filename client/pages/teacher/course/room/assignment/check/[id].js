import React, { Fragment, useEffect, useState } from 'react';
import TeacherRoute from '../../../../../../components/Routes/TeacherRoute';
import { BsFilePdf, BsJournalCheck } from 'react-icons/bs';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
import { AiOutlineArrowLeft, AiOutlineCloudDownload, AiOutlineLeft } from 'react-icons/ai';
import Link from 'next/link';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Tabs, Tab, Chip, Input, Button, } from "@nextui-org/react";
import { MdAssignment } from 'react-icons/md';


const CheckAssignment = () => {

    const router = useRouter();

    const { id, courseRoomId } = router.query;

    const [loading, setLoading] = useState(true);

    // Show assignment
    const [studentSubmit, setStudentSubmit] = useState([])

    useEffect(() => {
        loadStdSubmit();
    }, [id]);

    const loadStdSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/student-submit/${id}`);
            setStudentSubmit(data)
        } catch (error) {
            console.error('Error loading assignments:', error);
        }
    };


    const [assignments, setAssignment] = useState([])

    useEffect(() => {
        loadAssignment();
    }, [id]);

    const loadAssignment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${id}`)
            setAssignment(data)
        } catch (error) {
            console.error('Error loading assignments:', error);
        }
    };

    //Show Student submit
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeStudentId, setActiveStudentId] = useState(null);

    const showStudentSubmit = async (studentId) => {
        setActiveStudentId(studentId); // Set the active student ID

        // Assuming studentSubmit is an array of objects with assignmentId and studentId
        const submission = studentSubmit.find(
            (sub) => sub.assignmentId === id && sub.studentId === studentId // Use `id` from `router.query`
        );

        if (submission) {
            setSelectedStudent(submission); // Set the selected student state with the found submission
            console.log("File Submit:", submission.fileSubmit); // Log the fileSubmit to see if it's being retrieved correctly
        } else {
            console.error("Submission not found for student ID:", studentId);
        }
    };




    // State variable to hold the score
    const [score, setScore] = useState('');

    const handleScoreUpdate = async (assignmentId, studentId, newScore) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            // Assuming you have an API endpoint to update the score and status
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/update-score/${assignmentId}/${studentId}`, {
                newScore,
                status: 'ตรวจแล้ว', // Set the status to 'ตรวจแล้ว' when updating the score
            });
            toast.success("ตรวจงานเรียบร้อย")

        } catch (error) {
            // Handle error (you can show an error message or handle it based on your requirements)
            console.error('Error updating score:', error);
        }
    };

    // Function to handle the "ตรวจ" button click
    const handleCheckButtonClick = async () => {
        if (selectedStudent && selectedStudent.assignmentId && selectedStudent.studentId) {
            // Call the function to update the score and status
            await handleScoreUpdate(selectedStudent.assignmentId, selectedStudent.studentId, score);

            // After updating the score and status, you can reload the student submissions or update the UI as needed
            loadStdSubmit();
        }
    };

    // Function to handle the input field change
    const handleScoreChange = (event) => {
        const newScore = event.target.value;

        // Check if the new score is less than or equal to the score limit
        if (newScore <= assignments.scoreLimit) {
            // Update the score state
            setScore(newScore);
        } else {
            // You can choose to display an error message or handle it in another way
            console.error('Score cannot exceed the score limit');
        }
    };

    const [student, setStudent] = useState([]);
    const loadStudentCourse = async () => {
        if (id) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['authtoken'] = token;
                }
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/studentRoom/${courseRoomId}`);
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


    return (
        <TeacherRoute>
            <div>
                <div className="pl-5 flex items-center text-black  w-96 md:w-96 h-12  border-none pt-10">
                    <button
                        onClick={() => router.push(`/teacher/course/room/assignment/${courseRoomId}`)}
                        className=" text-lg"
                    >
                        <AiOutlineLeft
                            size={25}
                            className="inline-block align-text-bottom mx-2"
                        />
                        ย้อนกลับ
                    </button>
                </div>

                <div className="px-4 w-full">
                    <div className=" flex flex-col item-center justify-center mt-6">
                        <Tabs className='flex items-center justify-center' size='lg' color='primary' >
                            <Tab
                                title="มอบหมายงาน"
                            >
                                <div>
                                    {assignments && (
                                        <div className="flex flex-col md:flex-row mt-6 gap-6 w-full">
                                            <div className="w-full bg-white cursor-pointer rounded-lg">
                                                <div className="flex flex-col md:flex-row justify-between">
                                                    <div className="flex flex-col space-y-6 p-4">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="bg-warning/10 text-warning p-2 rounded-md">
                                                                <MdAssignment size={25} className="text-warning" />
                                                            </div>
                                                            <p className="text-xl font-semibold">{assignments.assignmentName}</p>
                                                        </div>
                                                        <div className="flex flex-col space-y-2">
                                                            <p>
                                                                <span className='font-semibold'>มอบหมายเมื่อ</span> {moment(assignments.createdAt)
                                                                    .locale('th')
                                                                    .format('LL HH:mm')}
                                                            </p>
                                                            <p>
                                                                <span className='font-semibold'>กำหนดส่ง</span> {moment(assignments.assignmentDue)
                                                                    .locale('th')
                                                                    .format('LL HH:mm')}
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col justify-center items-center space-y-2 p-4">
                                                        <Chip
                                                            className="capitalize p-4 text-xl"
                                                            color={"primary"}
                                                            size="lg"
                                                            variant="flat"
                                                        >
                                                            {assignments.scoreLimit} คะแนน
                                                        </Chip>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-1 mt-3 p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex-1 relative">
                                                            <textarea
                                                                type="text"
                                                                name="detail"
                                                                value={assignments.assignmentDetail}
                                                                cols="20"
                                                                rows="10"
                                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 p-4">
                                                    <div className="form-group">
                                                        <p className=" flex space-x-2 text-base font-medium text-[#07074D]"><BsFilePdf size={25} /> ไฟล์งาน</p>
                                                        <div className="flex items-center space-x-2 mt-2">
                                                            {assignments.assignmentFile ? (
                                                                <Link
                                                                    href={assignments.assignmentFile.location}
                                                                    download={assignments.assignmentFile.originalName}
                                                                    className="flex items-center cursor-pointer space-x-1 border-2 rounded-md px-2 py-1.5 max-w-max shadow-sm focus:outline-none transition hover:bg-gray-100"
                                                                >
                                                                    <BsFilePdf size={25} />  <span>{assignments.assignmentFile.originalName}</span>
                                                                </Link>
                                                            ) : (
                                                                <span>No file uploaded</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Tab>
                            <Tab
                                title="ตรวจงาน"
                            >
                                <div className="mt-6 w-full flex flex-col md:flex-row gap-6">
                                    {/* <pre>{JSON.stringify(assignments, null, 4)}</pre> */}
                                    {/* <pre>{JSON.stringify(studentSubmit, null, 4)}</pre> */}
                                    <div className="w-full md:basis-[40%] bg-white rounded-lg">
                                        <table className="text-lg w-full border-b border-gray-200">
                                            <thead>
                                                <tr className="font-medium text-gray-700 border-b border-gray-200">
                                                    <th className="py-4 px-4 text-center font-bold">ลำดับ</th>
                                                    <th className="py-4 px-4 text-center font-bold">ชื่อ - สกุล</th>
                                                    <th className="py-4 px-4 text-center font-bold">คะแนน</th>
                                                    <th className="py-4 px-4 text-center font-bold">สถานะ</th>
                                                </tr>
                                            </thead>
                                            <tbody className='cursor-pointer'>
                                                {student.length > 0 ? (
                                                    student.map((stud, index) => {
                                                        // Find the corresponding submission for this student
                                                        const submission = studentSubmit.find(sub => sub.studentId === stud._id);
                                                        // Calculate the difference between assignmentDue and createdAt
                                                        const assignmentDue = new Date(assignments.assignmentDue);
                                                        const submissionDate = new Date(submission?.createdAt);
                                                        const isLateSubmission = submissionDate > assignmentDue;

                                                        return (
                                                            <tr
                                                                className={`hover:bg-gray-100 transition-colors group ${isLateSubmission ? 'text-red-500' : ''}`}
                                                                key={stud._id}
                                                                onClick={() => showStudentSubmit(stud._id)}
                                                            >
                                                                <td className="text-center py-4">{index + 1}</td>
                                                                <td className="text-center">{stud.firstName} {stud.lastName}</td>
                                                                <td className="text-center">
                                                                    {submission ? submission.score : 'ยังไม่มีคะแนน'}
                                                                </td>
                                                                <td className="py-4 px-4 text-center">
                                                                    <div className="flex flex-col items-center justify-center space-y-1">
                                                                        <Chip
                                                                            size='lg'
                                                                            className="capitalize"
                                                                            color={
                                                                                submission
                                                                                    ? isLateSubmission
                                                                                        ? 'danger'
                                                                                        : submission.status === 'ตรวจแล้ว'
                                                                                            ? 'success'
                                                                                            : 'primary'
                                                                                    : 'primary'
                                                                            }
                                                                            variant="flat"
                                                                        >
                                                                            {submission ? (isLateSubmission ? 'ส่งงานช้า' : submission.status) : 'ยังไม่ส่งงาน'}
                                                                        </Chip>

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-4">
                                                            ยังไม่มีนักเรียนส่งงาน
                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>

                                    </div>

                                    <div className="w-full md:basis-[60%] flex flex-col bg-white">
                                        <div className="mt-6 w-full gap-6">
                                            <div className="w-full bg-white rounded-lg">
                                                <div className="flex flex-col md:flex-row justify-between p-4">
                                                    <div className="flex flex-col space-y-6">
                                                        <div className="flex items-center space-x-2">
                                                            <p className="text-xl font-semibold">งานผู้เรียน</p>
                                                            {selectedStudent ? (
                                                                <p className='text-xl font-medium'>
                                                                    {selectedStudent.studentName}
                                                                </p>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col md:flex-row space-x-2 items-center font-medium mb-2 p-4">
                                                        <Input
                                                            variant="bordered"
                                                            type="number"
                                                            label="คะแนนงาน"
                                                            value={score}
                                                            onChange={handleScoreChange}
                                                        />
                                                        <p className="text-xl">/{assignments.scoreLimit}</p>
                                                        <Button
                                                            size='lg'
                                                            variant='solid'
                                                            radius='lg'
                                                            onPress={handleCheckButtonClick}
                                                            color="primary"
                                                        >
                                                            ตรวจ
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col space-y-1 mt-3 p-4">
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex-1 relative">
                                                            {selectedStudent ? (
                                                                <>
                                                                    {selectedStudent.fileSubmit ? ( // Check if fileSubmit exists
                                                                        <iframe
                                                                            title="Document Viewer"
                                                                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedStudent.fileSubmit.location)}&embedded=true`}
                                                                            width="100%"
                                                                            height="450px"
                                                                            onLoad={() => setLoading(false)} // Set loading to false when iframe is loaded
                                                                        ></iframe>
                                                                    ) : (
                                                                        <div>Loading...</div> // Display loading indicator while waiting for the iframe to load
                                                                    )}
                                                                </>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div >
        </TeacherRoute>
    );
};

export default CheckAssignment;
