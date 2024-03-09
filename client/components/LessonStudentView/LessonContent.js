import React, { useEffect, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import axios from 'axios';
import { BsBlockquoteRight } from 'react-icons/bs';
import { Button, Checkbox, Input } from '@nextui-org/react';

const LessonContent = ({
    selectedLessonContent,
    selectedLesson,
    goToNextLesson,
    goToPreviousLesson,
    markExerciseAnswer,
    userAnswers,
    setUserAnswers,
    isAnswerCorrect,
    ExerciseAnswer,
    handleAnswerChange,
    isLastLesson
}) => {

    const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
    const [allExercisesCorrect, setAllExercisesCorrect] = useState(false);

    useEffect(() => {
        // Check if all exercises are correct
        const areAllExercisesCorrectInLesson = () => {
            return (
                selectedLessonContent &&
                selectedLessonContent.filter((content) => content.type === 'exercise').every(
                    (exerciseContent) => ExerciseAnswer.includes(exerciseContent._id)
                )
            );
        };
        


        setAllExercisesCorrect(areAllExercisesCorrectInLesson());
    }, [selectedLessonContent, ExerciseAnswer, isAnswerCorrect]);

    const hasExercisesInLesson = selectedLessonContent && selectedLessonContent.some(
        (content) => content.type === 'exercise'
    );

 


    return (
        <div>
            {selectedLessonContent && (
                <div
                    className="mx-auto max-w-screen-lg px-4 pt-20 pb-20 space-y-12"
                >
                    {/* <pre>{JSON.stringify(selectedLessonContent, null, 4)}</pre> */}
                    <div>
                        {/* Display the content of the selected lesson */}
                        {selectedLessonContent.map((content, index) => (
                            <div key={content._id}>
                                {content.type === 'video' && (
                                    <div className="flex justify-center items-center my-4">
                                        <ReactPlayer
                                            url={content.video}
                                            width="854px"
                                            height="480px"
                                            controls
                                        />
                                    </div>
                                )}
                                {content.type === 'article' && (
                                    <div dangerouslySetInnerHTML={{ __html: content.article }} />
                                )}
                                {content.type === 'code' && (
                                    <div className="flex flex-col justify-center items-center my-4">
                                        <div className=" bg-[#282A36] w-full my-4 pb-8 px-4 text-base rounded-lg">
                                            <div className="copy-icon flex text-white items-center justify-end py-2 cursor-pointer" onClick={() => handleCopyClick(content.code, index)}>
                                                <FaCopy className="mr-2" size={20} />
                                            </div>
                                            <CodeMirror
                                                value={content.code}
                                                style={{ fontSize: 18 }}
                                                theme={dracula}
                                                readOnly
                                                extensions={[python({ py: true })]}
                                            />
                                        </div>
                                    </div>
                                )}
                                {content.type === 'exercise' && (
                                    <div className='flex flex-col border-2 mb-4 rounded-md'>
                                        <div className="bg-gray-50 border-b rounded-t-md px-8 py-4 flex justify-between space-x-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 min-w-0 text-left text-gray-700">
                                                    <p className="text-3xl font-medium truncate">แบบฝึกหัด</p>
                                                    <p className="text-base leading truncate mt-1">
                                                        ตอบคำถามให้ถูกต้อง เพื่อเรียนบทเรียนถัดไป
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-8 pt-4 pb-6 space-y-6">
                                            <div className="flex flex-col space-y-1">
                                                <label className="text-2xl text-gray-600">คำถาม</label>
                                                <p className="text-xl">{content.exercise.questionText}</p>
                                            </div>
                                            <div className="flex flex-col space-y-2 text-lg">
                                                {content.exercise.answers.map((answer, answerIndex) => (
                                                    <div key={answer._id} className="flex items-center">
                                                        <Checkbox
                                                            onChange={(e) => handleAnswerChange(e, index)}
                                                            size="lg"
                                                            name={`question-${content._id}`}
                                                            id={`answer-${content._id}-${answerIndex}`}
                                                            value={answerIndex}
                                                        ></Checkbox>
                                                        <label htmlFor={`answer-${content._id}-${answerIndex}`}>{answer.answerText}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            {ExerciseAnswer.includes(content._id) ? (
                                                <p className="text-green-500">คำตอบถูกต้อง!</p>
                                            ) : (
                                                <Button
                                                    onClick={() => markExerciseAnswer(content._id, index)}
                                                    size='lg'
                                                    radius='lg'
                                                    className='text-white'
                                                    variant='shadow'
                                                    color="success">
                                                    ส่งคำตอบ
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* <pre>{JSON.stringify(selectedLesson, null, 4)}</pre> */}
                    <div className={`flex justify-between items-center h-14 bottom-0 pb-4 right-0 left-[20%]}`}>
    <Button
        onClick={() => selectedLesson && goToPreviousLesson()}
        className='px-8'
        radius='sm'
        size='lg'
        color="primary"
        variant="bordered"
        startContent={<AiOutlineArrowLeft />}>
        ย้อนกลับ
    </Button>
    {isLastLesson() ? (
        <Button
            className='px-8'
            radius='sm'
            size='lg'
            color="success"
            variant='shadow'>
            เรียนสำเร็จ
        </Button>
    ) : (
        hasExercisesInLesson ? (
            <Button
                onClick={() => selectedLesson && goToNextLesson(selectedLesson._id)}
                className='px-8'
                radius='sm'
                variant='shadow'
                size='lg'
                color="primary"
                isDisabled={!allExercisesCorrect}
                endContent={<AiOutlineArrowRight />}>
                บทเรียนถัดไป
            </Button>
        ) : (
            <Button
                onClick={() => selectedLesson && goToNextLesson(selectedLesson._id)}
                className='px-8'
                radius='sm'
                variant='shadow'
                size='lg'
                color="primary"
                endContent={<AiOutlineArrowRight />}>
                บทเรียนถัดไป
            </Button>
        )
    )}
</div>


                </div>
            )}
        </div>
    );
};


export default LessonContent