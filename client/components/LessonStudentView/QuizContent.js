import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { LuAlarmClock } from 'react-icons/lu';
import { MdQuiz } from 'react-icons/md';
import { RiLoopLeftFill } from 'react-icons/ri';
import moment from "moment/min/moment-with-locales";
import AverageQuizScoreStd from "../../components/Charts/AverageScoreStd"
import AverageQuizSubmit from "../../components/Charts/AverageQuizSubmit"


const QuizContent = ({
    selectedQuizContent,
    setSelectedQuizContent,
    courseId,
    sectionId,
    quizId,
    goToNextLessonQuiz,
    markCompletedQuiz,
    courseRoom,
}) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);
    const [timeExpiredSubmission, setTimeExpiredSubmission] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    let [ApprovalModal, setApprovalModal] = useState(false);

    const courseRoomId = courseRoom._id




    const openModal = (quizId) => {
        setApprovalModal(true);
    };
    const startQuiz = () => {


        setQuizStarted(true);
        setAnswers(Array(selectedQuizContent.questions.length).fill(undefined));
    };

    const handleAnswerChange = (index, value) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];

            switch (selectedQuizContent.questions[index].questionType) {
                case 'multiple-choice':
                    // Initialize the array if it's not present
                    if (!newAnswers[index]) {
                        newAnswers[index] = [];
                    }

                    // Toggle the state of the checkbox for the specific option index
                    const optionIndex = value;
                    const optionIndexInArray = newAnswers[index].indexOf(optionIndex);
                    if (optionIndexInArray === -1) {
                        newAnswers[index].push(optionIndex);
                    } else {
                        newAnswers[index].splice(optionIndexInArray, 1);
                    }
                    break;

                case 'single-choice':
                case 'true-false':
                    // Use the overall question index to store the answer
                    newAnswers[index] = value;
                    break;

                // case 'open-end':
                //     // Use the overall question index to store the answer
                //     newAnswers[index] = value;
                //     break;

                // default:
                //     break;
            }

            return newAnswers;
        });
        setActiveQuestionIndex(index);
    };

    const handleSubmitQuiz = async () => {

        const { questions } = selectedQuizContent;

        // Ensure the user has answered all questions
        if (answers.length !== questions.length) {
            alert('Please answer all questions before submitting.');
            return;
        }

        let totalScore = 0;
        const feedback = [];

        // Loop through each question and check the answer
        questions.forEach((question, index) => {
            const userAnswer = answers[index];

            // Check if the user has answered the question
            if (!timeExpiredSubmission && userAnswer === undefined) {
                alert('Please answer all questions before submitting.');
                return;
            }

            switch (question.questionType) {
                case 'multiple-choice':
                    const correctOptions = question.correctOptionIndex || [];

                    // Check if the correct option index is included in the user's answer
                    const isCorrectMC =
                        correctOptions.length === userAnswer.length &&
                        correctOptions.every((correctIndex) => userAnswer.includes(correctIndex));

                    if (isCorrectMC) {
                        totalScore += question.score;
                        feedback.push({ index, isCorrect: true });
                    } else {
                        feedback.push({ index, isCorrect: false, correctOptions });
                    }

                    break;

                case 'single-choice':
                    const correctAnswerIndex = question.correctAnswerIndex;

                    // Check if the user's answer matches the correct answer
                    const isCorrectSC = userAnswer === question.options[correctAnswerIndex];

                    if (isCorrectSC) {
                        totalScore += question.score;
                        feedback.push({ index, isCorrect: true });
                    } else {
                        feedback.push({ index, isCorrect: false, correctAnswer: question.options[correctAnswerIndex] });
                    }
                    break;

                case 'true-false':
                    const isCorrectTF = userAnswer.toLowerCase() === question.trueFalseOptions.toLowerCase();

                    if (isCorrectTF) {
                        totalScore += question.score;
                        feedback.push({ index, isCorrect: true });
                    } else {
                        feedback.push({ index, isCorrect: false, correctAnswer: question.trueFalseOptions });
                    }
                    break;



                default:
                    break;
            }
        });


        const newAttempts = attempts + 1;

        // Prepare the data to be submitted
        const submissionData = {
            courseId: courseId,
            courseRoomId: courseRoomId,
            sectionId: sectionId,
            quizId: quizId,
            score: totalScore,
            attempts: newAttempts,
        };

        setTotalScore(totalScore);


        try {

            // Make an Axios POST request to submit the quiz
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/quizScore`, submissionData);
            // Now you have the total score and detailed feedback

            console.log('Quiz submission successful:', response.data);
            // console.log('Feedback:', feedback);
            // alert(`Your total score is: ${totalScore}`);
            setApprovalModal(false);
            setShowScore(true);
            loadQuizScore()
        } catch (error) {
            // Handle errors if the submission fails
            console.error('Error submitting quiz:', error);
        }

    };

    const handleJumpToQuestion = (questionIndex) => {
        const adjustedQuestionIndex = questionIndex - 1; // Adjust question index

        setCurrentSection(Math.floor(adjustedQuestionIndex / questionsPerSection));
        setCurrentQuestion(adjustedQuestionIndex);
        setActiveQuestionIndex(adjustedQuestionIndex);
    };


    const questionsPerSection = 5;




    const [timeRemaining, setTimeRemaining] = useState(
        selectedQuizContent?.timeLimitMinutes !== undefined ? selectedQuizContent.timeLimitMinutes * 60 : 0
    );


    useEffect(() => {
        let timer;

        if (quizStarted && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [quizStarted, timeRemaining]);

    useEffect(() => {
        if (timeRemaining === 0) {
            // Handle quiz completion when the timer reaches zero
            setTimeExpiredSubmission(true);
            handleSubmitQuiz();
        }
    }, [timeRemaining]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const [QuizScore, setQuizScore] = useState({})

    useEffect(() => {
        loadQuizScore();
    }, [quizId]);

    const loadQuizScore = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quizScore/${quizId}`);
            setQuizScore(data)
        } catch (error) {
            console.error('Error loading quiz score:', error);
        }
    };

    const highestScore = Math.max(...Object.values(QuizScore).map(score => score.score));

    const averageScore = (totalScore / selectedQuizContent.questions.length) * 100
    const averageHighestScore = (highestScore / selectedQuizContent.questions.length) * 100





    const canRestartQuiz = selectedQuizContent.maxAttempts - QuizScore.length !== 0;

    const restartQuiz = () => {
        if (canRestartQuiz) {
            setQuizStarted(false);
            setShowScore(false);
            setAnswers([]);
            setCurrentSection(0);
            setCurrentQuestion(0);
            setActiveQuestionIndex(-1);
            setTimeExpiredSubmission(false);
            setTotalScore(0);
            setAttempts(0);
            setTimeRemaining(selectedQuizContent?.timeLimitMinutes !== undefined ? selectedQuizContent.timeLimitMinutes * 60 : 0);
            loadQuizScore();  // Load quiz scores if needed
        }
    };

    return (
        <div>
            {/* <pre>{JSON.stringify(selectedQuizContent, null, 4)}</pre>  */}

            {selectedQuizContent && !showScore && (
                <div className={`mx-auto ${quizStarted ? 'md:w-9/12 w-[90%] flex md:flex-row flex-col' : 'max-w-screen-lg'} px-4 pt-20 pb-20 space-y-12`}>
                    <div className={`w-full rounded  ${quizStarted ? 'md:w-[70%]' : 'p-8'}`}>
                        <div className="px-8 pt-4 pb-6 space-y-6">
                            {quizStarted ? (
                                <div>
                                    {selectedQuizContent.questions.map((question, index) => (
                                        index === currentQuestion && (
                                            <div className="flex flex-col" key={question._id}>
                                                <div className="rounded-md shadow-md border border-opacity-50 mb-5">
                                                    <div className="text-xl bg-gray-50 border-b rounded-t-md px-8 py-4 flex items-center justify-between space-x-6">
                                                        <p>
                                                            คำถามข้อที่{" "}
                                                            <span className="font-semibold">
                                                                {index + 1}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">{question.score}</span> คะแนน
                                                        </p>
                                                    </div>
                                                    <div className="px-8 pt-4 pb-6 space-y-6">
                                                        <h4 className="text-xl font-semibold">
                                                            <span style={{ wordWrap: 'break-word' }}>{question.questionText}</span>
                                                        </h4>
                                                        {question.questionType === 'multiple-choice' && (
                                                            <>
                                                                {question.options.map((option, optionIndex) => (
                                                                    <div key={optionIndex} className="flex items-center space-x-3 rounded-md p-2 border-2 border-gray-300 ">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`option-${index}-${optionIndex}`}  // Unique ID for each checkbox
                                                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            checked={answers[index] && answers[index].includes(optionIndex)}
                                                                            onChange={() => handleAnswerChange(index, optionIndex)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`option-${index}-${optionIndex}`}  // Matching the checkbox ID
                                                                            className="bg-transparent focus:outline-none w-full cursor-pointer"
                                                                        >
                                                                            {option}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}


                                                        {question.questionType === 'single-choice' && (
                                                            <>
                                                                {question.options.map((option, optionIndex) => (
                                                                    <div key={optionIndex} className="flex items-center space-x-3 rounded-md p-2 border-2 border-gray-300 ">
                                                                        <input
                                                                            type="radio"
                                                                            id={`option-${index}-${optionIndex}`}  // Unique ID for each radio button
                                                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            checked={answers[index] === option}
                                                                            onChange={() => handleAnswerChange(index, option)}
                                                                        />
                                                                        <label
                                                                            htmlFor={`option-${index}-${optionIndex}`}  // Matching the radio button ID
                                                                            className="bg-transparent focus:outline-none w-full cursor-pointer"
                                                                        >
                                                                            {option}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}

                                                        {/* 
                                                        {question.questionType === 'open-end' && (
                                                            <input
                                                                type="text"
                                                                className="shadow-sm rounded-md py-2 px-4 border focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-20 focus:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                                placeholder="คำตอบ"
                                                                value={answers[index]}
                                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                            />
                                                        )} */}

                                                        {question.questionType === 'true-false' && (
                                                            <>
                                                                <label className="flex items-center space-x-3 rounded-md p-2 border-2 border-gray-300 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        checked={answers[index] === 'True'}
                                                                        onChange={() => handleAnswerChange(index, 'True')}
                                                                    />
                                                                    <p className="bg-transparent focus:outline-none w-full disabled:opacity-50 disabled:cursor-not-allowed">
                                                                        True
                                                                    </p>
                                                                </label>
                                                                <label className="flex items-center space-x-3 rounded-md p-2 border-2 border-gray-300 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        checked={answers[index] === 'False'}
                                                                        onChange={() => handleAnswerChange(index, 'False')}
                                                                    />
                                                                    <p className="bg-transparent focus:outline-none w-full disabled:opacity-50 disabled:cursor-not-allowed">
                                                                        False
                                                                    </p>
                                                                </label>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}

                                    <div className="flex justify-between mt-4">
                                        <button
                                            className="cursor-pointer flex items-center text-lg border-2 border-blue-500 hover:text-white hover:bg-blue-500 duration-300 py-2 px-4 rounded"
                                            onClick={() => setCurrentQuestion(Math.max(currentQuestion - 1, 0))}
                                            disabled={currentQuestion === 0}
                                        >
                                            คำถามก่อนหน้า
                                        </button>

                                        {/* Conditionally render Next Question or Submit button */}
                                        {currentQuestion === selectedQuizContent.questions.length - 1 ? (
                                            <button
                                                className="cursor-pointer flex items-center text-lg bg-green-500 text-white hover:bg-green-700 duration-300 py-2 px-4 rounded"
                                                onClick={() => openModal(selectedQuizContent._id)}
                                            >
                                                ส่งคำตอบ
                                            </button>
                                        ) : (
                                            <button
                                                className="cursor-pointer flex items-center text-lg bg-blue-500 text-white hover:bg-blue-700 duration-300 py-2 px-4 rounded"
                                                onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, selectedQuizContent.questions.length - 1))}
                                                disabled={currentQuestion === selectedQuizContent.questions.length - 1}
                                            >
                                                คำถามถัดไป
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {selectedQuizContent.maxAttempts - QuizScore.length === 0 ? (
                                        // "score height"
                                        <div className={`mx-auto max-w-screen-lg px-4 pt-4 pb-20 space-y-12`}>
                                            <div className="flex flex-col" >
                                                <div className="rounded-md shadow-md border border-opacity-50 mb-5">
                                                    <div className="text-lg bg-gray-50 border-b rounded-t-md px-8 py-4 flex items-center justify-between space-x-6">
                                                        <p>
                                                            แบบทดสอบท้ายบทที่ 1 <span className='font-semibold'>{selectedQuizContent.quizName}</span>
                                                            <span className="font-semibold">

                                                            </span>
                                                        </p>
                                                        <div className="flex space-x-2">
                                                            {selectedQuizContent.maxAttempts - QuizScore.length === 0 ? (
                                                                <button
                                                                    disabled
                                                                    className="flex text-white bg-gray-400  py-2 px-6 rounded"
                                                                >
                                                                    ทำอีกครั้ง  <RiLoopLeftFill className="ml-2" size={25} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={restartQuiz}
                                                                    className="flex text-white bg-blue-500 hover:bg-blue-700 duration-300 shadow-xl py-2 px-6 rounded"
                                                                >
                                                                    ทำอีกครั้ง  <RiLoopLeftFill className="ml-2" size={25} />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={goToNextLessonQuiz}
                                                                className="flex text-white bg-green-500 hover:bg-green-700 duration-300 shadow-xl py-2 px-6 rounded"
                                                            >
                                                                บทเรียนถัดไป  <AiOutlineArrowRight className="ml-2" size={25} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="px-3">
                                                        {averageHighestScore > selectedQuizContent.passingThreshold ? (
                                                            <div className="text-green-600 w-full bg-green-100 rounded-md p-3 mt-2">
                                                                <p>ขอแสดงความยินดี ! คุณได้คะแนนมากกว่าเกณฑ์ค่าเฉลี่ย !!</p>
                                                                <p>ผลการทดสอบของคุณอยู่ในเกณฑ์ผ่าน และ ยอดเยี่ยม เราขอเป็นกำลังใจให้สู้ต่อไป !</p>
                                                            </div>
                                                        ) : (
                                                            <div className="text-red-600 w-full bg-red-100 rounded-md p-3 mt-2">
                                                                <p>ขอแสดงความเสียใจ คุณได้คะแนนต่ำกว่าเกณฑ์</p>
                                                                <p>ผลการทดสอบของคุณอยู่ในเกณฑ์ไม่ผ่าน เราขอเป็นกำลังใจให้คุณพยายามต่อไป !</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-center items-center">

                                                        <div className="flex flex-col items-center justify-center  px-8 pt-4 pb-6 space-y-2">
                                                            <div className=" flex flex-col justify-center items-center">
                                                                <h2 className={`text-4xl font-bold mb-2 ${averageHighestScore > selectedQuizContent.passingThreshold ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {averageHighestScore > selectedQuizContent.passingThreshold ? 'ผ่าน' : 'ไม่ผ่าน'}
                                                                </h2>
                                                                <p className='text-2xl' >คะแนนของคุณ {highestScore}/{selectedQuizContent.questions.length} คะแนน</p>
                                                                <p className='text-2xl'>คะแนนเฉลี่ย {averageHighestScore.toFixed(2)}%</p>
                                                                <AverageQuizScoreStd
                                                                    averageHighestScore={averageHighestScore}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="px-8  pb-6 space-y-6">
                                                            <h2 className="text-xl ">ประวัติทำแบบทดสอบนี้</h2>
                                                            {QuizScore.map((quizScore, index) => (
                                                                <div className="flex flex-col justify-center">
                                                                    <p>ครั้งที่ {index + 1} : <span className='font-bold'>{quizScore.score}/{selectedQuizContent.questions.length} คะแนน</span></p>
                                                                    <p>วันที่: <span className='font-bold'>
                                                                        ({moment(quizScore.timestamp)
                                                                            .locale('th')
                                                                            .format('LLL')})
                                                                    </span>
                                                                    </p>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div className="rounded-md shadow-md border border-opacity-50 mt-4">
                                        <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 space-x-6">
                                            <p className="font-medium text-xl">แบบทดสอบท้ายบทที่ 1 <span className='font-semibold'>{selectedQuizContent.quizName}</span></p>
                                        </div>
                                        <div className="px-8 pb-6 space-y-6">
                                            <div className="flex mt-1 items-center justify-center">
                                                <MdQuiz size={100} className='text-blue-500' />
                                            </div>
                                            <div className="flex text-center flex-col mt-2 space-y-2 text-lg">
                                                <p>จำนวนข้อ: <span className='font-semibold text-blue-500'>{selectedQuizContent.questions.length} ข้อ</span></p>
                                                <p>เวลาที่ใช้: <span className='font-semibold text-blue-500'>{selectedQuizContent.timeLimitMinutes} นาที</span></p>
                                                <p>เกณฑ์คะแนนที่ผ่าน: <span className='font-semibold text-blue-500'>{selectedQuizContent.passingThreshold}%</span></p>
                                                <p>
                                                    สามารถทำได้: {' '}
                                                    <span className='font-semibold text-blue-500'>
                                                        {selectedQuizContent.maxAttempts - QuizScore.length} ครั้ง
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex item-center justify-center text-lg text-center mt-12">
                                                <button
                                                    className="text-white bg-blue-500 hover:bg-blue-700 duration-300 shadow-xl py-2 px-16 rounded"
                                                    onClick={startQuiz}
                                                >
                                                    เริ่มทำแบบทดสอบ
                                                </button>
                                            </div>
                                        </div>
                                    </div>}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:w-[30%] w-full p-4 mt-0">
                        {quizStarted && (
                            <div>
                                <div className="flex space-x-1 items-center">
                                    <p><LuAlarmClock size={27} /></p>
                                    <p className="font-medium text-xl">เวลาที่เหลือ: <span className='font-semibold'>{formatTime(timeRemaining)}</span></p>
                                </div>
                                <h3 className="text-xl font-medium my-3">จำนวนข้อ: </h3>
                                <div className="cursor-pointer grid grid-cols-4 sm:grid-cols-5 gap-2 justify-center">
                                    {selectedQuizContent.questions.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-full p-4 border-2 ${activeQuestionIndex === index
                                                ? 'border-blue-800 bg-blue-800 text-white'
                                                : answers[index] !== undefined
                                                    ? 'border-green-500 bg-green-500 text-white' // Change the style for answered but not active questions
                                                    : 'border-blue-800 hover:bg-blue-800 hover:text-white'
                                                } duration-300 flex items-center justify-center mb-4`}
                                            style={{ width: '40px', height: '40px' }}
                                            onClick={() => handleJumpToQuestion(index + 1)}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>


                            </div>
                        )}
                    </div>
                </div>

            )}

            {showScore && (
                <div className={`mx-auto max-w-screen-lg px-4 pt-20 pb-20 space-y-12`}>
                    <div className="flex flex-col" >
                        <div className="rounded-md shadow-md border border-opacity-50 mb-5">
                            <div className="text-lg bg-gray-50 border-b rounded-t-md px-8 py-4 flex items-center justify-between space-x-6">
                                <p>
                                    แบบทดสอบท้ายบทที่ 1 <span className='font-semibold'>{selectedQuizContent.quizName}</span>
                                    <span className="font-semibold">

                                    </span>
                                </p>
                                <div className="flex space-x-2">
                                    {selectedQuizContent.maxAttempts - QuizScore.length === 0 ? (
                                        <button
                                            disabled
                                            className="flex  text-white bg-gray-400  py-2 px-6 rounded"
                                        >
                                            ทำอีกครั้ง  <RiLoopLeftFill className="ml-2" size={25} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={restartQuiz}
                                            className="flex text-white bg-blue-500 hover:bg-blue-700 duration-300 shadow-xl py-2 px-6 rounded"
                                        >
                                            ทำอีกครั้ง  <RiLoopLeftFill className="ml-2" size={25} />
                                        </button>
                                    )}
                                    <button
                                        onClick={goToNextLessonQuiz}
                                        className="flex text-white bg-green-500 hover:bg-green-700 duration-300 shadow-xl py-2 px-6 rounded"
                                    >
                                        บทเรียนถัดไป  <AiOutlineArrowRight className="ml-2" size={25} />
                                    </button>
                                </div>
                            </div>
                            <div className="px-3">
                                {averageScore > selectedQuizContent.passingThreshold ? (
                                    <div className="text-green-600 w-full bg-green-100 rounded-md p-3 mt-2">
                                        <p>ขอแสดงความยินดี ! คุณได้คะแนนมากกว่าเกณฑ์ค่าเฉลี่ย !!</p>
                                        <p>ผลการทดสอบของคุณอยู่ในเกณฑ์ผ่าน และ ยอดเยี่ยม เราขอเป็นกำลังใจให้สู้ต่อไป !</p>
                                    </div>
                                ) : (
                                    <div className="text-red-600 w-full bg-red-100 rounded-md p-3 mt-2">
                                        <p>ขอแสดงความเสียใจ คุณได้คะแนนต่ำกว่าเกณฑ์</p>
                                        <p>ผลการทดสอบของคุณอยู่ในเกณฑ์ไม่ผ่าน เราขอเป็นกำลังใจให้คุณพยายามต่อไป !</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex  justify-center items-center">
                                <div className=" flex flex-col items-center px-8 pt-4 pb-6 space-y-6">
                                    <div className=" flex flex-col justify-center items-center">

                                        <h2 className={`text-4xl font-bold mb-2 ${averageScore > selectedQuizContent.passingThreshold ? 'text-green-600' : 'text-red-600'}`}>
                                            {averageScore > selectedQuizContent.passingThreshold ? 'ผ่าน' : 'ไม่ผ่าน'}
                                        </h2>

                                        <p className='text-2xl' >คะแนนของคุณ {totalScore}/{selectedQuizContent.questions.length} คะแนน</p>
                                        <p className='text-2xl'>คะแนนเฉลี่ย {averageScore.toFixed(2)}%</p>
                                        <AverageQuizSubmit
                                            averageScore={averageScore}
                                        />
                                    </div>
                                </div>
                                <div className="px-8 pt-4 pb-6 space-y-6">
                                    <h2 className="text-xl ">ประวัติทำแบบทดสอบนี้</h2>
                                    {QuizScore.map((quizScore, index) => (
                                        <div className="flex flex-col justify-center">
                                            <p>ครั้งที่ {index + 1} : <span className='font-bold'>{quizScore.score}/{selectedQuizContent.questions.length} คะแนน</span></p>
                                            <p>วันที่: <span className='font-bold'>
                                                ({moment(quizScore.timestamp)
                                                    .locale('th')
                                                    .format('LLL')})
                                            </span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Transition appear show={ApprovalModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setApprovalModal(false)}
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
                                <div className="flex flex-col items-center justify-center">
                                    <FiAlertCircle className='text-green-500' size={60} />
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg mt-3 font-medium leading-6 text-gray-900"
                                    >
                                        คุณต้องการส่งคำตอบใช่หรือไม่
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            หากยังไม่มั่นใจสามารถตรวจสอบข้อมูลให้ถูกต้อง ก่อนที่จะกดปุ่ม "ยืนยัน"
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            markCompletedQuiz(quizId);
                                            handleSubmitQuiz();
                                        }}
                                    >
                                        ยืนยัน
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={() => setApprovalModal(false)}
                                    >
                                        ยกเลิก
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div >

    )
}

export default QuizContent