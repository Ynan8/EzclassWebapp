import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Select, SelectItem, Textarea, Input, Button, Card, Image } from "@nextui-org/react";
import { Badge, Avatar } from "@nextui-org/react";

const CourseCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    levels,
    handleUploadButtonClick,
    fileInputRef,
    handleFileInputChange,
    handleLevelChange,
    characterCounts,
    preview,
    handleImage,
    handleImageRemove,
    isLoading,
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
                                    size='lg'
                                />
                            </div>
                        </div>
                        <div className="flex  space-x-4 mt-1">
                            <p className="text-gray-500 text-xs">{characterCounts.courseNo}/6</p>
                        </div>
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
                                    label="ชื่อรายวิชา"
                                    size='lg'
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-1">

                            <p className="text-gray-500 text-xs">{characterCounts.courseName}/100</p>
                        </div>
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
                                label={<span className="text-lg">รายละเอียด</span>} 
                                variant="bordered"
                                disableAnimation
                                disableAutosize
                                classNames={{
                                    base: "w-full ",
                                    input: "resize-y min-h-[60px]",
                                }}
                            />


                        </div>
                    </div>
                    <div className="flex space-x-4 mt-1">

                        <p className="text-gray-500 text-xs">{characterCounts.detail}/200</p>
                    </div>

                </div>


                <div className="flex space-y-1 mt-4">
                    <div className="w-full">
                        <Select
                            isRequired
                            variant='bordered'
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
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImage}
                        />
                    </div>
                </div>

                {preview &&
                    <div className="mt-6 text-center">
                        <Badge onClick={handleImageRemove} content="X" size='lg' className="ml-4 cursor-pointer" color="danger">
                            <Card
                                radius="md"
                                className="border-none"
                            >
                                <Image
                                    alt="course image"
                                    className="object-cover"
                                    height={200}
                                    width={340}
                                    src={preview}
                                />
                            </Card>
                        </Badge>
                    </div>
                }

                <div>
                </div>
                <div className="flex sm:justify-end justify-center mt-6">
                    <Button
                        className='px-24 '
                        radius='lg'
                        size='lg'
                        onClick={handleSubmit}
                        color="primary"
                        isLoading=
                        {
                            values.loading ||
                            isLoading

                        }
                    >
                        {values.loading || isLoading ? "กำลังโหลด..." : "บันทึก"}
                    </Button>
                </div>
            </form >
        </div>
    )
}

export default CourseCreateForm