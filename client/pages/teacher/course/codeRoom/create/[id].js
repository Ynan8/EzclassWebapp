import React, { useState } from 'react'
import FirstForm from '../../../../../components/CodeRoomForm/FirstForm'
import SecondForm from '../../../../../components/CodeRoomForm/SecondForm'
import ThirdForm from '../../../../../components/CodeRoomForm/ThirdForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import SideBarTeacher from '../../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher'
import { Avatar, Button,  } from '@nextui-org/react'
import { AiOutlineLeft } from 'react-icons/ai'
import Link from 'next/link'

const createCodeRoom = () => {
    const router = useRouter();
    const { id, courseYear } = router.query;
    const formList = ["FirstForm", "SecondForm", "ThirdForm"];

    const formLength = formList.length;

    const initiaValues = {
        codeRoomName: "",
        detailCodeRoom: "",
        detailInput: "",
        detailOutput: "",
        consTraints: "",
        input1: '',
        output1: '',
        input2: '',
        output2: '',
        input3: '',
        output3: '',
    }
    const [values, setValues] = useState(initiaValues)

    const [page, setPage] = useState(0);

    const handlePrev = () => {
        setPage(page === 0 ? formLength - 1 : page - 1);
    };


    const handleNext = () => {
        // Validation check for the current step's form fields
        switch (page) {
            case 0: {
                if (!values.codeRoomName || !values.detailCodeRoom) {
                    // If any required field is missing, display an error message or perform any other action you want
                    toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
                    return;
                }
                break;
            }
            case 1: {
                if (!values.input1 || !values.output1 || !values.input2 || !values.output2 || !values.input3 || !values.output3) {
                    // If any required field is missing, display an error message or perform any other action you want
                    toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
                    return;
                }
                break;
            }
            default:
                break;
        }
        setPage(page === formLength - 1 ? 0 : page + 1);
    };



    const [selectedPublish, setSelectedPublish] = useState("public");

    const handleButtonClick = (option) => {
        setSelectedPublish(option);
    };

    const [selectedDifficulty, setSelectedDifficulty] = useState(0);

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
        // You can perform additional actions based on the selected difficulty if needed
    };

    const difficultyLevels = [
        { label: 'ง่ายมาก', stars: 1 },
        { label: 'ง่าย', stars: 2 },
        { label: 'ปานกลาง', stars: 3 },
        { label: 'ยาก', stars: 4 },
        { label: 'ยากมาก', stars: 5 },
    ];



    const handleForms = () => {
        switch (page) {
            case 0: {
                return (
                    <div>
                        <FirstForm formValue={values} onChange={onChange} />
                    </div>
                );
            }
            case 1: {
                return (
                    <SecondForm formValue={values} onChange={onChange} />
                );
            }
            case 2: {
                return <ThirdForm
                    handleButtonClick={handleButtonClick}
                    selectedPublish={selectedPublish}
                    selectedDifficulty={selectedDifficulty}
                    difficultyLevels={difficultyLevels}
                    handleDifficultySelect={handleDifficultySelect}
                />

            }
            default:
                return null;
        }
    };

    const onChange = (e) => {
        const { name, value, } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            // e.preventDefault();
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/codeRoom/${id}/${courseYear}`, {
                ...values,
                Published: selectedPublish,
                Difficulty: selectedDifficulty,
            });
            toast.success("สร้างห้องเรียนเขียนโค้ดสำเร็จ")
            router.push(`/teacher/course/codeRoom/${courseYear}`)
        } catch (error) {
            console.log(error)
        }
    };




    const setForm = (e) => {
        const name = e.target.innerText;
        switch (name) {
            case "Person Info": {
                return setPage(0);
            }
            case "Other Info": {
                return setPage(1);
            }
            case "Login Info": {
                return setPage(2);
            }
            default:
                setPage(0);
        }
    };

    return (
        <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
            <SideBarTeacher courseYearId={courseYear} />
            <HeaderBarTeacher />
            <div class="h-full ml-14 mt-28 mb-10 md:ml-64">
               
                <div className="px-10">
                <Link href={`/teacher/course/codeRoom/${courseYear}`}>
                    <div className="flex item-center space-x-2  w-28">
                        <AiOutlineLeft size={30} />
                        <p>ย้อนกลับ</p>
                    </div>
                </Link>
                    <div class="max-w-4xl mx-auto bg-white p-16">
                        <ul className="flex justify-between w-full mb-16">
                            <li className={`rounded-lg relative flex items-center ${page === 0 ? 'border-2 bg-blue-500 border-blue-500  py-4 px-14' : 'border-2 border-blue-300  py-4 px-14'}`}>
                                <Avatar
                                    name='1'
                                    className={` text-lg ${page === 0 ? 'bg-white text-blue-500' : 'bg-blue-300'}`} size={50}
                                >
                                    <span className="text-2xl p-2 ">1</span>
                                </Avatar>
                                <span className={`${page === 0 ? 'ml-2 text-white font-medium' : 'ml-2 text-blue-300'}`}>
                                    ข้อมูลทั่วไป
                                </span>
                            </li>

                            <li className={`rounded-lg relative flex items-center ${page === 1 ? 'border-2 bg-blue-500 border-blue-500  py-4 px-14' : 'border-2 border-blue-300 py-4 px-14'}`}>
                                <Avatar
                                    name='2'
                                    className={`text-lg ${page === 1 ? 'bg-white text-blue-500' : 'bg-blue-300'}`} size={50}
                                >
                                    <span className="text-2xl">2</span>
                                </Avatar>
                                <span className={`${page === 1 ? 'ml-2 text-white font-medium' : 'ml-2 text-blue-300'}`}>
                                    กรณีทดสอบ
                                </span>
                            </li>

                            <li className={`rounded-lg relative flex items-center ${page === 2 ? 'border-2 bg-blue-500 border-blue-500  py-4 px-14' : 'border-2 border-blue-300  py-4 px-14'}`}>
                                <Avatar
                                    name='3'
                                    className={`text-lg ${page === 2 ? 'bg-white text-blue-500' : 'bg-blue-300'}`} size={50}>
                                    <span className="text-2xl">3</span>
                                </Avatar>
                                <span className={`${page === 2 ? 'ml-2 text-white font-medium' : 'ml-2 text-blue-300 cursor-pointer'}`}>
                                    การเผยแพร่
                                </span>
                            </li>
                        </ul>


                        {handleForms()}
                    </div>
                    <div className="flex space-x-20 item-center justify-center">
                        <Button
                            className='px-12'
                            size='md'
                            disabled={page === 0}
                            onClick={handlePrev}
                            color="primary"
                            variant='bordered'
                        >
                            ย้อนกลับ
                        </Button>
                        {page === 2 ? (
                            <Button
                                className='px-12'
                                size='md'
                                onClick={handleSubmit}
                                color="primary">
                                เสร็จสิ้น
                            </Button>
                        ) : (
                            <Button
                                className='px-12'
                                size='md'
                                onClick={handleNext}
                                color="primary">
                                ดำเนินการต่อ
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default createCodeRoom