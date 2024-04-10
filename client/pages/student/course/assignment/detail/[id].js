import React, { Fragment, useContext, useEffect, useState } from 'react';
import StudentRoute from '../../../../../components/Routes/StudentRoute'
import { BsFilePdf, BsJournalCheck } from 'react-icons/bs';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';
import { FaCloudUploadAlt, FaRegEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Button, CardFooter, Chip, Skeleton } from '@nextui-org/react';
import { MdAssignment } from 'react-icons/md';
import { Context } from '../../../../../context';


const DetailAssignment = () => {
    // state
    const { state: { user },
        dispatch,
    } = useContext(Context);


    const [showAssignment, setShowAssignment] = useState(true);
    const [uploadButtonTextFile, setUploadButtonTextFile] = useState('เพิ่มงานของคุณ');
    const [course, setCourse] = useState({});
    const handleAssignmentClick = () => {
        setShowAssignment(true);
    };

    const handleCheckAssignmentClick = () => {
        setShowAssignment(false);
    };


    const [values, setValues] = useState({
        loading: false,
    })

    const router = useRouter();

    const { id, courseId } = router.query;


    // Show assignment
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

    const [assignmentSubmit, setAssignmentSubmit] = useState({})

    useEffect(() => {
        loadAssignmentSubmit();
    }, [id]);

    const loadAssignmentSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/submit/${id}`);
            setAssignmentSubmit(data)
        } catch (error) {
            console.error('Error loading assignment submit:', error);
        }
    };

    const [checkSubmit, setCheckSubmit] = useState({})

    useEffect(() => {
        loadCheckSubmit();
    }, [id]);

    const loadCheckSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/check-submit/${id}`);
            setCheckSubmit(data)
        } catch (error) {
            console.error('Error loading assignment submit:', error);
        }
    };

    const [showLocation, setShowLocation] = useState(false);

    const handleFileClick = () => {
        setShowLocation(true);
    };

    const [assignmentFile, setAssignmentFile] = useState(null);
    const [originalFileName, setOriginalFileName] = useState('');
    const [progressFile, setProgressFile] = useState(0);
    const [uploading, setUploading] = useState(false)

    const handleAssignmentFile = async (e) => {
        try {
            const assignmentFile = e.target.files[0];

            setOriginalFileName(assignmentFile.name); // Set the original file name
            setUploadButtonTextFile(assignmentFile.name);
            setValues({ ...values, loading: true });

            const FileData = new FormData();
            FileData.append("assignmentFile", assignmentFile);

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/assignmentFile-upload`, FileData, {
                onUploadProgress: (e) => {
                    setProgressFile(Math.round((100 * e.loaded) / e.total));
                },
            });

            setAssignmentFile(data);
            setValues({ ...values, loading: false });
        } catch (err) {
            setValues({ ...values, loading: false });
            console.log(err);
        }
    };

    const handleRemoveFile = async () => {
        try {
            setValues({ ...values, loading: true });

            await axios.post(`${process.env.NEXT_PUBLIC_API}/assignment/remove-submit`, {
                assignmentSubmit: {
                    originalName: assignmentSubmit.fileSubmit.originalName,
                    location: assignmentSubmit.fileSubmit.location,
                    bucket: assignmentSubmit.fileSubmit.bucket,
                    key: assignmentSubmit.fileSubmit.key,
                },
            });

            toast.success("ยกเลิกการส่งงานสำเร็จ");
            setValues({ ...values, loading: false });
            setCheckSubmit({}); // Update checkSubmit to reflect the removal
        } catch (err) {
            console.error(err);
            setValues({ ...values, loading: false });
            toast.error("ไม่สามารถยกเลิกส่งงาน");
        }
    }; // Get course Room 
    useEffect(() => {
        if (id) {
            loadCourseRoom();
        }
    }, [courseId]);

    const [courseRoom, setCourseRoom] = useState()
    const loadCourseRoom = async () => {
        if (id) {

            try {
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['authtoken'] = token;
                }
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseRoomId/${courseId}`);
                setCourseRoom(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    const logUser = async (username, userRole, firstName, lastName, action) => {
        try {
            // Send a request to your server-side endpoint to log the user login
            await axios.post(`${process.env.NEXT_PUBLIC_API}/course-logs`, {
                courseId: courseId,
                username,
                firstName,
                lastName,
                userType: userRole, 
                format: action, 
            });
        } catch (error) {
            console.error('Error logging user action:', error);
        }
    };
    
    const handleSubmit = async () => {
        try {
            if (!assignmentFile) {
                // Show an error message or handle the case where no file is selected
                return;
            }
    
            setValues({ ...values, loading: true });
    
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/assignment/submit/${id}/${courseRoom._id}`, {
                fileSubmit: {
                    originalName: originalFileName,
                    location: assignmentFile.Location,
                    bucket: assignmentFile.Bucket,
                    key: assignmentFile.Key,
                },
            });
    
            toast.success('บันทึกการส่งงานสำเร็จ!');
            router.push(`/student/course/lesson/${courseId}`);
            logUser(user.username, user.role, user.firstName, user.lastName, 'อัปโหลดไฟล์');
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Failed to submit assignment. Please try again.');
        } finally {
            setValues({ ...values, loading: false });
        }
    };
    
    const handleCancelSubmit = async () => {
        try {
            setValues({ ...values, loading: true });
    
            // Call the API to cancel the submission
            await axios.post(`${process.env.NEXT_PUBLIC_API}/assignment/cancel-submit`, {
                assignmentId: id,
            });
    
            toast.success("การส่งงานถูกยกเลิกสำเร็จ");
            setCheckSubmit({}); // Clear the submission data
            logUser(user.username, user.role, user.firstName, user.lastName, 'ยกเลิกอัปโหลดไฟล์');
        } catch (error) {
            console.error("Error canceling submission:", error);
            toast.error("ไม่สามารถยกเลิกการส่งงานได้");
        } finally {
            setValues({ ...values, loading: false });
        }
    };
    





    return (
        <StudentRoute>
            <div>
                <Link href={`/student/course/lesson/${courseId}`} >
                    <div className="p-2 m-2">
                        <AiOutlineArrowLeft size={30} />
                    </div>
                </Link>
                <div className="mx-auto max-w-screen-lg px-4 pt-2 pb-20 space-y-12">
                    {assignments && (
                        <div className="flex mt-[22px] w-full gap-[30px]">
                            <div className="w-full bg-white  rounded-[4px]">
                                <div className="flex justify-between">
                                    <div className="flex flex-col space-y-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-warning/10 text-warning p-2 rounded-md">
                                                <MdAssignment size={25} className="text-warning" />
                                            </div>
                                            <p className="text-xl font-semibold">{assignments.assignmentName}</p>
                                        </div>
                                        <p className='text-lg' >
                                            <span className='font-semibold'>มอบหมายเมื่อ</span> {moment(assignments.createdAt)
                                                .locale('th')
                                                .format('LL HH:mm')}
                                        </p>
                                        <p className='text-lg' >
                                            <span className='font-semibold'>กำหนดส่ง</span> {moment(assignments.createdAt)
                                                .locale('th')
                                                .format('LL HH:mm')}
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center rounded-md">
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
                                <div className="flex flex-col space-y-1 mt-3">
                                    <div className="border-t-2"></div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 relative">
                                            <p
                                                className="w-full   bg-white py-3 px-6 text-base font-medium"
                                            >
                                                {assignments.assignmentDetail}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="form-group">
                                        <div className="flex items-center mt-2  ">
                                            {assignments.assignmentFile ? (
                                                <Link
                                                    href={assignments.assignmentFile.location}
                                                    download={assignments.assignmentFile.originalName}
                                                >
                                                    <div
                                                        onClick={handleFileClick}
                                                        className="flex space-x-2 items-center cursor-pointer shadow-md py-3 px-2 border-2 rounded-md w-full focus:outline-none transition hover:bg-gray-100">
                                                        <BsFilePdf size={25} />
                                                        <div className="flex flex-col">
                                                            <p>{assignments.assignmentFile.originalName}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-2 mt-4"></div>

                                <div className="flex justify-between mt-10">
                                    <p className="mt-10text-base font-semibold text-[#07074D]">งานของคุณ</p>
                                    {/* <pre>{JSON.stringify(checkSubmit,null,4)}</pre> */}
                                    {checkSubmit && checkSubmit.fileSubmit ? (
                                        <p className="text-base font-semibold text-green-400">ส่งงานแล้ว</p>
                                    ) : (
                                        <p className="text-base font-semibold text-red-400">ยังไม่ส่งงาน</p>
                                    )}

                                </div>
                                <div className="form-group">
                                    <div className="flex items-center mt-2">
                                        {checkSubmit && checkSubmit.fileSubmit ? (
                                            // If the student has submitted, show file details
                                            <div
                                                onClick={handleFileClick}
                                                className="flex space-x-2 items-center cursor-pointer shadow-md border-green-500 py-3 px-2 border-2 rounded-md w-full  "
                                            >
                                                <div className="bg-gray-200 p-2 rounded-full">
                                                    <BsJournalCheck size={25} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p>{checkSubmit.fileSubmit.originalName}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            // If the student hasn't submitted, show file submission button
                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                <label className="flex items-center justify-center cursor-pointer border-2 border-gray-300 rounded-md px-20 py-2 text-blue-500">
                                                    <p className="mr-2 text-lg">+</p>
                                                    {uploadButtonTextFile}
                                                    <input
                                                        onChange={handleAssignmentFile}
                                                        type="file"
                                                        hidden
                                                        key={uploadButtonTextFile}
                                                    />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {checkSubmit && checkSubmit.fileSubmit ? (
                                    <div className=" flex items-center justify-center w-full  mt-10">
                                        <Button
                                            size='lg'
                                            color='danger'
                                            onClick={handleCancelSubmit}
                                            isLoading={values.loading}
                                        >

                                            ยกเลิกการส่ง
                                        </Button>
                                    </div>
                                ) : (
                                    <div className=" flex items-center justify-center w-full  mt-10">

                                        <Button
                                            size='lg'
                                            className='px-20'
                                            color='primary'
                                            onClick={handleSubmit}
                                            isLoading={values.loading}
                                        >
                                            {values.loading ? 'กำลังโหลด...' : 'บันทึก'}
                                        </Button>

                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </StudentRoute>
    );
};

export default DetailAssignment;
