import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillLike, AiFillStar, AiOutlineLeft } from 'react-icons/ai'


const ProblemDetail = ({ codeRoomData }) => {

  return (
    <div className='bg-[#282827]'>
      {/*TAB*/}
      {/* <div className='flex items-center justify-between bg-black h-14 w-full px-2'>
          <div className='flex items-center text-white'>
            <button className='flex cursor-pointer items-center rounded focus:outline-none bg-red-500  text-white  px-3.5 py-2 font-medium'>
              <Link
                href={`/teacher/course/CodeRoom/`}
              >
                <div className='flex items-center px-1 space-x-1'>
                  <div className=' text-base '>Leave</div>
                </div>
              </Link>
            </button>
          </div>
        </div>  */}

      {/*TAB*/}

      <div className='flex flex-col px-0 py-4 h-[100vh] overflow-y-auto'>
        <div className='px-5'>
          {/* Problem heading */}
          <div className='w-full space-y-6'>
            <div className='flex flex-col space-y-2'>
              <div className=' text-2xl text-white font-semibold'>1. คำนวณเกรด</div>
              <div className="flex  items-center text-sm font-normal text-gray-500">
                <span className='mr-1' >ระดับความยาก:</span>
                <AiFillStar className='text-[#FFDC5C]' size={20} />
                <AiFillStar size={20} />
                <AiFillStar size={20} />
                <AiFillStar size={20} />
                <AiFillStar size={20} />
                <AiFillStar size={20} />
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div className=' text-lg text-white font-semibold'>คำอธิบาย</div>
              <div className="flex  items-center text-base font-normal text-gray-500">
                <p>โดยการคำนวณเกรดนั้นจะมีการให้คะแนนตามเกรดแต่ละช่วงเป็น 80- 100 ได้เกรด A , 70 - 79 ได้เกรด B , 60 - 69 ได้เกรด C , 50 - 59 ได้เกรด D และ ต่ำกว่า 50 จะได้เกรด F โดยผู้ใช้จะต้องกรอกเป็นตัวเลขจำนวนเต็มเท่านั้น</p>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div className=' text-lg text-white font-semibold'>ข้อจำกัด</div>
              <div className="flex  items-center text-base font-normal text-gray-500">
                <p></p>
              </div>
            </div>

            <div className=" flex flex-col space-y-2">
              <p className='text-lg text-white font-semibold'>ตัวอย่างที่ 1</p>
              <div className=" w-full flex">
                <div className="w-1/2 mr-2">
                  <p className="text-sm mb-1 text-white">Input:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    99
                  </div>
                </div>
                <div className="w-1/2 h-2/3 cursor-default">
                  <p className="text-sm mb-1 text-white">Output:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    A
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col space-y-2">
              <p className='text-lg text-white font-semibold'>ตัวอย่างที่ 2</p>
              <div className=" w-full flex">
                <div className="w-1/2 mr-2">
                  <p className="text-sm mb-1 text-white">Input:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    72
                  </div>
                </div>
                <div className="w-1/2 h-2/3 cursor-default">
                  <p className="text-sm mb-1 text-white">Output:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    B
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col space-y-2">
              <p className='text-lg text-white font-semibold'>ตัวอย่างที่ 3</p>
              <div className=" w-full flex">
                <div className="w-1/2 mr-2">
                  <p className="text-sm mb-1 text-white">Input:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    40
                  </div>
                </div>
                <div className="w-1/2 h-2/3 cursor-default">
                  <p className="text-sm mb-1 text-white">Output:</p>
                  <div className='w-full cursor-text rounded-lg  px-3 py-[10px] bg-[#313131]  text-white mt-2'>
                    F
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div >

      </div >

    </div >
  )
}

export default ProblemDetail