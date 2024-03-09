import { Listbox, ListboxItem, ListboxSection, Switch } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineClose, AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import { BsBlockquoteRight, BsFileCodeFill, BsFileEarmarkTextFill, BsYoutube } from 'react-icons/bs';
import UpdateContentLesson from '../../../../../components/form/UpdateContentLesson';

const EditContentLesson = () => {
    const router = useRouter();
    const { id, courseYear } = router.query;

    const [status, setStatus] = useState(true);

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (id) {
            loadLesson();
        }
    }, [id]);

    const loadLesson = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/readLesson/${id}`);
                setValues(data);
                console.log(data)
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }


    const [values, setValues] = useState({
        lessonName: '',
    })

    const [selectedType, setSelectedType] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [contentLessons, setContentLessons] = useState([]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        // Check if the selected type is different from the deleted section's type
        if (type !== activeType) {
            setActiveType(type); // Set the active content type
        }
        addContentLessons(type);
    };

    const addContentLessons = (type) => {
        let newLesson;
        if (type === "article") {
            newLesson = { type: "article", article: "" };
        } else {
            newLesson = { type: type, file: null };
        }

        // Update the state with the new content section
        setValues((prevValues) => ({
            ...prevValues,
            contents: [...prevValues.contents, newLesson],
        }));
    };


    const handleArticleChange = (content, index) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            updatedContents[index].article = content;
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };



    const handleCodeChange = (code, index) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            updatedContents[index].code = code;
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const handleVideoChange = (video, index) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            updatedContents[index].video = video;
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const handleExerciseChange = (field, value, index) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            if (!updatedContents[index].exercise) {
                updatedContents[index].exercise = { questionText: '', answers: [] };
            }
            if (field === 'questionText') {
                updatedContents[index].exercise.questionText = value;
            } else if (field === 'answers') {
                updatedContents[index].exercise.answers = value;
            }
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const handleAnswerChange = (value, lessonIndex, answerIndex) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            if (!updatedContents[lessonIndex].exercise) {
                updatedContents[lessonIndex].exercise = { questionText: '', answers: [] };
            }
            updatedContents[lessonIndex].exercise.answers[answerIndex].answerText = value;
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const handleCorrectAnswerChange = (isChecked, lessonIndex, answerIndex) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            if (!updatedContents[lessonIndex].exercise) {
                updatedContents[lessonIndex].exercise = { questionText: '', answers: [] };
            }
            updatedContents[lessonIndex].exercise.answers[answerIndex].isCorrect = isChecked;
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const addAnswer = (lessonIndex) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            if (!updatedContents[lessonIndex].exercise) {
                updatedContents[lessonIndex].exercise = { questionText: '', answers: [] };
            }
            updatedContents[lessonIndex].exercise.answers.push({ answerText: '', isCorrect: false });
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };

    const removeAnswer = (lessonIndex, answerIndex) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            updatedContents[lessonIndex].exercise.answers.splice(answerIndex, 1);
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };


    const moveContentUp = (index) => {
        setValues((prevValues) => {
            if (index > 0) {
                const updatedContents = [...prevValues.contents];
                [updatedContents[index], updatedContents[index - 1]] = [updatedContents[index - 1], updatedContents[index]];
                return {
                    ...prevValues,
                    contents: updatedContents,
                };
            }
            return prevValues;
        });
    };


    const moveContentDown = (index) => {
        setValues((prevValues) => {
            if (index < prevValues.contents.length - 1) {
                const updatedContents = [...prevValues.contents];
                [updatedContents[index], updatedContents[index + 1]] = [updatedContents[index + 1], updatedContents[index]];
                return {
                    ...prevValues,
                    contents: updatedContents,
                };
            }
            return prevValues;
        });
    };

    const deleteContent = (index) => {
        setValues((prevValues) => {
            const updatedContents = [...prevValues.contents];
            updatedContents.splice(index, 1);
            return {
                ...prevValues,
                contents: updatedContents,
            };
        });
    };



    const handleChangeStatus = (e) => {
        const newStatus = e.target.checked;
        setStatus(newStatus);
        console.log(newStatus);
    };



    const handleUpdateContentLesson = async () => {
        try {
            const updatedContents = values.contents.map((lesson) => {
                const { type, article, video, code, exercise } = lesson;

                return {
                    type,
                    article: type === 'article' ? article || '' : undefined,
                    video: type === 'video' ? video || '' : undefined,
                    code: type === 'code' ? code || '' : undefined,
                    exercise: type === 'exercise' ? exercise || [] : undefined,
                };
            });

            const updatedLesson = {
                lessonName: values.lessonName,
                contents: updatedContents,
                published: status,
            };

            setValues((prevValues) => ({
                ...prevValues,
                lessonName: values.lessonName,
                contents: updatedContents,
                published: status,
            }));

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/section/updateContentLesson/${id}`, updatedLesson);

            console.log(updatedLesson);

            toast.success('แก้ไขเนื้อหาบทเรียนสำเร็จ');
            router.push(`/teacher/course/lesson/${courseYear}`);
        } catch (error) {
            console.error('Error updating content lesson:', error);
        }
    };



    return (
        <div>
            {/* <pre>{JSON.stringify(values.contents,null,4)}</pre> */}
            <div className="flex min-h-screen bg-white">
                <div class="fixed w-full flex items-center justify-between h-14 text-white z-10">
                    <div class="flex-1 flex items-center h-16   bg-white w-full border-b border-gray-300">
                        <div className="flex items-center ml-4">
                            <span
                                className="text-white text-4xl top-5 left-4 cursor-pointer"
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                            >
                                {isSidebarOpen ? (
                                    ""
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
                            <button class="flex items-center space-x-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                ตัวอย่าง
                            </button>
                        </div>
                    </div>

                    {/* sidebar */}
                    <div
                        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-96 overflow-y-auto bg-white border-r-2 ${isSidebarOpen ? '' : 'hidden 2xl:block'
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
                            <div className="mt-4 px-4 text-black">
                                <Listbox variant="faded" aria-label="Listbox menu with descriptions">
                                    <ListboxSection
                                        title={
                                            <div className='flex flex-col  text-lg' >
                                                <p className="text-xl text-black font-semibold" >ประเภทเนื้อหาบทเรียน</p>
                                                <p className="text-gray-500 mb-3">เลือกเนื้อหาด้านล่างแล้วคลิกเพื่อเขียนบทเรียนตามที่คุณต้องการ</p>
                                            </div>
                                        }  >
                                        <ListboxItem
                                            onClick={() => handleTypeSelect("video")}
                                            className='py-2 mb-1'
                                            key="new"
                                            description={
                                                <p className="text-sm text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาวิดีโอจาก Youtube</p>
                                            }
                                            startContent={
                                                <div className="bg-danger/10 text-danger p-2 rounded-md">
                                                    <BsYoutube
                                                        className="text-danger"
                                                        size={35}
                                                    />
                                                </div>

                                            }
                                        >
                                            <p className="font-medium text-black truncate">วิดีโอ</p>
                                        </ListboxItem>
                                        <ListboxItem
                                            onClick={() => handleTypeSelect("article")}

                                            className='py-2 mb-1'
                                            key="copy"
                                            description={
                                                <p className="text-sm  text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาบทเรียนจากบทความ</p>
                                            }
                                            startContent={
                                                <div className="bg-success/10 text-success p-2 rounded-md">
                                                    <BsFileEarmarkTextFill
                                                        className='text-success'
                                                        size={35}
                                                    />
                                                </div>

                                            }
                                        >
                                            <p className="font-medium text-black truncate">บทความ</p>
                                        </ListboxItem>
                                        <ListboxItem
                                            onClick={() => handleTypeSelect("code")}
                                            className='py-2 mb-1'
                                            key="edit"
                                            showDivider
                                            description={
                                                <p className="text-sm   text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาตัวอย่างโค้ด</p>
                                            }
                                            startContent={
                                                <div className="bg-secondary/10 text-secondary p-2 rounded-md">
                                                    <BsFileCodeFill
                                                        className='text-secondary'
                                                        size={35}
                                                    />
                                                </div>
                                            }
                                        >
                                            <p className="font-medium text-black truncate">โค้ด</p>
                                        </ListboxItem>
                                    </ListboxSection>

                                    <ListboxSection title={
                                        <div className='flex flex-col  text-lg' >
                                            <p className="text-xl text-black font-semibold" >แบบฝึกหัด</p>
                                            <p className="text-gray-500 mb-3">เพิ่มแบบฝึกหัด เพื่อวัดความเข้าใจเนื้อหาบทเรียนของนักเรียน</p>
                                        </div>
                                    }  >
                                        <ListboxItem
                                            onClick={() => handleTypeSelect("exercise")}
                                            className='py-2 mb-1'
                                            key="delete"
                                            color="danger"
                                            description={
                                                <p className="text-sm text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาตัวอย่างโค้ด</p>
                                            }
                                            startContent={
                                                <div className="bg-primary/10 text-primary p-2 rounded-md">
                                                    <BsBlockquoteRight
                                                        className='text-primary'
                                                        size={35}
                                                    />
                                                </div>
                                            }
                                        >
                                            <p className="font-medium text-black truncate">แบบฝึกหัด</p>
                                        </ListboxItem>
                                    </ListboxSection >
                                </Listbox>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex-grow ml-1/4`} style={{ paddingLeft: isSidebarOpen ? '20%' : 0 }}>
                    <div class=" flex-grow h-full  mt-20 mb-10 ">
                        {/* content */}
                        <UpdateContentLesson
                            values={values}
                            setValues={setValues}
                            contentLessons={contentLessons}
                            handleArticleChange={handleArticleChange}
                            handleCodeChange={handleCodeChange}
                            handleVideoChange={handleVideoChange}
                            handleExerciseChange={handleExerciseChange}
                            handleUpdateContentLesson={handleUpdateContentLesson}
                            handleAnswerChange={handleAnswerChange}
                            addAnswer={addAnswer}
                            handleCorrectAnswerChange={handleCorrectAnswerChange}
                            removeAnswer={removeAnswer}
                            moveContentUp={moveContentUp}
                            moveContentDown={moveContentDown}
                            deleteContent={deleteContent}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditContentLesson
