import { Button } from 'antd'
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const CourseCreateForm = () => {
    return (
        <div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-1">
                        <label className=" block text-base font-medium text-[#07074D]">
                            รหัสวิชา
                            <span className="text-red-400 ml-[2px]">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    name="courseNo"
                                    required
                                    placeholder="เช่น ค25329"
                                    className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4  pr-10`}
                                />


                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/20</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className=" block text-base font-medium text-[#07074D]">
                            ชื่อรายวิชา
                            <span className="text-red-400 ml-[2px]">*</span>
                        </label>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    name="courseName"
                                    required
                                    placeholder="เช่น การเขียนโปรแกรมพื้นฐาน"
                                    className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                                />

                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/100</p>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 ">
                    <label className="block text-base font-medium text-[#07074D]">
                        รายละเอียด
                        <span className="text-red-400 ml-[2px]">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <textarea
                                type="text"
                                name="detail"
                                required
                                cols=""
                                rows="4"
                                placeholder="คำอธิบายเกี่ยวกับรายวิชา"
                                className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4  pr-10`}
                            />


                        </div>
                    </div>
                    <p className="ml-auto text-gray-500 text-xs">/200</p>
                </div>


                <div className="flex space-y-1 ">
                    <div className="w-full">
                        <label className="block text-base font-medium text-[#07074D]">
                            ระดับการศึกษา
                            <span className="text-red-400 ml-[2px]">*</span>
                        </label>
                        <select
                            id="level-select"
                            name="level"
                            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="choose">เลือกระดับการศึกษา</option>

                        </select>
                    </div>
                </div>


                <div className="mt-6">
                    <div className="form-group">
                        <label className="block text-base font-medium text-[#07074D]">รูปรายวิชา <span className="text-red-500">*</span></label>
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer space-x-1 border-2 rounded-md px-2 py-1.5 max-w-max shadow-sm focus:outline-none  transition hover:bg-gray-100  ">
                                <FaCloudUploadAlt className="mr-2" size={25} />
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    hidden
                                />
                            </label>
                        </div>
                    </div>
                </div>





                <div>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        className={`hover:shadow-form w-full rounded-md px-6 text-center text-base font-semibold outline-non`}
                        type="primary"
                        size="large"
                    >
                        บันทึก
                    </Button>


                </div>
            </form >
        </div>
    )
}

export default CourseCreateForm