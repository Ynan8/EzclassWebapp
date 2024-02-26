import React from 'react';
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

const Home = () => {
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
                    <Link href={'/teacher/createCourse'}>
                      <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                        สร้างรายวิชา
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                  <Tabs size={"lg"} aria-label="Tabs sizes">
                    <Tab key="active" title="รายวิชาที่สอน" />
                    <Tab key="music" title="รายวิชาที่จัดเก็บ" />
                  </Tabs>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                  <Card className="py-4">
                    <CardBody className="overflow-visible">
                      <div className="relative">

                        <div
                          className='ml-auto mb-2'
                        >
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                className='ml-60'
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
                          href={`/teacher/course/year/`}
                        >
                          <img
                            className="object-cover"
                            src={bgYear}
                            alt={"Thumbnail-alt"}
                            width={300}
                            height={160}
                            style={{ background: "#252525e6", borderRadius: "6px" }}
                          />
                          </Link>
                      </div>
                    </CardBody>
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
