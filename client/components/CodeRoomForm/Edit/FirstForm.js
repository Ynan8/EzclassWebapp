import React from 'react'

const FirstForm = ({onChange, formValue}) => {
    return (
        <div>
            <form>

                <div className="mb-6">
                    <label
                        className="block mb-2 text-xl font-medium text-gray-900 ">
                        ชื่อห้องเรียนเขียนโค้ด
                        <span className="text-red-400 ml-[2px]">*</span>
                    </label>
                    <input
                        type="text"
                        name="codeRoomName"
                        value={formValue.codeRoomName}
                        onChange={onChange}
                        className="w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4"
                        required
                    />
                </div>
                <div className="mb-6">
                    <div className="flex flex-col space-y-1 mb-2">
                        <label
                            className="block  text-xl font-medium text-gray-900">
                            คำอธิบายห้องเรียนเขียนโค้ด
                            <span className="text-red-400 ml-[2px]">*</span>
                        </label>
                        <p className='text-gray-400' >แสดงให้เห็นถึงที่มา ความสำคัญ ลักษณะของโปรแกรม หรือ บรรยายโจทย์ว่า ต้องการให้ สมาชิกทำสิ่งใด จนถึงการแต่งนิยายที่สอดคล้องกับโจทย์ เพื่อสร้างความสนุกก็ยังได้</p>
                    </div>
                    <textarea
                        name="detailCodeRoom"
                        value={formValue.detailCodeRoom}
                        onChange={onChange}
                        className="w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4"
                        required
                    />
                </div>
               
                <div className="mb-6">
                    <div className="flex flex-col space-y-1 mb-2">
                        <label
                            className="block  text-xl font-medium text-gray-900 dark:text-gray-300">
                            ข้อจำกัด
                        </label>
                        <p className='text-gray-400' >เช่น ข้อมูลที่ Input จะมีค่าตั้งแต่ 0 - 1,000,000 หรือ หากมีเศษ ให้ทำการปัดขึ้น เป็นต้น</p>
                    </div>
                    <input
                        type="text"
                        className="w-full shadow-sm rounded-md py-2 border-2 focus:outline-none transition pl-4"
                        name="consTraints"
                        value={formValue.consTraints}
                        onChange={onChange}
                  />
                </div>
            </form>
        </div>
    )
}

export default FirstForm