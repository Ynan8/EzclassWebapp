import React from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input } from "@nextui-org/react";

import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsBook, BsJournalCheck } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';
import CardOverviewCourse from '../../../../components/Cards/CardOverviewCourse';
import AverageScoreCourse from '../../../../components/Charts/AverageScoreCourse';
import { useRouter } from 'next/router';


const OverviewCourse = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto  bg-gray-50 text-black ">
                <SideBarTeacher courseYearId={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อวิชา</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อปีการศึกษา</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-12 w-full">
                        {/* Card */}
                        <CardOverviewCourse />

                        {/* Chart */}
                        <div className="flex items-center justify-center flex-wrap ">
                            <AverageScoreCourse />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewCourse