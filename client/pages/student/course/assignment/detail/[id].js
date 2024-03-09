import React, { Fragment, useEffect, useState } from 'react';
import { BsJournalCheck } from 'react-icons/bs';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment/min/moment-with-locales";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';
import { FaCloudUploadAlt, FaRegEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { Button, CardFooter, Skeleton } from '@nextui-org/react';


const DetailAssignment = () => {
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
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/check-submit/${id}`);
            setCheckSubmit(data)
            console.log(data)
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
    };



    const handleSubmit = async () => {
        try {
            if (!assignmentFile) {
                // Show an error message or handle the case where no file is selected
                return;
            }

            setValues({ ...values, loading: true });

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/assignment/submit/${id}`, {
                fileSubmit: {
                    originalName: originalFileName,
                    location: assignmentFile.Location,
                    bucket: assignmentFile.Bucket,
                    key: assignmentFile.Key,
                },
            });


            toast.success('บันทึกการส่งงานสำเร็จ!');
            router.push(`/student/course/lesson/${courseId}`);
        } catch (error) {
            console.error('Error submitting assignment:', error);
            toast.error('Failed to submit assignment. Please try again.');
        } finally {
            setValues({ ...values, loading: false });
        }
    };





    return (
        <>
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
                                            <BsJournalCheck size={30} />
                                            <p className="text-2xl font-semibold">{assignments.assignmentName}</p>
                                        </div>
                                        <p>มอบหมายเมื่อ <span className='font-semibold'>{moment(assignments.createdAt)
                                            .locale('th')
                                            .format('LL')}</span></p>
                                        <p>กำหนดส่ง <span className='font-semibold'>{moment(assignments.createdAt)
                                            .locale('th')
                                            .format('LL')}</span></p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center rounded-md">
                                        <p className='text-lg' >{assignments.scoreLimit} คะแนน</p>
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
                                                <div
                                                    onClick={handleFileClick}
                                                    className="flex space-x-2 items-center cursor-pointer shadow-md py-3 px-2 border-2 rounded-md w-full  ">
                                                    <div className="bg-gray-200 p-2 rounded-full">
                                                        <BsJournalCheck size={25} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p>{assignments.assignmentFile.originalName}</p>
                                                        <p>ดาวน์โหลด</p>
                                                    </div>
                                                </div>

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
                                            onClick={handleRemoveFile}
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
        </>
    );
};

export default DetailAssignment;
