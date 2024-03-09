import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import axios from 'axios';
import AverageScoreRoom from '../../../../../components/Charts/AverageScoreRoom';


const SingleRoom = () => {
    // Show Course Year
    const router = useRouter();
    const { id } = router.query;

    // Load CourseRoom
    const [courseRoomSingle, setCourseRoomSingle] = useState({});


    useEffect(() => {
        if (id) {
            loadCourseRoom();
        }
    }, [id]);


    const loadCourseRoom = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomSingle/${id}`);
                setCourseRoomSingle(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }



    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SidebarTeacherRoom id={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    {/* <pre>{JSON.stringify(courseRoomSingle,null,4)}</pre> */}
                    <div className="px-10">
                        <nav className="text-gray-500" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">

                                <li className="flex items-center">
                                    <a href="#">การเขียนโปรแกรม ด้วยภาษาไพธอนเบื้องต้น</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li className="flex items-center">
                                    <a href="#">2566</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li className="flex items-center">
                                    <a href="#">ม.4/1</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li>
                                    <a href="#" className=" text-blue-500 font-bold" aria-current="page">ภาพรวมห้องเรียน</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="px-12 w-full my-8">
                        <div className="flex items-center justify-center flex-wrap ">
                            <AverageScoreRoom />
                        </div>

                        <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                            <div className="table-container max-w-800 overflow-x-auto">
                                <table className="w-full border-b border-gray-200">
                                    <thead>
                                        <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                                            <td className="py-4 px-4 text-center font-bold">ลำดับ</td>
                                            <td className="py-4 px-4 text-center font-bold">ชื่อ - สกุล</td>
                                            <td className="py-4 px-4 text-center font-bold">คะแนนเฉลี่ยรวม</td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-center font-bold">แบบทดสอบที่ 1</span>
                                                    <button className="text-center">คะแนนเต็ม 5</button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center ">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-center font-bold">แบบทดสอบที่ 2</span>
                                                    <button className="text-center">คะแนนเต็ม 5</button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center ">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-center font-bold">แบบทดสอบที่ 3</span>
                                                    <button className="text-center ">คะแนนเต็ม 5</button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-center font-bold">แบบทดสอบที่ 4</span>
                                                    <button className="text-center ">คะแนนเต็ม 5</button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <span className="text-center font-bold">แบบทดสอบที่ 5</span>
                                                    <button className="text-center ">คะแนนเต็ม 5</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr className="hover:bg-gray-100 transition-colors group">
                                            <td className="text-center py-4">1</td>
                                            <td className="text-center">
                                              นันฐวุฒิ ต้นสวรรค์ 

                                            </td>

                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                                        90%
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                                        5
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                                        0
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-yellow-100 text-yellow-600 text-center font-medium rounded-md">
                                                        3
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                                        5
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-1">
                                                    <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                                        5
                                                    </p>
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
        </div>
    )
}

export default SingleRoom