import TeacherRoute from '../../../../../components/Routes/TeacherRoute';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { Button, Switch } from '@nextui-org/react';
import UpdateQuizLesson from '../../../../../components/form/UpdateQuizLesson';



const EditQuiz = () => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const { id, courseYear } = router.query;

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(true);
    const [values, setValues] = useState({
        timeLimitMinutes: '',
        maxAttempts: -1,
        passingThreshold: '',
    })
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (courseYear) {
            loadSection();
        }
    }, [courseYear]);


    const [section, setSection] = useState(null);

    const loadSection = async () => {
        setIsLoading(true);
        try {
            const { data: sectionData } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section/${id}`);
            setSection(sectionData);
        } catch (error) {
            console.error('Error loading section:', error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (id) {
            loadQuiz();
        }
    }, [id]);

    const loadQuiz = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/readQuiz/${id}`);
                setValues(data);
            } catch (error) {
                console.error("Error loading quiz:", error);
            }
        }
    }

    const handleUpdateQuiz = async () => {
        try {
            setLoading(true);
            // Create a new quizData object with updated values
            const updatedQuizData = {
                ...values, // Use the existing values
                published: status,
            };

            console.log(updatedQuizData);

            // Send the updated data to the server
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/section/updateQuiz/${id}`, {
                quiz: updatedQuizData,
            });

            // Update the state with the response data if needed
            setValues((prevValues) => ({
                ...prevValues,
                ...response.data,
            }));

            toast.success('แก้ไขแบบทดสอบสำเร็จ');
            router.push(`/teacher/course/lesson/${courseYear}`)
            setLoading(false);
        } catch (error) {
            console.error("Error updating quiz:", error);
            setLoading(false);
        }
    };

    const handleChangeStatus = (e) => {
        const newStatus = e.target.checked;
        setStatus(newStatus);
        console.log(newStatus);
    };


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            // Check if the window width is within the mobile range (e.g., 768 pixels)
            const isMobile = window.innerWidth < 768;

            // Set isSidebarOpen accordingly
            setSidebarOpen(!isMobile);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize on component mount to set initial state
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <TeacherRoute>
            <div className="flex min-h-screen bg-white">
                <div class="fixed w-full flex items-center justify-between h-14 text-white z-10">
                    <div class="flex-1 flex justify-between items-center h-16   bg-white w-full border-b border-gray-300">
                        <div className="flex items-center ml-4">

                            <span
                                className="text-white text-4xl top-5 left-4 cursor-pointer"
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                            >
                                {isSidebarOpen ? (
                                    " "
                                ) : (
                                    <div className=" text-black p-2 hover:bg-gray-100 rounded">
                                        <AiOutlineMenu size={23} />
                                    </div>
                                )}
                            </span>
                        </div>
                        <div className="flex space-x-4 ml-auto mr-4">
                            <button class="flex space-x-2 border-2 border-blue-500 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                แบบร่าง
                                <div className="ml-2 form-check flex items-center justify-center form-switch">
                                    <Switch onChange={(e) => handleChangeStatus(e)} size='sm' defaultSelected aria-label="Automatic updates" />
                                </div>
                            </button>
                        </div>
                    </div>


                    <div
                        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-96 overflow-y-auto  bg-white border-r-2 ${isSidebarOpen ? '' : 'hidden 2xl:block'
                            }`}
                    >
                        <div class="flex items-center text-black  w-96 md:w-96 h-16  border-none">
                            <button
                                onClick={() => router.push(`/teacher/course/lesson/${courseYear}`)}
                                className=" text-lg"
                            >
                                <AiOutlineLeft size={25} className="inline-block align-text-bottom mx-2" />
                                ย้อนกลับ
                            </button>
                        </div>
                        <AiOutlineClose color='black' className="text-3xl mr-2 mt-2 cursor-pointer ml-auto 2xl:hidden" onClick={toggleSidebar} />
                        <div className="flex flex-col my-2  px-4 text-gray-900">
                            <h2 className="text-xl font-medium" >เพิ่มแบบทดสอบ</h2>
                            <p className="text-sm text-gray-500 mb-3">กรอกข้อมูลแบบทดสอบให้ครบ เพื่อเพิ่มข้อมูลในการสร้างแบบทดสอบ</p>
                            <div className="space-y-4">
                                <div className="flex flex-col mb-2">
                                    <label className="block text-lg  text-gray-900 dark:text-white">
                                        เวลาที่กำหนด (นาที)
                                        <span className="text-red-400 ml-[2px]">*</span>
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="timeLimit"
                                        value={values.timeLimitMinutes}
                                        onChange={(e) => setValues((prevValues) => ({ ...prevValues, timeLimitMinutes: e.target.value }))}
                                        className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                                        placeholder="เวลาที่กำหนด"
                                    />
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label className="block text-lg text-gray-900 dark:text-white">
                                        จำนวนครั้งในการทำแบบทดสอบ (ครั้ง)
                                        <span className="text-red-400 ml-[2px]">*</span>
                                    </label>
                                    <select
                                        required
                                        name="attemptAllowance"
                                        value={values.maxAttempts}
                                        onChange={(e) => setValues((prevValues) => ({ ...prevValues, maxAttempts: e.target.value }))}
                                        className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                                    >
                                        {[...Array(3)].map((_, index) => (
                                            <option key={index} value={index + 1}>{index + 1}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className="flex flex-col mb-3">
                                    <label className="block text-lg  text-gray-900 dark:text-white">
                                        เกณฑ์การผ่าน (เปอร์เซ็นต์)
                                        <span className="text-red-400 ml-[2px]">*</span>
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="passingGrade"
                                        value={values.passingThreshold}
                                        onChange={(e) => setValues((prevValues) => ({ ...prevValues, passingThreshold: e.target.value }))}
                                        className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                                        placeholder="เกณฑ์การผ่าน"

                                    />
                                </div>
                                <div className="flex flex-col mb-2">
                                    <Button
                                        onClick={handleUpdateQuiz}

                                        color="primary"
                                        size="lg"
                                    >
                                        บันทึก
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex-grow ml-1/4`} style={{ overflowY: 'auto', paddingLeft: isSidebarOpen ? '20%' : 0 }}>
                    <div class=" flex-grow h-full  mt-20 mb-10 ">
                        <UpdateQuizLesson
                            values={values}
                            setValues={setValues}
                        />
                    </div>
                </div>
            </div>
        </TeacherRoute>
    )
}

export default EditQuiz
