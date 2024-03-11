import React, { useEffect, useState } from 'react'
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom'
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher'
import AssignmentAccordionTeacher from '../../../../../components/Accordion/AssignmentAccordionTeacher'
import { useRouter } from 'next/router';
import axios from 'axios';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

const AssignmentRoom = () => {
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
    }
  };

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
              <div className="flex flex-col text-center mt-4">
                {section.some((sec) => sec.assignmentData.length > 0) ? (
                  // If there is at least one section with non-empty assignmentData, render the accordion
                  <AssignmentAccordionTeacher
                    section={section}
                    courseYearId={courseYearId}
                  />
                ) : (
                  // If all sections have empty assignmentData, show the message
                  <>
                    <h1 className='text-4xl font-bold text-gray-500 mb-3'>ยังไม่มีงานที่มอบหมาย</h1>
                    <p className="text-gray-600">
                      คุณยังไม่มีงานที่มอบหมายในรายวิชานี้ สร้างงานที่มอบหมายเมนู <span className='text-blue-800 font-semibold'>บทเรียน</span> ที่เมนูหลักเพื่อสร้างงานที่มอบหมาย
                    </p>
                  </>
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AssignmentRoom