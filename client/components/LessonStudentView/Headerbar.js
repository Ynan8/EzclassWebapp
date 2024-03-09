import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'

const Headerbar = ({
    sidebarCollapsed,
    setSidebarCollapsed,
    markCompleted,
    selectedLesson
}) => {
    return (
        <div className={`flex justify-between items-center h-14 bg-blue-500 mb-2 fixed top-0  right-0 ${sidebarCollapsed ? 'left-0' : 'left-[20%]'}`}>
            <button
                className="text-white ml-4 flex items-center "
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
                <AiOutlineMenu className="hover:text-blue-500 duration-200" size={25} />
            </button>
          
        </div>
    )
}

export default Headerbar