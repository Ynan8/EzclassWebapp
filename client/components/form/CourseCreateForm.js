import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Select, SelectItem, Textarea, Input, Button } from "@nextui-org/react";

const CourseCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    levels,
    handleUploadButtonClick,
    fileInputRef,
    handleFileInputChange,
    handleLevelChange

}) => {
    
    return (
        <div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input
                                    isRequired
                                    type="text"
                                    name="courseNo"
                                    value={values.courseNo}
                                    onChange={handleChange}
                                    variant={"bordered"}
                                    label="รหัสวิชา"
                                />
                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/20</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input
                                    isRequired
                                    name="courseName"
                                    value={values.courseName}
                                    onChange={handleChange}
                                    type="text"
                                    variant={"bordered"}
                                    label="ชื่อรายวิชา" />
                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/100</p>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <Textarea
                                isRequired
                                name="detail"
                                value={values.detail}
                                onChange={handleChange}
                                label="รายละเอียด"
                                variant="bordered"
                                placeholder="เพิ่มคำอธิบายเกี่ยวกับรายวิชา"
                                disableAnimation
                                disableAutosize
                                classNames={{
                                    base: "w-full ",
                                    input: "resize-y min-h-[60px]",
                                }}
                            />

                        </div>
                    </div>
                    <p className="ml-auto text-gray-500 text-xs">/200</p>
                </div>


                <div className="flex space-y-1 mt-4">
                    <div className="w-full">
                        <Select
                            isRequired
                            name="level"
                            items={levels}
                            label="ระดับการศึกษา"
                            placeholder="เลือกระดับการศึกษา"
                            className="max-w-xs"
                            onChange={handleLevelChange} 
                        >
                            {(level) => <SelectItem key={level.value}>{level.label}</SelectItem>}
                        </Select>
                    </div>
                </div>


                <div className="mt-6">
                    <div className="flex items-center">
                        <Button
                            color="default"
                            variant="bordered"
                            startContent={<FaCloudUploadAlt size={25} />}
                            onClick={handleUploadButtonClick}
                        >
                            เพิ่มรูปรายวิชา
                        </Button>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                    </div>
                </div>





                <div>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        size='lg'
                        onClick={handleSubmit}
                        color="primary"
                        isLoading={values.loading}
                    >
                        {values.loading ? "กำลังโหลด..." : "บันทึก"}
                    </Button>
                </div>
            </form >
        </div>
    )
}

export default CourseCreateForm