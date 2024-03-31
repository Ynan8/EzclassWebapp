import React, { useState } from "react";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";


const courseTch = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setMobileSidebarOpen(!mobileSidebarOpen);
    };
    return (
        <div>
            <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
                <SideBarAdmin
                    mobileSidebarOpen={mobileSidebarOpen}
                />
                <div class="h-full ml-0 mt-28 mb-10 md:ml-14 lg:ml-80">
                    <div className="main-content  flex flex-col flex-grow p-4 container">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg whitespace-nowrap">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            {/* <span className="sr-only">Image</span> */}
                                            รูปรายวิชา
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg"
                                        >
                                            ชื่อวิชา
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg"
                                        >
                                            ระดับชั้น
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg"
                                        >
                                            ครูผู้สอน
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center px-6 py-3 text-xs sm:text-sm md:text-base lg:text-lg"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="text-center px-6 py-4">
                                            <div className="flex justify-center max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                                                <Image
                                                    src="/com1.png"
                                                    alt="My Image"
                                                    width={240}
                                                    height={200}
                                                />
                                            </div>
                                        </td>
                                        <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg dark:text-white">
                                            คอมพิวเตอร์ 1
                                        </td>
                                        <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg">
                                            มัธยมศึกษาปีที่ 1
                                        </td>
                                        <td className="text-center px-4 py-3 text-xs sm:text-sm md:text-base lg:text-lg dark:text-white">
                                            ศุภิสรา พรพิพัฒน์
                                        </td>
                                        <td className="text-center px-6 py-4">
                                            <div className="flex items-center justify-center space-x-1 sm:space-x-2 hover:text-gray-600">
                                                <Link href="/admin/std">
                                                    <div className="flex items-center px-2 py-1 bg-gray-300 text-black-300 text-center font-medium rounded-md flex-shrink-0 whitespace-nowrap">
                                                        <FaRegEye
                                                            size={20}
                                                            className="text-black-500 cursor-pointer mr-1 hover:text-gray-500"
                                                        />
                                                        <span className="hidden md:inline-block md:text-sm lg:text-base px-1 py-1">
                                                            ดูห้องเรียน
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default courseTch;