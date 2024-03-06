import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context/index';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from "next/router";


//react icon
import { BsCodeSquare, BsBook, BsJournalCheck } from "react-icons/bs";
import { SlGraduation } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx"
import { SiGoogleclassroom } from "react-icons/si"


import { LiaMedalSolid } from 'react-icons/lia';
import { TbUserCog } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

const SidebarTeacherRoom = ({ open, id, courseYearId }) => {

    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(open);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        setSidebarOpen(open);
    }, [open]);

    //state

    const { state: { user },
        dispatch,
    } = useContext(Context);

  
    // router
    const router = useRouter();

    const menu = {
        id: id
    };

    const currentPath = useRouter().asPath;

    const isLinkActive = (href) => {
        return currentPath === href;
    };



    return (
        <>
            <div className="fixed flex flex-col top-[75px] left-0 w-20 hover:w-64 md:w-64  bg-blue-500 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar p-2">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul className="flex flex-col py-8 space-y-1">
                        <li className="my-px py-2 ">
                            <Link
                                href={`/teacher/course/room/single/${menu.id}`}
                                className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/teacher/course/room/single/${menu.id}`)
                                    ? 'bg-gray-100 text-blue-700'
                                    : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                    }`}
                            >
                                <RxDashboard size={30} className="min-w-max" />
                                <span className="ml-4 text-lg">ภาพรวมห้องเรียน</span>
                            </Link>
                        </li>
                        <li className="my-px py-2 ">
                            <Link
                                href={`/teacher/course/room/assignment/${menu.id}/`}
                                className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/teacher/course/lesson/${menu.id}`)
                                    ? 'bg-gray-100 text-blue-700'
                                    : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                    }`}
                            >
                                <BsJournalCheck size={30} className="min-w-max" />
                                <span className="ml-4 text-lg">ตรวจงาน</span>
                            </Link>
                        </li>
                        <li className="my-px py-2 ">
                            <Link
                                href={`/teacher/course/assignment/${menu.id}/?courseYearId=${courseYearId}`}

                                className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/teacher/course/assignment/${menu.id}`)
                                    ? 'bg-gray-100 text-blue-700'
                                    : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                    }`}
                            >
                                <LiaMedalSolid size={30} className="min-w-max" />
                                <span className="ml-4 text-lg">ผลการเรียน</span>
                            </Link>
                        </li>
                        <li className="my-px py-2 ">
                            <Link
                                href={`/teacher/course/room/manage-user/${menu.id}`}
                                className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/teacher/course/room/manage-user/${menu.id}`)
                                    ? 'bg-gray-100 text-blue-700'
                                    : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                    }`}
                            >
                                <FiUsers size={30} className="min-w-max" />
                                <span className="ml-4 text-lg">จัดการชื่อผู้ใช้</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>

    );

}

export default SidebarTeacherRoom