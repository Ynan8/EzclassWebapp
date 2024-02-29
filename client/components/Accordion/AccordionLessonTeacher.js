import React from "react";
import { Collapse } from "react-collapse";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { List } from 'antd';


const AccordionLessonTeacher = ({
  openToggle,
  toggle,
  title,
  dec,
}) => {

  return (

    <div className="pt-[10px]">
      <div
        onClick={toggle}
        className={`flex items-center justify-center py-[30px] px-[40px]  w-full  border-2 rounded-lg shadow-sm cursor-pointer ${openToggle ? ' border-b-white rounded-b-none' : ''
          }`}>
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-full">
            <BsBook size={25} color="white" />
          </div>
          <p className="text-[22px] font-medium">{title}</p>

        </div>
        <div className="flex space-x-4 mr-4 ml-auto">
          <span className="font-medium">
            <FaRegEdit
             
              size={20}
              className='cursor-pointer'
            />
          </span>
          <span className="font-medium">
            <FaTrash
              size={20}
              className='cursor-pointer'
            />
          </span>
          {openToggle ? < AiFillCaretUp /> : <AiFillCaretDown />}
        </div>
      </div>
      <Collapse isOpened={openToggle}>
        <div className=" bg-white border-2 shadow-sm border-t-white border-t-0 rounded-b-lg px-[50px] ">{dec}</div>
      </Collapse>
    </div>
  )
}

export default AccordionLessonTeacher