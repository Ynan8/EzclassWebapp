import { Button } from '@nextui-org/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'

const SecondForm = ({ onChange, formValue }) => {
    return (
        <div>
            <form>
                <p className='text-2xl font-semibold text-gray-900'>เพิ่มกรณีทดสอบโปรแกรม</p>
                <p className='text-gray-400' >กรณีทดสอบ หรือ Test-case คือ Input และ เฉลยของโจทย์โปรแกรมนั้นๆ ว่าผู้ใช้งานจะสามารถพัฒนาโปรแกรมให้รับ Input และแสดงผลลัพธ์ออกมาในรูปแบบที่โจทย์ต้องการได้หรือไม่</p>
                <p className='text-red-500' >**หมายเหตุ  หลีกเลี่ยงการใช้กรณีทดสอบภาษาไทย เนื่องจากข้อจำกัดในบางภาษา</p>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-6 gap-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Input ที่ 1
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="input1"
                            value={formValue.input1}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Output ที่ 1
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="output1"
                            value={formValue.output1}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-6 gap-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Input ที่ 2
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="input2"
                            value={formValue.input2}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Output ที่ 2
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="output2"
                            value={formValue.output2}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-6 gap-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Input ที่ 3
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="input3"
                            value={formValue.input3}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                กรณีทดสอบ Output ที่ 3
                                <span className="text-red-400 ml-[2px]">*</span>
                            </label>
                        </div>
                        <textarea
                            type="text"
                            required
                            cols="4"
                            rows="4"
                            className={`w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4 pr-10`}
                            name="output3"
                            value={formValue.output3}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SecondForm