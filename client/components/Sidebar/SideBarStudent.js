import React from 'react'

//react icon
import { BsCodeSquare, BsBook, BsJournalCheck } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx"
import { SiGoogleclassroom } from "react-icons/si"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LiaMedalSolid } from 'react-icons/lia';
import LogoTrans from '../../public/LogoTrans.png';
import Image from 'next/image';

const SideBarStudent = ({
    id,
    mobileSidebarOpen,
}) => {

    const menu = {
        id: id
    };
    const currentPath = useRouter().asPath;

    const isLinkActive = (href) => {
        return currentPath === href;
    };

    return (
        <div className={`fixed top-[60px] left-0 w-64 bg-blue-500 h-full text-white transition-all duration-300 z-10 sidebar p-2 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col md:py-8 space-y-1">
                    <Link href={'/student/home'}>
                        <div className="flex justify-center item-center">
                            <div className="md:hidden block Logo">
                                <Image
                                    className='text-white'
                                    src={LogoTrans}
                                    alt="LogoTrans"
                                    width={60}
                                    height={20}
                                />
                            </div>
                            <div
                                className="flex justify-center items-center">
                                <p className="md:hidden block text-2xl font-medium justify-center items-center ">EZCLASS</p>
                            </div>

                        </div>
                    </Link>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/student/course/lesson/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/student/course/lesson/${menu.id}`)
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
                            href={`/student/course/codeRoom/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/student/course/codeRoom/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <BsCodeSquare size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">ห้องเรียนเขียนโค้ด</span>
                        </Link>
                    </li>
                    <li className="my-px py-2 ">
                        <Link
                            href={`/student/course/gradeBook/${menu.id}`}
                            className={`relative flex flex-row items-center rounded-lg h-11 px-4 focus:outline-none text-white-600 hover:text-white-800 border-l-5 border-transparent pr-6 ${isLinkActive(`/student/course/gradeBook/${menu.id}`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <LiaMedalSolid size={30} className="min-w-max" />
                            <span className="ml-4 text-lg">ผลการเรียน</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default SideBarStudent