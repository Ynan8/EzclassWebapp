import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Button, CardFooter, Skeleton } from '@nextui-org/react';
import { Card, CardBody } from "@nextui-org/react";
import { Tabs, Tab, } from "@nextui-org/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Context } from '../../context';
import HeaderBarStd from '../../components/HeaderBar/HeaderBarStd';

const Home = () => {
  const [courseImgLoading, setCourseImgLoading] = useState(false);
  const { state: { user } } = useContext(Context);

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
                  <Tabs size="lg" aria-label="Options">
                    <Tab key="active" title="รายวิชาที่เรียน">
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
                                  <CardBody className="overflow-visible">
                                    <div className="w-full grid place-items-center">
                                      <img
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
                                  <p className="text-tiny uppercase font-bold">
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
                    </Tab>
                    <Tab key="archived" title="รายวิชาที่จัดเก็บ">
                      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                        {courseImgLoading ? (
                          Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg h-64" />
                          ))
                        ) : (
                          courses && courses
                            .filter(course => course.status === false)
                            .map(course => (
                              <Card key={course._id} className="py-8">
                                <Link href={`/student/course/lesson/[id]`} as={`/student/course/lesson/${course._id}`}>
                                  <CardBody className="overflow-visible">
                                    <div className="w-full grid place-items-center">
                                      <img
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
                                  <p className="text-tiny uppercase font-bold">
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
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home