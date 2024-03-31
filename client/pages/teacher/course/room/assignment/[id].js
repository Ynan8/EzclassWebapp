import React, { useEffect, useState } from 'react'
import TeacherRoute from '../../../../../components/Routes/TeacherRoute';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom'
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher'
import AssignmentAccordionTeacher from '../../../../../components/Accordion/AssignmentAccordionTeacher'
import { useRouter } from 'next/router';
import axios from 'axios';
import { BreadcrumbItem, Breadcrumbs, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { RiCodeBoxFill } from 'react-icons/ri';
import { MdAssignment } from 'react-icons/md';
import Link from 'next/link';

const AssignmentRoom = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { id } = router.query;


  // Load CourseRoom
  const [courseRoomSingle, setCourseRoomSingle] = useState({});

  const courseYearId = courseRoomSingle.courseYearId
  console.log(courseYearId)


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




  // Show section
  useEffect(() => {
    if (courseYearId) {
      loadSection();
    }
  }, [courseYearId]);
  const [section, setSection] = useState([])
  const loadSection = async () => {
    try {
      setIsLoading(true);
      const { data: sections } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section`, {
        params: {
          courseYearId: courseYearId,
        },
      });

      // Fetch lesson and quiz data for each section
      const sectionsWithData = await Promise.all(
        sections.map(async (section) => {
          const AssignmentData = await Promise.all(
            section.assignment.map(async (assignmentId) => {
              try {
                const { data: assignment } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentId}`);
                return assignment;
              } catch (error) {
                console.error('Error loading assignment:', error);
                return null;
              }
            })
          );

          return { ...section, AssignmentData };
        })
      );

      setSection(sectionsWithData);
    } catch (error) {
      console.error('Error loading sections:', error);
    } finally {
      setIsLoading(false);
    }
  };

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


  // student submit
  const [studentSubmit, setStudentSubmit] = useState([])

  useEffect(() => {
    loadStdSubmit();
  }, []);

  const loadStdSubmit = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/all/student-submit/${id}`);
      setStudentSubmit(data)
    } catch (error) {
      console.error('Error loading assignments:', error);
    }
  };

  const calculateSubmissionPercentage = (assignmentId) => {
    // Filter students who have submitted the assignment
    const studentsWithSubmission = studentSubmit.filter((submission) => submission.assignmentId === assignmentId);

    // Calculate the percentage
    const totalStudents = student.length;
    const percentage = totalStudents > 0 ? (studentsWithSubmission.length / totalStudents) * 100 : 0;

    return percentage.toFixed(2); // Round to two decimal places
  };


  return (
    <TeacherRoute>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SidebarTeacherRoom mobileSidebarOpen={mobileSidebarOpen} id={id} />
        <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
        <div className="h-full mt-28 mb-10 md:ml-64">
          <div className="px-10">
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
              <BreadcrumbItem>ตรวจงาน</BreadcrumbItem>
            </Breadcrumbs>

          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
              <div className="flex flex-col space-y-4">
                <h1 className=" text-2xl font-semibold text-gray-700"
                >
                  ตรวจงาน
                </h1>
                {/* <pre>{JSON.stringify(section, null, 4)}</pre> */}
              </div>
              <div className="flex flex-col  mt-2">
                <AssignmentAccordionTeacher
                  section={section}
                  courseYearId={courseYearId}
                  courseRoomId={id}
                  isLoading={isLoading}
                  calculateSubmissionPercentage={calculateSubmissionPercentage}
                />
              </div>
            </div>
          </main>
        </div>
      </div >
    </TeacherRoute>
  )
}

export default AssignmentRoom