import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const ProblemDetail = ({ problem }) => {
  
  const renderStars = (difficulty) => {

    const starArray = Array.from({ length: 5 }, (_, index) => index <= difficulty);

    return (
        <>
            {starArray.map((isFilled, index) => (
                <AiFillStar
                    key={index}
                    className={isFilled ? 'text-[#FFDC5C]' : ''}
                    size={20}
                />
            ))}
        </>
    );
};

  // Check if problem is null or undefined
  if (!problem) {
    return <div>Loading...</div>; // or any other placeholder you'd like to show
  }

  return (
    <div className='bg-[#282827]'>
      <div className='flex flex-col px-0 py-4 h-[100vh] overflow-y-auto'>
        <div className='px-5'>
          <div className='w-full space-y-6'>
            <div className='flex flex-col space-y-2'>
              <div className='text-2xl text-white font-semibold'>{problem.codeRoomName}</div>
              <div className="flex items-center text-sm font-normal text-gray-500">
                <span className='mr-1'>ระดับความยาก:</span>
                {renderStars(problem.Difficulty)}
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='text-lg text-white font-semibold'>คำอธิบาย</div>
              <div className="flex items-center text-base font-normal text-gray-300">
                <p>{problem.detailCodeRoom}</p>
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div className='text-lg text-white font-semibold'>ข้อจำกัด</div>
              <div className="flex items-center text-base font-normal text-gray-500">
                <p>{problem.consTraints}</p>
              </div>
            </div>
            {Array.from({ length: 3 }, (_, index) => (
              <div className="flex flex-col space-y-2" key={index}>
                <p className='text-lg text-white font-semibold'>ตัวอย่างที่ {index + 1}</p>
                <div className="w-full flex">
                  <div className="w-1/2 mr-2">
                    <p className="text-sm mb-1 text-white">Input:</p>
                    <div className='w-full cursor-text rounded-lg px-3 py-[10px] bg-[#313131] text-white mt-2'>
                      {problem[`input${index + 1}`]}
                    </div>
                  </div>
                  <div className="w-1/2 h-2/3 cursor-default">
                    <p className="text-sm mb-1 text-white">Output:</p>
                    <div className='w-full cursor-text rounded-lg px-3 py-[10px] bg-[#313131] text-white mt-2'>
                      {problem[`output${index + 1}`]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
