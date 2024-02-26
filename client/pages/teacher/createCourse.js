import React from 'react'
import CourseCreateForm from '../../components/form/CourseCreateForm'
import Link from 'next/link'
import { AiOutlineArrowLeft } from "react-icons/ai";


const createCourse = () => {
    return (
        <div>
            <Link href={"/teacher/home"} >
                <div className="p-2 m-2 w-20">
                    <AiOutlineArrowLeft size={30} />
                </div>
            </Link>
            <div className="mx-auto max-w-screen-lg px-4 pt-2 pb-20 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-medium">สร้างรายวิชา </h1>
                </div>
                <CourseCreateForm />
            </div>
        </div>
    )
}

export default createCourse