import React, { useContext, useEffect, useState } from 'react';
import HeaderBarTeacher from '../../components/HeaderBar/HeaderBarTeacher';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa";
import { Button, CardFooter, DropdownSection } from '@nextui-org/react';
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { Tabs, Tab } from "@nextui-org/react";
import bgYear from '../../public/bgYear.png'
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, cn } from "@nextui-org/react";
import { Context } from '../../context';
import { useRouter } from 'next/router';
import axios from 'axios';
import UserRoute from '../../components/Routes/UserRoutes';


const Home = () => {

  const [hidden, setHidden] = useState(true);
  const { state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  //   useEffect(() => {
  //     if (user !== null && user.role === 'teacher') {
  //         router.push('/teacher/home')
  //     } else if (user !== null && user.role === 'student') {
  //         router.push('/student/home')
  //     }
  // }, [user])

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiMzAwMyIsImZpcnN0TmFtZSI6IuC4p-C4o-C4o-C4k-C4nuC4h-C4qeC5jCIsImxhc3ROYW1lIjoi4Lie4LiH4Lip4LmM4LiK4Liy4LiV4Li0IiwiaW1hZ2UiOiJodHRwczovL2V6Y2xhc3MtbG1zLnMzLmFtYXpvbmF3cy5jb20vM09LUzZ4Wmh4QTJUX3B0c1VaZDAtLmpwZWciLCJyb2xlIjoidGVhY2hlciJ9LCJpYXQiOjE3MDkxOTMyMzQsImV4cCI6MTcwOTI3OTYzNH0.hYxFFeSnSyHG8Unn_GZz-VYWh_D2txHRs3RzCHrvMwA";

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`, {
        headers: {
          'authtoken': authtoken,
        },
      });

      console.log(data)
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(false);
    }
  };





  const menu = {

  };


  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="header flex flex-col">
          <HeaderBarTeacher />
        </div>
        <main className="flex-1 pb-16 sm:pb-32">
          <div className="pt-10 sm:pt-12">
            <div className="container mx-auto px-4 sm:px-6 xl:px-12">
              <div className="mt-14 ">
                <div className="flex items-center justify-between my-8">
                  <div className="flex space-x-2 justify-center item-center">
                    {/* <SearchCourse /> */}
                  </div>
                  <div className="flex items-center">
                    <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                      สร้างรายวิชา
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <Tabs size={"lg"} aria-label="Tabs sizes">
                    <Tab key="active" title="รายวิชาที่สอน" />
                    <Tab key="music" title="รายวิชาที่จัดเก็บ" />
                  </Tabs>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                  <Card className="py-8">
                    <div className="absolute top-0 right-0 m-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            size='sm'
                            variant="light"
                            startContent={<BsThreeDotsVertical size={20} />}
                          >

                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                          <DropdownItem
                            key="new"
                          >
                            จัดเก็บรายวิชา
                          </DropdownItem>
                          <DropdownItem
                            key="edit"
                          >
                            แก้ไขรายวิชา
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            ลบรายวิชา
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <Link
                      href={`/teacher/course/year/${menu.id}`}
                    >
                      <CardBody className="overflow-visible">


                        <div className="w-full  grid place-items-center">
                          <img
                            className="object-cover rounded"
                            src='https://www.freecodecamp.org/news/content/images/2023/12/python-best-for.png'
                            alt="course-image"
                          />

                        </div>
                      </CardBody>
                    </Link>
                    <CardFooter className="pb-0 px-4 flex-col items-start">
                      <h4 className="font-bold text-large">Frontend Radio</h4>
                      <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    </CardFooter>
                  </Card>

                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
