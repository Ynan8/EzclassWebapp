import React, { useState } from 'react'
import { BsQuestionSquare, BsThreeDots } from 'react-icons/bs'
import { TbTrash } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { IoIosCheckboxOutline, IoIosRadioButtonOn, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const QuizLesson = ({
    questions,
    setQuestions,
}) => {


    const [selectedQuestionType, setSelectedQuestionType] = useState('multiple-choice');

    const handleAddQuestion = (type = 'multiple-choice') => {
        let newQuestion;

        switch (type) {
            case 'multiple-choice':
                newQuestion = {
                    questionText: '',
                    questionType: 'multiple-choice',
                    options: ['', ''],
                    correctOptionIndex: [],
                    score: 1, // Set a default score here
                };
                break;

            case 'single-choice':
                newQuestion = {
                    questionText: '',
                    questionType: 'single-choice',
                    options: ['', ''],
                    correctOptionIndex: [],
                    score: 1, // Set a default score here
                };
                break;

            case 'true-false':
                newQuestion = {
                    questionText: '',
                    questionType: 'true-false',
                    options: ['True', 'False'],
                    correctOptionIndex: null,
                    score: 1, // Set a default score here
                };
                break;



            default:
                newQuestion = {
                    questionText: '',
                    questionType: 'multiple-choice',
                    options: ['', ''],
                    correctOptionIndex: [],
                    score: 1,
                };
        }

        setQuestions([...questions, newQuestion]);
        console.log(questions)
    };


    const handleQuestionTypeChange = (e, index) => {
        const newQuestions = [...questions];
        newQuestions[index].questionType = e.target.value;
        setQuestions(newQuestions);
    };

    const handleSubmit = () => {
        const formData = questions.map((question, index) => {
            switch (question.questionType) {
                case 'multiple-choice':
                    return {
                        questionIndex: index + 1,
                        questionType: question.questionType,
                        questionText: question.questionText,
                        options: question.options,
                        correctOptionIndex: question.correctOptionIndex,
                        score: question.score
                    };

                case 'single-choice':
                    return {
                        questionIndex: index + 1,
                        questionType: question.questionType,
                        questionText: question.questionText,
                        options: question.options,
                        correctOptionIndex: question.correctAnswerIndex
                    };

                case 'true-false':
                    return {
                        questionIndex: index + 1,
                        questionType: question.questionType,
                        questionText: question.questionText,
                        answer: question.trueFalseOptions
                    };

                default:
                    return null; // Handle other question types if needed
            }
        });

        console.log(formData);
    };


    const handleCheckboxChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];

        if (question.questionType === 'multiple-choice') {
            // Handle multiple-choice questions
            const currentIndex = question.correctOptionIndex.indexOf(optionIndex);
            const newIndexes = [...question.correctOptionIndex];

            if (currentIndex === -1) {
                newIndexes.push(optionIndex);
            } else {
                newIndexes.splice(currentIndex, 1);
            }

            question.correctOptionIndex = newIndexes;
        } else if (question.questionType === 'single-choice') {
            // Handle single-choice questions
            question.correctAnswerIndex = optionIndex;
        }

        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleAddAnswer = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push('');
        setQuestions(updatedQuestions);
    };


    const handleScoreChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].score = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTextChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOpenEndAnswerChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].openEndAnswer = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleTrueFalseChange = (e, index) => {
        const updatedQuestions = [...questions];
        // Assuming you have a property like 'trueFalseOptions' in your question object
        updatedQuestions[index].trueFalseOptions = e.target.value;
        setQuestions(updatedQuestions);
    };


    const handleRemoveAnswer = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };


    return (
        <div
            className="mx-auto max-w-screen-lg px-4 pt-20 pb-20 space-y-12"
        >
            {questions && questions.length > 0 ? (
                questions.map((question, index) => (
                    <div className="w-full rounded p-8" key={index}>

                        <div className="rounded-md shadow-md border border-opacity-50">
                            <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex items-center justify-between space-x-6">
                                <div>
                                    <p className="font-semibold text-lg">คำถามข้อที่ {index + 1}</p>
                                </div>
                                <div>
                                    <div className="flex space-x-2 items-center">
                                        <select
                                            className="shadow-sm rounded-md p-2 border-2 focus:outline-none focus:border-blue-400 transition"
                                            value={question.questionType}
                                            onChange={(e) => handleQuestionTypeChange(e, index)}
                                        >
                                            <option value="multiple-choice">ตอบได้หลายข้อ</option>
                                            <option value="single-choice">ตอบได้ข้อเดียว</option>
                                            <option value="true-false">ถูก/ผิด</option>
                                        </select>
                                        <Input
                                            variant='bordered'
                                            size='sm'
                                            type="number"
                                            placeholder="คะแนน"
                                            label="คะแนน"
                                            value={question.score}
                                            onChange={(e) => handleScoreChange(e, index)}
                                        />
                                        <div className="relative">
                                            <BsThreeDots className="h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-8 pt-4 pb-6 space-y-6">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-600">คำถาม</label>
                                    <input
                                        type="text"
                                        className="shadow-sm rounded-md py-2 px-4 border focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-20 focus:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="เพิ่มคำถาม"
                                        value={question.questionText}
                                        onChange={(e) => handleQuestionTextChange(e, index)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    {question.questionType === 'multiple-choice' && (
                                        <>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center space-x-3 rounded-md p-2 bg-transparent">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={question.correctOptionIndex.includes(optionIndex)}
                                                        onChange={() => handleCheckboxChange(index, optionIndex)}

                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder={`เพิ่มคำตอบที่ ${optionIndex + 1}`}
                                                        className="bg-transparent focus:outline-none w-full"
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(e, index, optionIndex)}
                                                    />
                                                    <button>
                                                        <TbTrash size={23} onClick={() => handleRemoveAnswer(index, optionIndex)} />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="flex items-center hover:text-blue-500 duration-200 space-x-2 rounded-md pt-2 px-4">
                                                <AiOutlinePlus onClick={() => handleAddAnswer(index)} />
                                                <button onClick={() => handleAddAnswer(index)}>
                                                    เพิ่มคำตอบ
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {question.questionType === 'single-choice' && (
                                        <>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center space-x-3 rounded-md p-2 bg-transparent">
                                                    <input
                                                        type="radio"
                                                        checked={question.correctAnswerIndex === optionIndex}
                                                        onChange={() => handleCheckboxChange(index, optionIndex)}
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder={`เพิ่มคำตอบที่`}
                                                        className="bg-transparent focus:outline-none w-full"
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(e, index, optionIndex)}
                                                    />
                                                    <button>
                                                        <TbTrash size={23} onClick={() => handleRemoveAnswer(index, optionIndex)} />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="flex items-center hover:text-blue-500 duration-200 space-x-2 rounded-md pt-2 px-4">
                                                <AiOutlinePlus onClick={() => handleAddAnswer(index)} />
                                                <button onClick={() => handleAddAnswer(index)}>
                                                    เพิ่มคำตอบ
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {question.questionType === 'true-false' && (
                                        <>
                                            <label className="flex items-center space-x-3 rounded-md p-2 bg-transparent">
                                                <input
                                                    type="radio"
                                                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) => handleTrueFalseChange(e, index)}
                                                    value="True"
                                                    checked={questions[index].trueFalseOptions === 'True'}
                                                />
                                                <p
                                                    className="bg-transparent focus:outline-none w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    True
                                                </p>
                                            </label>
                                            <label className="flex items-center space-x-3 rounded-md p-2 bg-transparent">
                                                <input
                                                    type="radio"
                                                    className="w-4 h-4  bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) => handleTrueFalseChange(e, index)}
                                                    value="False"
                                                    checked={questions[index].trueFalseOptions === 'False'}
                                                />
                                                <p
                                                    className="bg-transparent focus:outline-none w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    False
                                                </p>
                                            </label>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
                : (
                    <div className="flex flex-col items-center justify-center mt-12 space-y-8">
                        <div className="w-full border-2 rounded px-4 py-8 group disabled:cursor-default border-dashed bg-gray-50 text-gray-400 hover:border-orange-500 disabled:hover:border-gray-200 transition">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <BsQuestionSquare color="orange" size={45} />
                                <p className="text-lg font-semibold">คุณยังไม่มีคำถามในแบบทดสอบ</p>
                                <p className="text-sm">คลิกที่ปุ่ม <span className="underline font-semibold">+ เพิ่มคำถาม</span> ด้านล่างเพื่อเพิ่มคำถามในแบบทดสอบ</p>
                            </div>
                        </div>
                    </div>
                )}
            <div className="flex flex-col items-center justify-center mt-12 space-y-8">
                <Button
                    onClick={handleAddQuestion}
                    className="active:scale-[.98] active:duration-75 
            transition-all hover:scale-[1.01] ease-in-out transform
            bg-blue-500 rounded-xl text-white text-lg px-10"
                    type="primary"
                    size="large"
                >
                    + เพิ่มคำถาม
                </Button>
            </div>
        </div>

    )
}

export default QuizLesson