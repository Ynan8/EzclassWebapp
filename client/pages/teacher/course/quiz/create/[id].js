import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Switch } from '@nextui-org/react';
import QuizLesson from '../../../../../components/form/QuizLesson';

const CreateQuiz = () => {
  const router = useRouter();
  const { id, courseYear } = router.query;

  const [status, setStatus] = useState(true);
  const [quizName, setQuizName] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [attemptAllowance, setAttemptAllowance] = useState(1);
  const [passingGrade, setPassingGrade] = useState('');
  const [questions, setQuestions] = useState([]);


  const handleAddQuizData = async () => {
    try {
      const quizData = {
        quizName: quizName,
        maxAttempts: attemptAllowance,
        passingThreshold: passingGrade,
        timeLimitMinutes: timeLimit,
        questions: questions,
        published: status
      };

      const formData = {
        sectionId: id,
        quiz: quizData,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/section/addQuiz`, formData);

      toast.success('เพิ่มแบบทดสอบสำเร็จ');
      router.push(`/teacher/course/lesson/${courseYear}`)
    }
    catch (error) {
      console.error("Error adding content lesson:", error);
    }
  };

  const handleAttemptAllowanceChange = (e) => {
    const selectedValue = e.target.value;
    setAttemptAllowance(parseInt(selectedValue));
  }

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
    <div>
      <div className="flex min-h-screen bg-white">
        <div class="fixed w-full flex items-center justify-between h-14 text-white z-10">
          <div class="flex-1 flex items-center h-16   bg-white w-full border-b border-gray-300">
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
              {/* <button class="flex items-center space-x-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ตัวอย่าง
              </button> */}
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
            <div className="flex flex-col">
              <div className="flex flex-col my-2 px-4 text-gray-900">
                <h2 className="text-xl font-medium" >เพิ่มแบบทดสอบ</h2>
                <p className="text-sm text-gray-500 mb-3">กรอกข้อมูลแบบทดสอบให้ครบ เพื่อเพิ่มข้อมูลในการสร้างแบบทดสอบ</p>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="block text-lg text-gray-900 dark:text-white">
                      ชื่อแบบทดสอบ
                      <span className="text-red-400 ml-[2px]">*</span>
                    </label>
                    <input
                      required
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      type="text"
                      className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                      placeholder="ชื่อแบบทดสอบ"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label className="block text-lg  text-gray-900 dark:text-white">
                      เวลาที่กำหนด (นาที)
                      <span className="text-red-400 ml-[2px]">*</span>
                    </label>
                    <input
                      required
                      type="number"
                      name="timeLimit"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
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
                      value={attemptAllowance === -1 ? "unlimited" : attemptAllowance.toString()}
                      className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                      onChange={handleAttemptAllowanceChange}
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
                      value={passingGrade}
                      onChange={(e) => setPassingGrade(e.target.value)}
                      className="shadow-sm rounded-md py-2 px-4 border-2 focus:outline-none focus:border-blue-400 transition"
                      placeholder="เกณฑ์การผ่าน"

                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <Button
                      onClick={handleAddQuizData}
                      className="active:scale-[.98] active:duration-75 
                            transition-all hover:scale-[1.01] ease-in-out transform
                            bg-blue-500 rounded-xl text-white text-lg"
                      type="primary"
                      size="large"
                    >
                      บันทึก
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex-grow ml-1/4`} style={{ paddingLeft: isSidebarOpen ? '20%' : 0 }}>
          <div class=" flex-grow h-full  mt-20 mb-10 ">
            <QuizLesson
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz
