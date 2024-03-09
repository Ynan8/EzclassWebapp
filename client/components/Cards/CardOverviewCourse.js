import React from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBook, BsJournalCheck } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';

const CardOverviewCourse = ({
    section,
    courseRoom,
    totalAssignments,
    totalStudents,
}) => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                <div className="flex items-center p-4 bg-white shadow-md shadow-yellow-500/50 rounded-lg transition-transform transform scale-100 hover:scale-105 duration-200">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-500 bg-yellow-100 rounded-full mr-4">
                        <SiGoogleclassroom size={30} />
                    </div>
                    <div className='flex flex-col space-y-1' >
                        <span className="block text-2xl font-semibold">{courseRoom.length}</span>
                        <span className="block text-gray-500">ห้องเรียนทั้งหมด</span>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow-md shadow-purple-500/50 rounded-lg transition-transform transform scale-100 hover:scale-105 duration-200">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-4">
                        <HiOutlineUserGroup size={30} />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className="block text-2xl font-semibold">{totalStudents}</span>
                        <span className="block text-gray-500">นักเรียนทั้งหมด</span>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow-md shadow-green-500/50 rounded-lg transition-transform transform scale-100 hover:scale-105 duration-200">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-4">
                        <BsBook size={30} />
                    </div>
                    <div className='flex flex-col space-y-1' >
                        <span className="block text-2xl font-semibold">{section.length}</span>
                        <span className="block text-gray-500">บทเรียนทั้งหมด</span>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white shadow-md shadow-blue-500/50 rounded-lg transition-transform transform scale-100 hover:scale-105 duration-200">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-4">
                        <BsJournalCheck size={30} />
                    </div>
                    <div className='flex flex-col space-y-1' >
                        <span className="block text-2xl font-semibold">{totalAssignments}</span>
                        <span className="block text-gray-500">มอบหมายงานทั้งหมด</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardOverviewCourse