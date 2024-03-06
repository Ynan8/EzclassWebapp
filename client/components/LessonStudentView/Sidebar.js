import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';
import { FiLock } from 'react-icons/fi';

const Sidebar = ({
    loading,
    sidebarCollapsed,
    id,
    section,
    openSections,
    toggleLesson,
    showLessonContent,
    showQuizContent,
    activeLessonId,
    activeQuizId,
    completedLessons,
    course,
    stdSubmit,
    completedQuiz,

}) => {
    const totalLessonCount = section.reduce((total, currentSection) => total + currentSection.lessonData.length, 0);
    const totalQuizCount = section.reduce((total, currentSection) => total + currentSection.quizData.length, 0);

    const getTotalContentCount = () => {
        let totalCount = 0;

        section.forEach((currentSection) => {
            currentSection.lessonData.forEach((lesson) => {
                totalCount += lesson.contents.length;
            });

            totalCount += currentSection.quizData.length;
        });

        return totalCount;
    };

    const totalContentCount = getTotalContentCount();

    const totalAllLessonCount = section.reduce((total, currentSection) => total + currentSection.lessonData.length, 0);
    const totalAllQuizCount = section.reduce((total, currentSection) => total + currentSection.quizData.length, 0);
    const totalAllContentCount = section.reduce((total, currentSection) => {
        currentSection.lessonData.forEach((lesson) => {
            total += lesson.contents.length;
        });

        total += currentSection.quizData.length;

        return total;
    }, 0);

    // const completedProgress = completedQuiz.length + completedLessons.length


    return (
        <div className={`w-1/5 border-r-2 border-gray-100 transition-all ${sidebarCollapsed ? '-ml-[20%]' : 'ml-0'} fixed top-0 left-0 bottom-0`}>
            <div className="flex items-center h-14 bg-blue-500 ">
                <Link href={`/student/course/lesson/${id}`} >
                    <div
                        className="text-white text-lg"
                    >
                        <AiOutlineLeft size={25} className="text-white inline-block align-text-bottom mx-2" />
                        ย้อนกลับ
                    </div>
                </Link>
            </div>
            <div >
                <div className="px-2">

                    {course && (
                        <div className="flex flex-col space-y-3 p-3 border-2 border-blue-500 rounded-md my-2">
                            <div className="flex justify-between">
                                <p className='mb-1 font-bold'>ความคืบหน้า</p>
                                <p className='mb-1 font-medium text-blue-500'>{`${((completedProgress) / (totalLessonCount + totalQuizCount) * 100).toFixed(2)}%`}</p>
                            </div>

                            <div className="w-full bg-gray-300 rounded-full h-2.5">
                                <div className=" bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completedProgress / totalLessonCount) * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between">
                                <p className='mb-1 font-medium'>{course.courseName}</p>
                                <p className='mb-1 font-medium'>{`${completedProgress}/${totalLessonCount + totalQuizCount}`}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    {loading ? (
                        <p>Loading...</p>
                    ) : section.length === 0 ? (
                        <p>No sections available</p>
                    ) : (
                        // Mapping over each section
                        section.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="cursor-pointer">
                                {/* Section Header */}
                                <div
                                    className="flex items-center text-lg p-3 border-b-2 border-gray-100 duration-300"
                                    onClick={() => toggleLesson(sectionIndex, 'section')}
                                >
                                    <span className="mr-1 font-semibold">บทที่ {sectionIndex + 1}</span>
                                    <p className="text-lg">{section.sectionName}</p>
                                    {openSections[sectionIndex]?.includes('section') ? (
                                        <AiOutlineDown className="ml-auto" />
                                    ) : (
                                        <AiOutlineRight className="ml-auto" />
                                    )}
                                </div>

                                {/* Section Content */}
                                <>
                                    <div
                                        className={`text-gray-500 transition-all duration-300 overflow-hidden ${openSections[sectionIndex]?.includes('section') ? 'max-h-[1000px]' : 'max-h-0'
                                            }`}
                                    >
                                        {/* Lesson Data */}
                                        {(section.lessonData && section.lessonData.length > 0) && (
                                            <div
                                                className={`flex items-center space-x-2 cursor-pointer border-b-2 border-gray-100 transition-colors duration-200`}
                                            >
                                                <div className="flex flex-col ml-4">
                                                    {/* Mapping over each lesson in the section */}
                                                    {section.lessonData.map((lesson, lessonIndex) => (
                                                        <span className='font-bold'>{sectionIndex + 1}.{lessonIndex + 1} { lesson.lessonName }</span> 
                                                    ))}
                                                </div>
                                            </div>
                                        )}


                             
                                    </div>
                                </>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div >
    )
}

export default Sidebar