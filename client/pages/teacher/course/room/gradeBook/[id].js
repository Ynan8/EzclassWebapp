import React, { useEffect, useState } from 'react';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import { useRouter } from 'next/router';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaFileExcel } from 'react-icons/fa';
import axios from 'axios';

const GradeBookRoom = () => {
  const router = useRouter();
  const { id } = router.query;

  // Load CourseRoom
  const [courseRoomSingle, setCourseRoomSingle] = useState({});

  const courseYearId = courseRoomSingle.courseYearId


  useEffect(() => {
    if (id) {
      loadCourseRoom();
    }
  }, [id]);


  const loadCourseRoom = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomSingle/${id}`);
        setCourseRoomSingle(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  // Show Course Year
  const [courseYear, setCourseYear] = useState({});

  useEffect(() => {
    if (courseYearId) {
      loadCourseYear();
    }
  }, [courseYearId]);

  const loadCourseYear = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${courseYearId}`);
      const firstElement = data && data.length > 0 ? data[0] : {};
      setCourseYear(firstElement);

    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };


  const courseId = courseYear.courseId;

  const [course, setCourse] = useState({});


  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [courseId]);


  const loadCourse = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
        setCourse(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }




  const assignments = [
    { name: "Assignment 1", maxScore: 100, weight: 5 },
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

  const [assignmentScoreRoom, setAssignmentScoreRoom] = useState([]);

  useEffect(() => {
    if (id) {  // Make sure id is defined before making the API call
      loadAssignmentRoom(id);
    }
  }, [id]);  // Add id as a dependency to useEffect

  const loadAssignmentRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }

      const { data: assignmentScores } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignmentRoom/${id}`);

      // Fetch additional information for each assignment score
      const assignmentScoresWithData = await Promise.all(assignmentScores.map(async (assignmentScore) => {
        const [userResponse, assignmentResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API}/user/${assignmentScore.studentId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentScore.assignmentId}`)
        ]);

        return {
          ...assignmentScore,
          studentName: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
          studentNo: `${userResponse.data.username}`,
          assignmentName: assignmentResponse.data.assignmentName,
          scoreLimit: assignmentResponse.data.scoreLimit,
          weight: assignmentResponse.data.weight
        };
      }));

      setAssignmentScoreRoom(assignmentScoresWithData);
    } catch (error) {
      console.error('Error loading assignment score:', error);
    }
  };

  const groupedByStudent = {};

  assignmentScoreRoom.forEach((score) => {
    // If we haven't seen this student before, initialize their entry with empty scores array
    if (!groupedByStudent[score.studentNo]) {
      groupedByStudent[score.studentNo] = {
        studentNo: score.studentNo,
        studentName: score.studentName,
        assignments: [],
      };
    }
    // Push the current score into this student's scores
    groupedByStudent[score.studentNo].assignments.push({
      assignmentName: score.assignmentName,
      score: score.score,
      weight: score.weight,
      scoreLimit: score.scoreLimit,
    });
  });

  // Convert object into an array of students
  const studentsArray = Object.values(groupedByStudent);



  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SidebarTeacherRoom id={id} courseYearId={courseYearId} />
        <HeaderBarTeacher />
        <div className="h-full ml-20 mt-28 mb-10 md:ml-64">
          <div className="px-10">
            {/* Breadcrumbs */}
            <Breadcrumbs size='lg' maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
              <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
              <BreadcrumbItem>{course.courseName} {courseRoomSingle.roomName}</BreadcrumbItem>
              <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
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
                {/* <pre>{JSON.stringify(assignmentScoreRoom, null, 4)}</pre> */}
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
                      {assignmentScoreRoom.map((score, index) => (
                        <th key={index} className="text-center text-gray-600 font-normal pr-6 tracking-normal leading-4">
                          <div className="flex flex-col items-center space-y-3">
                            <span className="text-base font-semibold">{score.assignmentName}</span>
                            <span className="  rounded p-2">
                              คะแนนเต็ม <span className='font-semibold' >{score.scoreLimit}</span>
                            </span>
                            <span className="text-base text-gray-500">
                              {score.weight}%
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
                    {studentsArray.length > 0 ? (
                      studentsArray.map((student, index) => {
                        const totalWeightedScore = student.assignments.reduce((total, assignment) => {
                          return total + ((assignment.score * assignment.weight) / assignment.scoreLimit);
                        }, 0);

                        return (
                          <tr className="h-20 border-gray-300 border-b" key={index}>
                            <td className="text-center pl-14 pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                              {student.studentNo}
                            </td>
                            <td className="text-center pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                              {student.studentName}
                            </td>
                            {student.assignments.map((assignment, assignmentIndex) => (
                              <td className="text-center pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4" key={assignmentIndex}>
                                {((assignment.score * assignment.weight) / assignment.scoreLimit).toFixed(2)}
                              </td>
                            ))}
                            {/* Add more cells if needed */}
                            <td className="text-center pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                            {/* code room score */}
                    
                            </td>
                            <td className="text-center pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                              {totalWeightedScore.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">ยังไม่มีผลการเรียน</td>
                      </tr>
                    )}
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