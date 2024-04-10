import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Context } from '../../context/';
import { useRouter } from 'next/router';
import HeaderBarStd from '../../components/HeaderBar/HeaderBarStd'
import { Card, CardBody, CardFooter, Skeleton } from '@nextui-org/react';

const Home = () => {
  const [courseImgLoading, setCourseImgLoading] = useState(false);
  const { state: { user } } = useContext(Context);

  const router = useRouter();

  const logUser = async (username, userRole, firstName, lastName, action, courseId) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/course-logs`, {
        courseId: courseId,
        username,
        firstName,
        lastName,
        userType: userRole,
        format: action,
      });
    } catch (error) {
      console.error('Error logging user action:', error);
    }
  };

  useEffect(() => {
    if (user !== null && user.role === 'teacher') {
      router.push('/teacher/home')
    } else if (user !== null && user.role === 'student') {
      router.push('/student/home')
    } else if (user !== null && user.role === 'admin') {
      router.push('/admin/home')
    }
  }, [user])

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }

      setCourseImgLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/student-courses`);
      setCourses(data);
      setCourseImgLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourseImgLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <HeaderBarStd />
        <main className="flex-1 pb-16 sm:pb-32">
          <div className="pt-10 sm:pt-12">
            <div className="container mx-auto px-4 sm:px-6 xl:px-12">
              <div className="mt-14 ">
                <div className="flex flex-wrap gap-4 mb-4">
                  <h1 className=" text-2xl font-semibold text-gray-700">
                    รายวิชาทั้งหมด
                  </h1>
                  <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                    {courseImgLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="rounded-lg h-64" />
                      ))
                    ) : (
                      courses && courses
                        .filter(course => course.status === true)
                        .map(course => (
                          <Card key={course._id} className="py-8">
                            <Link href={`/student/course/lesson/[id]`} as={`/student/course/lesson/${course._id}`}>
                              <CardBody className="overflow-visible" >
                                <div className="w-full grid place-items-center">
                                  <img
                                    onClick={() => logUser(user.username, user.role, user.firstName, user.lastName, 'เข้าใช้งานวิชา', course._id)}
                                    className="object-cover rounded"
                                    src={course.image.Location}
                                    alt={course.courseName}
                                  />
                                </div>
                              </CardBody>
                            </Link>
                            <CardFooter className="pb-0 px-4 flex-col items-start">
                              <h4 className="font-bold text-large">
                                {course.courseName.length > 30
                                  ? `${course.courseNo} : ${course.courseName.substring(0, 25)}...`
                                  : `${course.courseNo} : ${course.courseName}`
                                }
                              </h4>
                              <p className="text-lg font-bold">
                                {course.level.length > 30
                                  ? `${course.level.substring(0, 60)}...`
                                  : `มัธยมศึกษาปีที่ ${course.level}`
                                }
                              </p>
                            </CardFooter>
                          </Card>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home;
