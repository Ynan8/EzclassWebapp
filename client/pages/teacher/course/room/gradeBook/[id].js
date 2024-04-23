import React, { useEffect, useState } from 'react';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import { useRouter } from 'next/router';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaFileExcel } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import TeacherRoute from '../../../../../components/Routes/TeacherRoute';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import SideBarTeacher from '../../../../../components/Sidebar/SideBarTeacher';



const GradeBookRoom = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

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

  const [student, setStudent] = useState([]);
  const loadStudentCourse = async () => {
    if (id) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/studentRoom/${id}`);
        setStudent(data)
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadStudentCourse();
    }
  }, [id]);


  const downloadExcel = () => {
    const workSheetData = student.map((stud) => {
      // Find assignments for the student
      const studentAssignments = assignmentScoreRoom.filter((assignment) => assignment.studentId === stud._id);

      // Calculate total weighted score and grade
      const totalWeightedScore = studentAssignments.reduce((total, assignment) => {
        return total + ((assignment.score * assignment.weight) / assignment.scoreLimit);
      }, 0);
      const grade = calculateGrade(totalWeightedScore);

      // Start with the student ID and name
      let record = {
        'รหัสนักเรียน': stud.username,
        'ชื่อ': `${stud.firstName} ${stud.lastName}`,
      };

      // Add scores for each unique assignment
      uniqueAssignments.forEach((assignment) => {
        const studentAssignment = studentAssignments.find((ass) => ass.assignmentName === assignment.assignmentName);
        record[assignment.assignmentName] = studentAssignment
          ? ((studentAssignment.score / studentAssignment.scoreLimit) * assignment.weight).toFixed(2)
          : 'N/A'; // Use 'N/A' for assignments not found
      });

      // Add code room score, total weighted score, and grade
      record['คะแนนห้องเรียนเขียนโค้ด'] = ''; // Assign code room score if applicable
      record['คะแนนรวม'] = totalWeightedScore.toFixed(2);
      record['เกรด'] = grade;

      return record;
    });

    // Generate worksheet
    const workSheet = XLSX.utils.json_to_sheet(workSheetData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "GradeBook");

    // Generate buffer
    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });

    // Convert to Blob and save using FileSaver
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, 'GradeBook.xlsx');
  };




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

  const uniqueAssignments = assignmentScoreRoom.reduce((unique, item) => {
    const isDuplicate = unique.some(uniqueItem => uniqueItem.assignmentId === item.assignmentId);
    if (!isDuplicate) {
      unique.push(item);
    }
    return unique;
  }, []);

  const calculateGrade = (score) => {
    if (score >= 80) return 4;
    else if (score >= 75) return 3.5;
    else if (score >= 70) return 3;
    else if (score >= 65) return 2.5;
    else if (score >= 60) return 2;
    else if (score >= 55) return 1.5;
    else if (score >= 50) return 1;
    else return 0;
  }



  return (
    <TeacherRoute>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={courseYearId} />
        <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
        <div className="h-full mt-16 mb-10 md:ml-64">
          <Navbar
            classNames={{
              item: [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
              ],
            }}
          >
            <NavbarContent className="gap-3" justify="start">
              <NavbarItem  >
                <Link
                  href={`/teacher/course/room/single/${id}/`}
                >
                  ภาพรวมห้องเรียน
                </Link>
              </NavbarItem>
              <NavbarItem  >
                <Link
                  href={`/teacher/course/room/assignment/${id}/`}
                >
                  ตรวจงาน
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link
                  href={`/teacher/course/room/gradeBook/${id}/`}
                >
                  ผลการเรียน
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href={`/teacher/course/room/manage-user/${id}/`}
                >
                  จัดการชื่อผู้ใช้
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <div className="mt-10 px-10">
            {/* Breadcrumbs */}
            <Breadcrumbs size='lg' maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
              <BreadcrumbItem>
                <Link href={'/teacher/home'}>
                  หน้าหลัก
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href={`/teacher/course/room/${courseYearId}`}>
                  {course.courseName} {courseRoomSingle.roomName}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href={`/teacher/course/year/${course._id}`}>
                  ปีการศึกษา {courseYear.year}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
              <BreadcrumbItem>ผลการเรียน</BreadcrumbItem>
            </Breadcrumbs>

          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 xl:px-12">
              <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10 overflow-x-auto">
                <div className="flex justify-between items-center">
                  <p className='md:text-2xl  sm:text-lg font-semibold'>
                    ผลการเรียน
                  </p>
                  <Button
                    onPress={downloadExcel}
                    radius='sm'
                    className=" my-5 flex items-center text-white "
                    color="success"
                    startContent={
                      <FaFileExcel size={20} />
                    }
                  >
                    <p class=" font-medium leading-none">Download Excel</p>
                  </Button>
                </div>
                {/* <pre>{JSON.stringify(assignmentScoreRoom, null, 4)}</pre> */}
                <table className="w-full border-b border-gray-200">

                  <thead>
                    <tr className="w-full h-24 border-gray-300 border-b py-8">
                      <th
                        className="text-center pl-14 pr-6"
                      >
                        รหัสนักเรียน
                      </th>
                      <th
                        className="text-center pl-14 pr-6"
                      >
                        ชื่อ
                      </th>
                      {uniqueAssignments.map((assignment, index) => (
                        <th key={index}
                          className="text-center pl-14 pr-6"
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <span className="text-base font-semibold">{assignment.assignmentName}</span>
                            <span className="  rounded p-2">
                              คะแนนเต็ม <span className='font-semibold' >{assignment.scoreLimit}</span>
                            </span>
                            <span className="text-base text-gray-500">
                              {assignment.weight}%
                            </span>
                          </div>
                        </th>
                      ))}
                      {/* <th className="text-center text-gray-600 font-normal pr-6  tracking-normal leading-4">
                        คะแนนห้องเรียนเขียนโค้ด
                      </th> */}
                      <th
                        className="text-center pl-14 pr-6"
                      >
                        คะแนนรวม
                      </th>
                      <th
                        className="text-center pl-14 pr-6"
                      >
                        เกรด
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.length > 0 ? (
                      student.map((stud, index) => {
                        const studentAssignments = assignmentScoreRoom.filter(assignment => assignment.studentId === stud._id);
                        const totalWeightedScore = studentAssignments.reduce((total, assignment) => {
                          return total + ((assignment.score * assignment.weight) / assignment.scoreLimit);
                        }, 0);

                        return (
                          <tr className="h-20 border-gray-300 border-b" key={stud._id}>
                            <td
                              className="text-center pl-14 pr-6">
                              {stud.username}
                            </td>
                            <td
                              className="text-center pl-14 pr-6"
                            >
                              {stud.firstName} {stud.lastName}
                            </td>
                            {studentAssignments.map((assignment, assignmentIndex) => (
                              <td
                                className="text-center pl-14 pr-6" key={assignmentIndex}>
                                {(assignment.score / assignment.scoreLimit) * assignment.weight.toFixed(2)}
                              </td>
                            ))}
                            {/* <td className="text-center pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                              Insert code room score here if applicable
                            </td> */}
                            <td
                              className="text-center pl-14 pr-6"
                            >
                              {totalWeightedScore.toFixed(2)}
                            </td>
                            <td
                              className="text-center pl-14 pr-6">
                              {calculateGrade(totalWeightedScore)}
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
    </TeacherRoute>
  )
}

export default GradeBookRoom