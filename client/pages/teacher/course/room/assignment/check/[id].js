import React, { Fragment, useEffect, useState } from 'react';
import { BsJournalCheck } from 'react-icons/bs';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
import { AiOutlineArrowLeft, AiOutlineCloudDownload } from 'react-icons/ai';
import Link from 'next/link';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';


const CheckAssignment = () => {
    const [showAssignment, setShowAssignment] = useState(true);
    const [course, setCourse] = useState({});
    const handleAssignmentClick = () => {
        setShowAssignment(true);
    };

    const handleCheckAssignmentClick = () => {
        setShowAssignment(false);
    };


    const [values, setValues] = useState({
        assignmentName: '',
        assignmentDetail: '',
        assignmentDue: '',
        scoreLimit: '',
    })


    const router = useRouter();

    const { id, courseRoomId } = router.query;


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

    const handleEditAssignment = (id) => {
        router.push(`/teacher/course/assignment/edit/${id}?courseRoomId=${courseRoomId}`);
    };

    // Delete assignment
    const [isOpenAssign, setIsOpenAssign] = useState(false);
    const [idAssign, setIdAssign] = useState("");

    const deleteAssignModal = (id) => {
        console.log("ไอดีที่จะลบ " + id);
        setIdAssign(id);
        setIsOpenAssign(true);
    };

    const handleDeleteAssign = async (idAssign) => {
        try {

            const { data } = await axios.delete(`/api/assignment/${courseYearId}/${idAssign}`);


            setIsOpenAssign(false);
            toast.success('ลบงานที่มอบหมายสำเร็จ');
            router.push(`/teacher/course/assignment/${courseYearId}`)
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
            toast.error('ไม่สามารถลบงานที่มอบหมายได้');
        }
    };


    //Show Student submit
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [activeStudentId, setActiveStudentId] = useState(null);

    const showStudentSubmit = async (assignmentId, studentId) => {
        try {
            setActiveStudentId(studentId);

            // Assuming studentSubmit is an array of objects with assignmentId and studentId
            const selectedStudent = studentSubmit.find(
                (student) => student.assignmentId === assignmentId && student.studentId === studentId
            );

            if (selectedStudent) {
                setSelectedStudent(selectedStudent);

                // Access the fileSubmit property and log it
                console.log("fileSubmit:", selectedStudent.fileSubmit);
            } else {
                console.log("Student submission not found");
            }
        } catch (error) {
            console.error('Error fetching student submission:', error);
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

   








    return (
        <>
            <div>
                <Link href={`/teacher/course/room/assignment/${courseRoomId}`} >
                    <div className="p-2 m-2">
                        <AiOutlineArrowLeft size={30} />
                    </div>
                </Link>
                <div className="px-12 w-full">
                    <div className="px-[40px] flex flex-col item-center justify-center mt-6">
                        <div className="flex items-center justify-center space-x-10 text-xl font-medium">
                            <button
                                onClick={handleAssignmentClick}
                                className={showAssignment ? 'border-b-4 border-blue-500' : ''}
                            >
                                มอบหมายงาน
                            </button>
                            <button
                                onClick={handleCheckAssignmentClick}
                                className={!showAssignment ? 'border-b-4 border-blue-500' : ''}
                            >
                                ตรวจงาน
                            </button>
                        </div>
                        {showAssignment ? (
                            // This part is shown when "มอบหมายงาน" is clicked
                            <div>
                                {assignments && (
                                    <div className="flex mt-[22px] w-full gap-[30px]">
                                        <div className="w-full bg-white cursor-pointer rounded-[4px]">
                                            <div className="flex justify-between">
                                                <div className="flex flex-col space-y-6">
                                                    <div className="flex items-center space-x-2">
                                                        <BsJournalCheck size={30} />
                                                        <p className="text-xl font-semibold">{assignments.assignmentName}</p>
                                                    </div>
                                                    <p>มอบหมายเมื่อ {moment(assignments.createdAt)
                                                        .locale('th')
                                                        .format('LL')}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-1 mt-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 relative">
                                                        <textarea
                                                            type="text"
                                                            name="detail"
                                                            value={assignments.assignmentDetail}
                                                            cols="25"
                                                            rows="25"
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label className="block text-base font-medium text-[#07074D]">ไฟล์งาน</label>
                                                    <div className="flex items-center">
                                                        <label
                                                            className="flex items-center cursor-pointer space-x-1 border-2 rounded-md px-2 py-1.5 max-w-max shadow-sm focus:outline-none transition hover:bg-gray-100">
                                                            {assignments.assignmentFile ? (
                                                                <span>{assignments.assignmentFile.originalName}</span>
                                                            ) : (
                                                                <span>No file uploaded</span>
                                                            )}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex mt-[22px] w-full gap-[30px]">
                                <div className="flex flex-col">
                                    {/* <div className="">
                                        <CardDoughnutChart
                                        />
                                    </div> */}
                                    <div className='basis-[40%]  bg-white cursor-pointer rounded-[4px]'>
                                        <table className="w-full border-b border-gray-200">
                                            <thead>
                                                <tr className="text-gray-700 border-b border-gray-200">
                                                    <td className="text-lg py-1 px-4 text-center font-bold">ลำดับ</td>
                                                    <td className="text-lg py-1 px-4 text-center font-bold">ชื่อ - สกุล</td>
                                                    <td className="text-lg py-1 px-4 text-center font-bold">คะแนน</td>
                                                    <td className="text-lg py-1 px-4 text-center font-bold">สถานะ</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentSubmit.length > 0 ? (
                                                    studentSubmit.map((std, index) => (
                                                        <tr
                                                            className="hover:bg-gray-100 transition-colors group"
                                                            onClick={() => showStudentSubmit(std.assignmentId, std.studentId)}
                                                            key={index}
                                                        >
                                                            <td className="text-center py-4">{index + 1}</td>
                                                            <td className="text-center">{std.studentName}</td>
                                                            <td className="text-center">{std.score}</td>
                                                            <td className="py-4 px-4 text-center">
                                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                                    <p className={`px-4 text-center font-medium rounded-md ${std.status === 'ยังไม่ตรวจ'
                                                                        ? 'bg-blue-500 text-white'
                                                                        : std.status === 'ตรวจแล้ว'
                                                                            ? 'bg-green-500 text-white'
                                                                            : std.status === 'ยังไม่ตรวจ' && std.createdAt > assignments.createdAt
                                                                                ? 'bg-red-500 text-white'
                                                                                : ''
                                                                        }`}>
                                                                        {std.status}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-4">ยังไม่มีนักเรียนส่งงาน</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div className="basis-[60%] flex flex-col  bg-white ">
                                    <div className="flex mt-[22px] w-full gap-[30px]">
                                        <div className="w-full bg-white cursor-pointer rounded-[4px]">
                                            <div className="flex justify-between">
                                                <div className="flex flex-col space-y-6">
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-xl font-semibold">งานผู้เรียน</p>
                                                        {/* <p>
                                                            get all studentId in course
                                                            find student id in Submission
                                                            if don't have status ไม่ส่งงาน
                                                            if student id have in Submission check status in submission ตรวจแล้ว or ยังไม่ตรวจ
                                                        </p> */}
                                                    </div>
                                                    {selectedStudent ? (
                                                        <p className='text-xl font-medium' >
                                                            {/* <Avatar 
                                                        className="h-10 w-10 bg-gray-200 border rounded-full" icon={<UserOutlined />} 
                                                        />  */}
                                                            {selectedStudent.studentName}</p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="flex space-x-2 items-center font-medium mb-2">
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="คะแนนงาน"
                                                        value={score}
                                                        onChange={handleScoreChange} // Add the onChange event handler
                                                        className="rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    />
                                                    <p className="text-xl">/{assignments.scoreLimit}</p>
                                                    <button
                                                        onClick={handleCheckButtonClick}
                                                        className="w-full rounded-lg bg-blue-500 hover:bg-blue-700 duration-200 px-6 py-2 text-center font-semibold text-white outline-none"
                                                    >
                                                        ตรวจ
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-1 mt-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 relative">
                                                        {selectedStudent ? (
                                                            <>
                                                                <iframe
                                                                    title="Document Viewer"
                                                                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedStudent.fileSubmit.location)}&embedded=true`}
                                                                    width="800px"
                                                                    height="450px"
                                                                ></iframe>

                                                            </>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="mb-3">
                                                <div className="form-group">
                                                    <label className="block text-base font-medium text-[#07074D]">ไฟล์งาน</label>
                                                    <div className="flex items-center">
                                                        <label className="flex items-center cursor-pointer space-x-1 border-2 rounded-md px-2 py-1.5 max-w-max shadow-sm focus:outline-none transition hover:bg-gray-100">
                                                            Upload button
                                                            <input type="file" name="image" accept="image/*" hidden />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div >
            <Transition appear show={isOpenAssign} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setIsOpenAssign(false)}
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="bg-white rounded-2xl p-6 text-left align-middle shadow-xl transition-all transform">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการลบงานที่มอบหมายหรือไม่?
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        การลบงานที่มอบหมายจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={() => handleDeleteAssign(idAssign)}
                                    >
                                        ลบงานที่มอบหมาย
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={() => setIsOpenAssign(false)}
                                    >
                                        ยกเลิก
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CheckAssignment;
