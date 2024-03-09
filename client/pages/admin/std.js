import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import CardBarChartRoom from "../../components/Charts/ChartBarChartRoom";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";

const std = () => {
    return (
        <>
            <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-black dark:text-white">
                <HeaderBarAdmin />
                <div class="h-full mt-28">
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
                                        className="flex  items-center space-x-2 text-blue-500 font-bold"
                                        href="/admin/std"
                                    >
                                        <p>นักเรียนในรายวิชา</p>
                                    </Link>
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
                                {/* chart */}

                                <div className="w-full xl:w-full mb-12 xl:mb-0 ">
                                    <CardBarChartRoom />
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default std;
