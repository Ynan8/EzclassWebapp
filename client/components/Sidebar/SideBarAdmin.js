
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineAppstore, AiOutlineMenu } from 'react-icons/ai'; // เพิ่ม AiOutlineMenu
import { LuUsers2 } from 'react-icons/lu';
import { MdOutlineClass } from "react-icons/md";


const SideBarAdmin = ({ mobileSidebarOpen, setMobileSidebarOpen }) => { // State for mobile sidebar visibility


    const currentPath = useRouter().asPath;

    const isLinkActive = (href) => {
        return currentPath === href;
    };

    return (
        <div className={`fixed top-[60px] left-0 w-64 bg-blue-500 h-full text-white transition-all duration-300 z-10 sidebar p-2 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                <ul className="flex flex-col py-8 space-y-1">
                    <li className="my-px py-2 ">
                        <Link
                            href="/admin/home"
                            className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/admin/home`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <AiOutlineAppstore size={30} className="min-w-max" />
                            <span className={`ml-4 text-lg `}>ภาพรวมระบบ</span>
                        </Link>
                    </li>



                    <li className="my-px py-2 ">
                        <Link
                            href="/admin/manage-user"
                            className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/admin/manage-user`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <LuUsers2 size={30} className="min-w-max" />
                            <span className={`ml-4 text-lg  `}>จัดการผู้ใช้</span>
                        </Link>
                    </li>

                    <li className="my-px py-2 ">
                        <Link
                            href="/admin/courseTch"
                            className={`relative flex flex-row items-center rounded-lg h-11 px-3.5 focus:outline-none text-white-600 hover:text-white-800 border-l-4 border-transparent pr-6 ${isLinkActive(`/admin/courseTch`)
                                ? 'bg-gray-100 text-blue-700'
                                : 'text-gray-100 hover:bg-gray-100 hover:text-blue-700 duration-300'
                                }`}
                        >
                            <MdOutlineClass  size={30} className="min-w-max" />
                            <span className={`ml-4 text-lg  `}>รายวิชา</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBarAdmin
