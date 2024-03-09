import React from 'react'

const SecondForm = ({ onChange, formValue }) => {
    return (
        <div>
            <form>
                <p className='text-2xl font-semibold text-gray-900'>ตัวอย่างการ Input และ Output</p>
                <p className='text-gray-400' >แสดงตัวอย่างการ Input และ Output ของโปรแกรม เช่น ถ้า Input เลข 1 ให้แสดงผล Output เป็น เลข 2 โดยข้อมูลที่กรอกในตัวอย่าง จะเป็นข้อมูลเดียวกันกับข้อมูลจริงที่โปรแกรมทำการประมวลผล และ แสดงผลลัพธ์ออกมา</p>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-6 gap-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 mb-2">
                            <label
                                className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                                ตัวอย่าง Input ที่ 1
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
                                ตัวอย่าง Output ที่ 1
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
                                ตัวอย่าง Input ที่ 2
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
                                ตัวอย่าง Output ที่ 2
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
                                ตัวอย่าง Input ที่ 3
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
                                ตัวอย่าง Output ที่ 3
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