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
            <Breadcrumbs size='lg'>
              <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
              <BreadcrumbItem>การเขียนโปรแกรม ด้วยภาษาไพธอนเบื้องต้น</BreadcrumbItem>
              <BreadcrumbItem>2566</BreadcrumbItem>
              <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
              <BreadcrumbItem>งานที่มอบหมาย</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
              <div className="flex flex-col space-y-4">
                <h1 className=" text-2xl font-semibold text-gray-700"
                >
                  งานที่มอบหมายทั้งหมด
                </h1>
                {/* <pre>{JSON.stringify(section, null, 4)}</pre> */}
                <AssignmentAccordionTeacher
                  section={section}
                  courseYearId={courseYearId}
                />

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AssignmentRoom