import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import CardBarChartRoom from "../../components/Charts/ChartBarChartRoom";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import { Pagination } from "@nextui-org/react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab,
  Button,
  Input,
} from "@nextui-org/react";

const std = () => {
  const router = useRouter();

  //Search**
  const [searchTerm, setSearchTerm] = useState("");

  

  //Pagination**
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // This should be your data array that you want to paginate.
  const data = []; // Your data array here

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Add any additional logic you need when a page changes.
  };

  // Slice the data for the current page
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
        <HeaderBarAdmin />
        <div class="h-full mt-28 px-0 mx-0 sm:px-4 lg:px-8">
          {/* Breadcrumb */}
          <div className="px-6 sm:px-20 md:px-16 lg:px-24 mb-4">
            {/* Breadcrumbs */}
            <Breadcrumbs size="lg">
              <BreadcrumbItem
                href="/admin/home"
                style={{ cursor: "pointer", color: "black" }}
              >
                หน้าหลัก
              </BreadcrumbItem>
              <BreadcrumbItem
                href="/admin/home"
                style={{ cursor: "pointer", color: "black" }}
              >
                รายวิชา
              </BreadcrumbItem>
              <BreadcrumbItem style={{ color: "blue" }}>
                หน้า 3 นร
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <main className="flex-1 pb-16 sm:pb-32">
            <div className="px-0 sm:px-6 md:px-6 lg:px-12 xl:px-12">
              <div class="  px-4 md:px-8 xl:px-10">
                <div class="flex items-center text-black w-full sm:w-64 md:w-96 h-12 border-none">
                  <button
                    onClick={() => router.push("/admin/home")}
                    className="flex items-center text-base  sm:text-lg"
                  >
                    <AiOutlineLeft
                      size={15}
                      className="inline-block align-text-bottom mx-2 sm:size-25"
                    />
                    ย้อนกลับ
                  </button>
                </div>
                <div className="main-content  flex flex-col flex-grow mx-auto  container">
                  <div className="flex flex-wrap justify-center ">
                    <div className="flex w-full flex-col mt-14">
                      {/* chart */}

                      <div className="w-full xl:w-full mb-12 xl:mb-0 ">
                        <CardBarChartRoom />
                      </div>
                      {/* Search Input */}
                      {/* <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
</div> */}
                      <div className="table-container overflow-x-auto w-full ">
                        <table className="w-full border-b border-gray-200 mt-5 whitespace-nowrap">
                          <thead>
                            <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                              <td className="py-4 px-4 text-center font-bold">
                                ลำดับ
                              </td>
                              <td className="py-4 px-4 text-center font-bold">
                                ชื่อ - สกุล
                              </td>
                              <td className="py-4 px-4 text-center font-bold">
                                คะแนนเฉลี่ย (%)
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 1
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 2
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 3
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 4
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 5
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 6
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 7
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 8
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 9
                                    </p>
                                  </div>
                                </Link>
                              </td>
                              <td className="py-1 px-1 text-center font-bold">
                                <Link href="/admin/personAns">
                                  <div className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                                    <p className="px-3 py-2 bg-blue-100 text-blue-600 text-center font-medium rounded-md hover:bg-sky-100">
                                      แบบทดสอบที่ 10
                                    </p>
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">1</td>
                              <td className="">ศุภิสรา พรพิพัฒน์</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>53%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>4</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">2</td>
                              <td className="">ดารารัตน์ ทาสาจันทร์</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>74%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>4</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                            </tr>
                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">3</td>
                              <td className="">นราวิชญ์ คมสัน</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>32%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>4</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">4</td>
                              <td className="">กาญจนา พรหมสุข</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>88%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>4</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">5</td>
                              <td className="">ศุภวัฒน์ พิชิตรักษ์</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>71%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">6</td>
                              <td className="">ณัฐธิดา ชินวัตร</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>69%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">7</td>
                              <td className="">ประภัสสร มณีสวัสดิ์</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>58%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>4</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                            </tr>

                            <tr className="hover:bg-gray-100 transition-colors group">
                              <td className="text-center py-4">8</td>
                              <td className="">ธนพล สุขสุวรรณ</td>

                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>45%</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>3</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>9</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>6</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>1</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>7</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>5</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>10</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>2</p>
                                </div>
                              </td>
                              <td className="py-1 px-1 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <p>8</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Place the Pagination component below your table */}
                      <div className="flex flex-col items-center justify-center my-8">
                        <Pagination
                          total={10}
                          initialPage={1}
                          page={currentPage}
                          onChange={handlePageChange}
                          isCompact
                          showControls
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default std;