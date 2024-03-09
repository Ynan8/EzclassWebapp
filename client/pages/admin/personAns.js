import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import CardBarChartRoom from "../../components/Charts/ChartBarChartRoom";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";


const personAns = () => {
  return (
    <>
      <div class="min-h-screen flex flex-col flex-auto bg-gray-50 text-black">
        <HeaderBarAdmin />
        <div class="h-full mt-28 ">
          {/* Breadcrumb */}
          <div className="pl-20 mb-6">
            <nav class="text-gray-500" aria-label="Breadcrumb">
              <ol class="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    className="flex  items-center space-x-2"
                    href="/admin/home"
                  >
                    <p> หน้าหลัก</p>
                    <svg
                      className="fill-current w-3 h-3 mx-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    className="flex  items-center space-x-2"
                    href="/admin/courseDetail/id"
                  >
                    <p>รายวิชาที่สอน</p>
                    <svg
                      className="fill-current w-3 h-3 mx-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    className="flex  items-center space-x-2"
                    href="/admin/std"
                  >
                    <p>นักเรียนในรายวิชา</p>
                    <svg
                      className="fill-current w-3 h-3 mx-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    class=" text-blue-500 font-bold"
                    aria-current="page"
                  >
                    รายละเอียดแบบทดสอบ
                  </a>
                </li>
              </ol>
            </nav>
          </div>
          <div className="pl-20 flex items-center text-black  w-96 md:w-96 h-12  border-none pt-10">
            <button
              onClick={() => router.push("/admin/home")}
              className=" text-lg"
            >
              <AiOutlineLeft
                size={25}
                className="inline-block align-text-bottom mx-2"
              />
              ย้อนกลับ
            </button>
          </div>

          <div className="main-content  flex flex-col flex-grow  container">
            <div className="flex flex-wrap justify-center ">
              <div className="flex w-full flex-col mt-14">
                <div className="table-container overflow-x-auto w-full ">
                  <p className="text-gray-700 text-2xl px-3 border-l-4 border-blue-400">
                    แบบทดสอบที่ 1
                  </p>

                  <div className="container w-full overflow-x-auto">
                    <table className="w-full border-b  border-gray-200 mt-5 whitespace-nowrap">
                      <thead>
                        <tr className="text-lg font-medium text-gray-700 border-b border-gray-200">
                          <td className="py-4 px-4 text-center font-bold">
                            ลำดับ
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3 md-1  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2 text-center font-bold">
                            ชื่อ - สกุล
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            คะแนนเต็ม
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 pt-1 bg-gray-100 text-gray-600 text-center font-medium rounded-md">
                                100%
                              </p>
                            </div>
                          </td>
                          <td className="py-2 px-2 text-center font-bold">
                            ข้อ 1
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 2
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 3
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          {/* with border score */}
                          {/* <td className="py-4 px-4 text-center font-bold">
                            ข้อที่ 3
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 mt-2 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                5
                              </p>
                            </div>
                          </td> */}
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 4
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 5
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 6
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 7
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 8
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 9
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                          <td className="py-2 px-2  text-center font-bold">
                            ข้อ 10
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-3  text-center font-medium rounded-md"></p>
                            </div>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">1</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                              ศุภิสรา พรพิพัฒน์
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                50%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 2 */}
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">2</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                              ดารารัตน์ ทาสาจันทร์
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                70%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 3 */}
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">3</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                              นราวิชญ์ คมสัน
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                30%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 4 */}
                        
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">4</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                            กาญจนา พรหมสุข
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                100%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 5 */}

                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">5</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                            ศุภวัฒน์ พิชิตรักษ์
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                80%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 6 */}
                        
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">6</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                            ณัฐธิดา ชินวัตร
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                70%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 7 */}

                    
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">7</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                            ประภัสสร มณีสวัสดิ์
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                50%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>

                        {/* 8 */}
                        
                        <tr className="hover:bg-gray-100 transition-colors group">
                          <td className="text-center py-4 px-4">8</td>
                          <td className="py-4 px-4 text-center">
                            <p className="px-3 py-1 text-lg text-center rounded-md">
                            ธนพล สุขสุวรรณ
                            </p>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1  text-center font-medium rounded-md">
                                50%
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-green-100 text-green-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <p className="px-3 py-1 bg-red-100 text-red-600 text-center font-medium rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default personAns;
