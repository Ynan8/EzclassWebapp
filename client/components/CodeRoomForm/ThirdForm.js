import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'


const ThirdForm = ({
    handleButtonClick,
    selectedPublish,
    selectedDifficulty,
    difficultyLevels,
    handleDifficultySelect,
}) => {

    return (
        <div>
            <form>
                <p className='text-2xl font-semibold text-gray-900'>กำหนดการเผยแพร่โจทย์ของคุณ</p>
                <p className='text-gray-400' >ระบุระดับความยากของโจทย์ และ เผยแพร่ไปพร้อมกันเลย !!</p>

                <p className='mt-6 text-xl font-medium text-gray-900'>ระดับความยาก</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 pt-3 gap-4">
                    {difficultyLevels.map((difficulty, index) => (
                        <div
                            key={index}
                            className={`border-2 cursor-pointer ring-4 ${selectedDifficulty === index ? 'ring-yellow-400' : 'ring-gray-400'
                                } border-transparent rounded`}
                            onClick={() => handleDifficultySelect(index)}
                        >
                            <div className='p-2 text-center rounded focus:outline-none'>
                                <p className='font-bold text-lg'>{difficulty.label}</p>
                                <div className="my-1 w-full flex justify-center">
                                    <div className="flex text-gray-400">
                                        {[...Array(difficulty.stars)].map((_, starIndex) => (
                                            <AiFillStar
                                                key={starIndex}
                                                className={`${starIndex < difficulty.stars - 0 ? 'text-[#FFDC5C]' : ''
                                                    }`}
                                                size={20}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className='mt-24 text-xl font-medium text-gray-900'>การเผยแพร่</p>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-3 gap-4">
                    <div className={`flex flex-col justify-center items-center border-2 ring-4  ${selectedPublish === 'public' ? 'ring-yellow-400' : 'ring-gray-400 '} border-transparent rounded`}>
                        <div
                            onClick={() => handleButtonClick('public')}
                            className='cursor-pointer p-2 text-center rounded focus:outline-none'
                        >
                            <p className='font-bold text-lg'>เผยแพร่</p>
                            <p>เผยแพร่ห้องเรียนเขียนโค้ดให้นักเรียน</p>
                        </div>
                    </div>
                    <div className={`flex flex-col justify-center items-center border-2 ring-4 ${selectedPublish === 'private' ? 'ring-yellow-400' : 'ring-gray-400 '} border-transparent rounded`}>
                        <div
                            onClick={() => handleButtonClick('private')}
                            className='cursor-pointer p-2 text-center rounded focus:outline-none '
                        >
                            <p className='font-bold text-lg'>แบบร่าง</p>
                            <p>นักเรียนไม่สามารถมองเห็นห้องเรียนเขียนโค้ดได้</p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ThirdForm