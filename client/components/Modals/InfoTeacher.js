import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Avatar } from "antd";
import Link from "next/link";


const InfoTeacher = ({ teacher }) => {
    // Show Course
    const [courses, setCourses] = useState([])
    useEffect(() => {
        const teacherId = teacher._id
    }, [])
    useEffect(() => {
        loadCourses()
    }, [teacher])

    const loadCourses = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/teacher-courses/${teacher._id}`);
            setCourses(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };


    return (
        <div style={{ height: '800px', overflowY: 'auto' }}>
            {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
            <div className="flex flex-col items-center justify-center max-h-fit py-2">
                {/* <Avatar
                    src={teacher.image ? teacher.image.Location : "/"}
                    className="w-52 h-52 bg-gray-200 text-7xl md:m-auto xl:m-0 flex items-center justify-center"
                >
                    {teacher.image ? null : ""}
                </Avatar> */}
                <h1 className="text-xl font-bold text-center mb-5 mt-2">
                    {teacher.firstName ? teacher.firstName : ""} {teacher.lastName ? teacher.lastName : ''}
                </h1>
                <div className="flex flex-col pb-2 mr-auto mb-2">
                    <label className="text-gray-700 text-2xl px-3 border-l-4 border-blue-400">
                        รายวิชาที่สอน
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-6 ">
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course._id} className="hover:border-blue-500 duration-200 cursor-pointer relative flex flex-col mb-3 md:flex-row md:space-x- md:space-y-0 rounded-xl shadow-md p-6   border-2 border-gray-300">
                                <div className="w-full md:w-1/3  grid place-items-center rounded cursor-pointer">
                                    <Link
                                        href={`/admin/courseDetail/[id]`}
                                        as={`/admin/courseDetail/${course._id}`}
                                        className="pointer"
                                    >
                                        <img
                                            className='object-cover w-full h-full rounded-l'
                                            src={course.image.Location}
                                            alt={course.courseName}
                                        />
                                    </Link>
                                </div>
                                <div className="w-full md:w-1/2 bg-white flex flex-col space-y-2 p-3 rounded-r cursor-pointer">
                                    <p className=" md:text-2xl font-bold ">
                                        {course.courseCode}
                                        <span className="  text-xl">{course.courseNo} : {course.courseName.substring(0, 24)}...</span>
                                    </p>
                                    <div class="w-full ">
                                        <label
                                            class="block uppercase tracking-wide  text-gray-600 text-xl  "
                                        >
                                            ระดับชั้น <span >:</span>มัธยมศึกษาปีที่ {course.level}
                                        </label>
                                    </div>
                                    <div class="w-full ">
                                        <label
                                            class="block uppercase tracking-wide  text-gray-600 text-xl  "
                                        >
                                            จำนวนห้อง <span >:</span> 5 ห้อง
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        "ไม่มีรายวิชาที่สอน"
                    )}
                </div>

            </div>
        </div>
    );
};

export default InfoTeacher;