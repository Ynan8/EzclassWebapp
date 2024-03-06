import { Button, Checkbox, Input, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosCheckboxOutline, IoIosRadioButtonOn, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { TbTrash } from 'react-icons/tb';

const UpdateQuizLesson = ({
    values,
    setValues,
    questions,
    setQuestions


}) => {

    const handleAddQuestion = (type = 'multiple-choice') => {
        let newQuestion;

        switch (type) {
            case 'multiple-choice':
                newQuestion = {
                    questionText: '',
                    questionType: 'multiple-choice',
                    options: ['', ''],
                    correctOptionIndex: []
                };
                break;

            case 'single-choice':
                newQuestion = {
                    questionText: '',
                    questionType: 'single-choice',
                    options: ['', ''],
                    correctAnswerIndex: null
                };
                break;

            case 'true-false':
                newQuestion = {
                    questionText: '',
                    questionType: 'true-false',
                    options: ['True', 'False'],
                    trueFalseOptions: null
                };
                break;

            case 'open-end':
                newQuestion = {
                    questionText: '',
                    questionType: 'open-end',
                    openEndAnswer: ''
                };
                break;

            default:
                newQuestion = {
                    questionText: '',
                    questionType: 'multiple-choice',
                    options: ['', ''],
                    correctOptionIndex: []
                };
        }

        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions, newQuestion];
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };



    const handleQuestionTypeChange = (e, index) => {
        setValues((prevValues) => {
            const updatedQuestions = [...values.questions];
            updatedQuestions[index].questionType = e.target.value;
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };

    const handleCheckboxChange = (questionIndex, optionIndex) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
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

            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };

    const handleOptionChange = (e, questionIndex, optionIndex) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };

    const handleAddAnswer = (questionIndex) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options.push('');
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };

    const handleScoreChange = (e, index) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[index].score = e.target.value;
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };


    const handleQuestionTextChange = (e, index) => {
        setValues((prevValues) => {
            const updatedQuestions = [...values.questions];
            updatedQuestions[index].questionText = e.target.value;
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };





    const handleOpenEndAnswerChange = (e, index) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[index].openEndAnswer = e.target.value;
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };

    const handleTrueFalseChange = (e, index) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            const currentQuestion = updatedQuestions[index];

            if (currentQuestion && currentQuestion.questionType === "true-false") {
                // Assuming you have a property like 'trueFalseOptions' in your question object
                currentQuestion.trueFalseOptions = e.target.value;
            }

            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };



    const handleRemoveAnswer = (questionIndex, optionIndex) => {
        setValues((prevValues) => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options.splice(optionIndex, 1);
            return {
                ...prevValues,
                questions: updatedQuestions,
            };
        });
    };


    return (
        <div
            className="mx-auto max-w-screen-lg px-4 pt-20 pb-20 space-y-12"
        >
            {/* <pre>{JSON.stringify(values.questions, null, 4)}</pre> */}
            {values.questions && values.questions.length > 0 ? (
                values.questions.map((question, index) => (
                    <div className="w-full rounded p-8" key={index}>
                        <div className="rounded-md shadow-md border border-opacity-50">
                            <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex items-center justify-between space-x-6">
                                <div>
                                    <p className="font-semibold text-lg">ข้อที่</p>
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
                                                        defaultSelected={question.correctOptionIndex.includes(optionIndex)}
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
                                                    <RadioGroup
                                                        value={question.correctAnswerIndex}
                                                    >
                                                        <Radio
                                                            onChange={() => handleCheckboxChange(index, optionIndex)}
                                                            key={optionIndex}
                                                            value={optionIndex}
                                                        >
                                                        </Radio>
                                                    </RadioGroup>

                                                    {/* <input
                                                        type="radio"
                                                        checked={question.correctAnswerIndex === optionIndex}
                                                        onChange={() => handleCheckboxChange(index, optionIndex)}
                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    /> */}
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

                                    {question.questionType === 'true-false' && (
                                        <>
                                            <RadioGroup
                                                value={question.trueFalseOptions}
                                                onChange={(e) => handleTrueFalseChange(e, index)}
                                            >
                                                <Radio value="True">ถูก</Radio>
                                                <Radio value="False">ผิด</Radio>
                                            </RadioGroup>
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>คุณยังไม่มีเนื้อหาบทเรียน</p>
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

export default UpdateQuizLesson