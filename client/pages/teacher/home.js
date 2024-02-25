import React from 'react';
import HeaderBarTeacher from '../../components/HeaderBar/HeaderBarTeacher';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa";
import { Button } from '@nextui-org/react';
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

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
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      height={200}
                      src="/images/hero-card.jpeg"
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">Available soon.</p>
                      <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                        Notify me
                      </Button>
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
