import React, { useState } from 'react'

//react icon
import { BsCodeSquare, BsBook, BsJournalCheck } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx"
import { SiGoogleclassroom } from "react-icons/si"
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideBarTeacher = ({ 
    courseYearId,
    mobileSidebarOpen,
}) => {

  

    const menu = {
        id: courseYearId
    };
    const currentPath = useRouter().asPath;

    const isLinkActive = (href) => {
        return currentPath === href;
    };

    return (
        <div className={`fixed top-[60px] left-0 w-64 bg-blue-500 h-full text-white transition-all duration-300 z-10 sidebar p-2 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col py-8 space-y-1">
                    <p className=' text-sm sm:text-center md:text-left md:px-3 md:text-lg lg:text-xl'>แดชบอร์ด</p>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/teacher/course/overview/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/teacher/course/overview/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <RxDashboard size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">ภาพรวมรายวิชา</span>
                        </Link>
                    </li>
                    <p className='mt-4 text-sm sm:text-center md:text-left  md:px-3 md:text-lg lg:text-xl'>การจัดการ</p>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/teacher/course/room/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/teacher/course/room/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <SiGoogleclassroom size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">ห้องเรียน</span>
                        </Link>
                    </li>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/teacher/course/lesson/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/teacher/course/lesson/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <BsBook size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">บทเรียน</span>
                        </Link>
                    </li>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/teacher/course/codeRoom/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/teacher/course/codeRoom/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <BsCodeSquare size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">ห้องเรียนเขียนโค้ด</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default SideBarTeacher