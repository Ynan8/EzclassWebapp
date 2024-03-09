import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from '@nextui-org/react'
import React from 'react'
import { BsBlockquoteRight, BsFileEarmarkTextFill, BsQuestionSquare, BsThreeDots, BsYoutube } from 'react-icons/bs'
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbTrash } from 'react-icons/tb'
import { FaArrowDown, FaArrowUp, FaTrash } from 'react-icons/fa6';


const UpdateContentLesson = ({
    values,
    setValues,
    contentLessons,
    handleArticleChange,
    handleCodeChange,
    handleVideoChange,
    handleExerciseChange,
    handleUpdateContentLesson,
    handleAnswerChange,
    addAnswer,
    handleCorrectAnswerChange,
    removeAnswer,
    moveContentUp,
    moveContentDown,
    deleteContent,
}) => {
    return (
        <div
            className="mx-auto max-w-screen-lg px-4 pt-20 pb-20 space-y-12"
        >
            {/* <pre>{JSON.stringify(values.contents,null,4)}</pre> */}
            <label className='mb-4 text-2xl font-medium ' >
                ชื่อเนื้อหาบทเรียน
                <Input
                    value={values.lessonName}
                    onChange={(e) => setValues({ ...values, lessonName: e.target.value })}
                    variant='bordered'
                    size='lg'
                    type="text"
                    placeholder='เพิ่มชื่อเนื้อหาบทเรียน...'
                />
            </label>
            {values.contents && values.contents.length > 0 ? (
                values.contents.map((lesson, index) => (
                    <div className="mb-4" key={index}>
                        {lesson.type === 'article' && (
                            <div className="rounded-md shadow-md border border-opacity-50 my-4">
                                <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex justify-between space-x-6">
                                    <div
                                        className="flex items-center justify-between space-x-4">
                                        <div className="min-w-0 flex items-center space-x-3">
                                            <div className="bg-success/10 text-success p-2 rounded-md">
                                                <BsFileEarmarkTextFill
                                                    className='text-success'
                                                    size={30}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="font-medium truncate">บทความ</p>
                                            <p className="text-sm text-gray-500 leading truncate">เพิ่มเนื้อหาบทความ</p>
                                        </div>
                                    </div>
                                    <div className="relative" >
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    size='sm'
                                                    variant="light"
                                                    startContent={<BsThreeDots size={18} />}
                                                />
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                <DropdownSection showDivider>
                                                    <DropdownItem
                                                        key="moveUp"
                                                        onClick={() => moveContentUp(index)}
                                                        startContent={<FaArrowUp size={20} />}

                                                    >
                                                        <p>เลื่อนขึ้น</p>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="moveDown"
                                                        onClick={() => moveContentDown(index)}
                                                        startContent={<FaArrowDown size={20} />}
                                                    >
                                                        <p>เลื่อนลง</p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                                <DropdownSection>
                                                    <DropdownItem
                                                        key="delete"
                                                        onClick={() => deleteContent(index)}
                                                        className="text-danger"
                                                        color="danger"
                                                        startContent={<FaTrash size={20} />}
                                                    >
                                                        <p>
                                                            ลบ
                                                        </p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div>
                                        <JoditEditor
                                            name="richText"
                                            required
                                            value={lesson.article || ""}
                                            onChange={(newContent) => handleArticleChange(newContent, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {lesson.type === 'video' && (
                            <div className="rounded-md shadow-md border border-opacity-50">
                                <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex justify-between space-x-6">
                                    <div
                                        className="flex items-center justify-between space-x-4">
                                        <div className="min-w-0 flex items-center space-x-3">
                                            <div className="bg-danger/10 text-danger p-2 rounded-md">
                                                <BsYoutube
                                                    className='danger text-danger'
                                                    size={30}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="font-medium truncate">วิดีโอ</p>
                                            <p className="text-sm text-gray-500 leading truncate">เพิ่มเนื้อหาบทเรียนวิดีโอ.</p>
                                        </div>
                                    </div>
                                    <div className="relative" >
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    size='sm'
                                                    variant="light"
                                                    startContent={<BsThreeDots size={18} />}
                                                />
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                <DropdownSection showDivider>
                                                    <DropdownItem
                                                        key="moveUp"
                                                        onClick={() => moveContentUp(index)}
                                                        startContent={<FaArrowUp size={20} />}

                                                    >
                                                        <p>เลื่อนขึ้น</p>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="moveDown"
                                                        onClick={() => moveContentDown(index)}
                                                        startContent={<FaArrowDown size={20} />}
                                                    >
                                                        <p>เลื่อนลง</p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                                <DropdownSection>
                                                    <DropdownItem
                                                        key="delete"
                                                        onClick={() => deleteContent(index)}
                                                        className="text-danger"
                                                        color="danger"
                                                        startContent={<FaTrash size={20} />}
                                                    >
                                                        <p>
                                                            ลบ
                                                        </p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="px-8 pt-4 pb-6 space-y-6">
                                    <div className="flex flex-col space-y-1">

                                        <Input
                                            variant='bordered'
                                            size='sm'
                                            type="text"
                                            placeholder="Paste in https://..."
                                            c value={lesson.video || ""}
                                            onChange={(e) => handleVideoChange(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}


                        {lesson.type === 'code' && (
                            <div className="code-display bg-[#282A36] my-4 pb-8 px-4 text-base rounded-lg">
                                <div className="flex justify-between">
                                    <button className="flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed">

                                    </button>
                                    <div className="flex items-center space-x-2  text-white     ">

                                        <div className="relative" >
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <Button
                                                        size='sm'
                                                        variant="light"
                                                        startContent={<BsThreeDots size={18} />}
                                                    />
                                                </DropdownTrigger>
                                                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                    <DropdownSection showDivider>
                                                        <DropdownItem
                                                            key="moveUp"
                                                            onClick={() => moveContentUp(index)}
                                                            startContent={<FaArrowUp size={20} />}

                                                        >
                                                            <p>เลื่อนขึ้น</p>
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            key="moveDown"
                                                            onClick={() => moveContentDown(index)}
                                                            startContent={<FaArrowDown size={20} />}
                                                        >
                                                            <p>เลื่อนลง</p>
                                                        </DropdownItem>
                                                    </DropdownSection>
                                                    <DropdownSection>
                                                        <DropdownItem
                                                            key="delete"
                                                            onClick={() => deleteContent(index)}
                                                            className="text-danger"
                                                            color="danger"
                                                            startContent={<FaTrash size={20} />}
                                                        >
                                                            <p>
                                                                ลบ
                                                            </p>
                                                        </DropdownItem>
                                                    </DropdownSection>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <CodeMirror
                                    style={{ fontSize: 18 }}
                                    theme={dracula}
                                    extensions={[python({ py: true })]}
                                    value={lesson.code || ""}
                                    onChange={(newCode) => handleCodeChange(newCode, index)}
                                />
                            </div>
                        )}

                        {lesson.type === 'exercise' && (
                            <div className="rounded-md shadow-md border border-opacity-50">
                                <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex justify-between space-x-6">
                                    <div
                                        className="flex items-center justify-between space-x-4">
                                        <div className="min-w-0 flex items-center space-x-3">
                                            <div className="bg-primary/10 text-primary p-2 rounded-md">
                                                <BsBlockquoteRight
                                                    className='flex text-primary'
                                                    size={30}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="font-medium truncate">แบบฝึกหัด</p>
                                            <p className="text-sm text-gray-500 leading truncate">เพิ่มคำถามและคำตอบแบบฝึกหัด.</p>
                                        </div>
                                    </div>
                                    <div className="relative" >
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    size='sm'
                                                    variant="light"
                                                    startContent={<BsThreeDots size={18} />}
                                                />
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                <DropdownSection showDivider>
                                                    <DropdownItem
                                                        key="moveUp"
                                                        onClick={() => moveContentUp(index)}
                                                        startContent={<FaArrowUp size={20} />}

                                                    >
                                                        <p>เลื่อนขึ้น</p>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        key="moveDown"
                                                        onClick={() => moveContentDown(index)}
                                                        startContent={<FaArrowDown size={20} />}
                                                    >
                                                        <p>เลื่อนลง</p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                                <DropdownSection>
                                                    <DropdownItem
                                                        key="delete"
                                                        onClick={() => deleteContent(index)}
                                                        className="text-danger"
                                                        color="danger"
                                                        startContent={<FaTrash size={20} />}
                                                    >
                                                        <p>
                                                            ลบ
                                                        </p>
                                                    </DropdownItem>
                                                </DropdownSection>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="px-8 pt-4 pb-6 space-y-6">
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-gray-600">คำถาม</label>

                                        <Input
                                            variant='bordered'
                                            size='sm'
                                            type="text"
                                            placeholder="เพิ่มคำถาม"
                                            value={lesson.exercise?.questionText || ""}
                                            onChange={(e) => handleExerciseChange('questionText', e.target.value, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {lesson.exercise?.answers && lesson.exercise.answers.map((answer, answerIndex) => (
                                            <div key={answerIndex} className="flex items-center space-x-3 rounded-md p-2 bg-transparent">
                                                <Checkbox defaultSelected={answer.isCorrect} color="primary" onChange={(e) => handleCorrectAnswerChange(e.target.checked, index, answerIndex)} />
                                                <Input
                                                    variant='bordered'
                                                    size='sm'
                                                    type="text"
                                                    placeholder={`เพิ่มคำตอบที่ ${answerIndex + 1}`}
                                                    value={answer.answerText}
                                                    onChange={(e) => handleAnswerChange(e.target.value, index, answerIndex)}
                                                />
                                                <button onClick={() => removeAnswer(index, answerIndex)}>
                                                    <TbTrash size={23} />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="flex items-center hover:text-blue-500 duration-200 space-x-2 rounded-md pt-2 px-4">
                                            <AiOutlinePlus />
                                            <button onClick={() => addAnswer(index)}>
                                                เพิ่มคำตอบ
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center mt-12 space-y-8">
                    <div className="w-full border-2 rounded px-4 py-8 group disabled:cursor-default border-dashed bg-gray-50 text-gray-400 hover:border-orange-500 disabled:hover:border-gray-200 transition">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <BsQuestionSquare color="orange" size={45} />
                            <p className="text-lg font-semibold">คุณยังไม่มีเนื้อหาบทเรียน</p>
                            <p className="text-sm">คลิกที่กล่อง <span className="underline font-semibold">ประเภทเนื้อหา</span> จากแถบเมนูดูด้านข้างเพื่อเพิ่มเนื้อหาบทเรียน</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-6">
                <Button
                    size='lg'
                    onClick={handleUpdateContentLesson}
                    color="primary"
                    // isLoading={values.loading}
                    className='px-36 rounded-md'
                >
                    บันทึก {/* {values.loading ? "กำลังโหลด..." : "บันทึก"} */}
                </Button>
            </div>
        </div>

    )
}

export default UpdateContentLesson