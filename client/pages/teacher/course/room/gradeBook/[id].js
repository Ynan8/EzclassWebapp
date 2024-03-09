import React from 'react';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import { useRouter } from 'next/router';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaFileExcel } from 'react-icons/fa';

const GradeBookRoom = () => {
  const router = useRouter();
  const { id, courseYearId } = router.query;


  const assignments = [
    { name: "Assignment 1", maxScore: 100, weight: 5 },
    { name: "Assignment 2", maxScore: 100, weight: 5 },
    { name: "Assignment 3", maxScore: 100, weight: 5 },
  ];

  const students = [
    {
      studentId: "21380",
      name: "นายกิตติภูมิ สุขใส",
      assignmentScores: [20, 15, 25], // Scores for each assignment
      codeRoomScore: 10,
      totalScore: 70,
      grade: "B",
    },
    {
      studentId: "21381",
      name: "ธนพงศ์ สุขใจ",
      assignmentScores: [20, 10, 10], // Scores for each assignment
      codeRoomScore: 10,
      totalScore: 50,
      grade: "C",
    },
    {
      studentId: "21382",
      name: "กาญจนา สุวรรณภูมิ",
      assignmentScores: [20, 30, 20], // Scores for each assignment
      codeRoomScore: 10,
      totalScore: 80,
      grade: "A",
    },
    {
      studentId: "21383",
      name: "ณัฐภา กิจวัตร",
      assignmentScores: [15, 15, 25], // Scores for each assignment
      codeRoomScore: 8,
      totalScore: 63,
      grade: "B",
    },
    {
      studentId: "21384",
      name: "นายกิตติภูมิ สุขใส",
      assignmentScores: [20, 15, 25], // Scores for each assignment
      codeRoomScore: 60,
      totalScore: 60,
      grade: "B",
    },
    {
      studentId: "21385",
      name: "ธนัชชา นาคพร",
      assignmentScores: [20, 15, 25], // Scores for each assignment
      codeRoomScore: 10,
      totalScore: 70,
      grade: "B",
    },
  ];


  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SidebarTeacherRoom id={id} courseYearId={courseYearId} />
        <HeaderBarTeacher />
        <div className="h-full ml-20 mt-28 mb-10 md:ml-64">
          <div className="px-10">
          <Breadcrumbs size='lg'>
              <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
              <BreadcrumbItem>การเขียนโปรแกรม ด้วยภาษาไพธอนเบื้องต้น</BreadcrumbItem>
              <BreadcrumbItem>2566</BreadcrumbItem>
              <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
              <BreadcrumbItem>ผลการเรียน</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-12">
              <div className="overflow-x-auto">
                <div className="flex justify-between items-center">
                  <h1 className=" text-2xl font-semibold text-gray-700"
                  >
                    ผลการเรียน
                  </h1>
                  <Button
                    // onPress={onOpenModalExcel}
                    radius='sm'
                    className=" my-5 flex items-center text-white "
                    color="success"
                    startContent={
                      <FaFileExcel
                        size={20}
                      />
                    }
                  >
                    <p class=" font-medium leading-none">Download Excel</p>
                  </Button>
                </div>

                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="w-full h-24 border-gray-300 border-b py-8">
                      <th className="text-center pl-14 text-gray-600 font-normal pr-6 tracking-normal leading-4">
                        รหัสนักเรียน
                      </th>
                      <th className="text-center text-gray-600 font-normal pr-6  tracking-normal leading-4">
                        ชื่อ
                      </th>

                      {/* Map through your assignments here */}
                      {assignments.map((assignment) => (
                        <th className="text-center text-gray-600 font-normal pr-6  tracking-normal leading-4">
                          <div className="flex flex-col items-center space-y-3">
                            <span className='text-base font-semibold' >{assignment.name}</span>
                            <span className="bg-blue-500  text-white rounded p-2">
                              คะแนนเต็ม {assignment.maxScore}
                            </span>
                            <span className="text-base text-gray-500">
                              {assignment.weight}%
                            </span>
                          </div>
                        </th>
                      ))}
                      <th className="text-center text-gray-600 font-normal pr-6  tracking-normal leading-4">
                        คะแนนห้องเรียนเขียนโค้ด
                      </th>
                      <th className="text-center text-gray-600 font-normal pr-6  tracking-normal leading-4">
                        คะแนนรวม
                      </th>
                      <th className="text-center text-gray-600 font-normal pr-6 tracking-normal leading-4">
                        เกรด
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr className="h-20 border-gray-300 border-b">
                        <td className="text-center pl-14  pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                          {student.studentId}
                        </td>
                        <td className="text-center  pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                          {student.name}
                        </td>
                        {/* Map through student's scores here */}
                        {student.assignmentScores.map((score, scoreIndex) => (
                          <td className="text-center m pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4" key={scoreIndex}>
                            {score}
                          </td>
                        ))}
                        <td className="text-center  pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                          {student.totalScore}
                        </td>
                        <td className="text-center  pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                          {student.totalScore}
                        </td>
                        <td className="text-center  pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                          {student.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default GradeBookRoom