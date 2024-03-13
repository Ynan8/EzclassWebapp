import React, { useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Select, SelectItem, Textarea, Input, Button, Card, Image } from "@nextui-org/react";
import { Badge, Avatar } from "@nextui-org/react";



const CourseUpdateForm = ({
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
}) => {


    return (
        <div>
            {values && (
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
                                        label="ชื่อรายวิชา" />
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
                        <div className="flex space-x-4 mt-1">

                            <p className="text-gray-500 text-xs">{characterCounts.detail}/200</p>
                        </div>
                    </div>
                    <div className="flex space-y-1 mt-4">
                        <div className="w-full">
                            <Select
                                variant='bordered'
                                isRequired
                                name="level"
                                value={values.level} // Use the `value` prop to control the selected item
                                label="ระดับการศึกษา"
                                className="max-w-xs"
                                onChange={handleLevelChange}
                            >
                                {levels.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                        {level.label}
                                    </SelectItem>
                                ))}
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
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImage}
                            />
                        </div>
                    </div>


                    {preview ? (
                        <div className="mt-6 text-center">
                            <Badge onClick={handleImageRemove} content="X" size='lg' className="ml-4 cursor-pointer" color="danger">
                                <Card radius="md" className="border-none">
                                    <Image alt="course image" className="object-cover" height={200} width={340} src={preview} />
                                </Card>
                            </Badge>
                        </div>
                    ) : values.image ? (
                        <div className="mt-6 text-center">
                            <Badge size='lg' className="ml-4 cursor-pointer" color="danger">
                                <Card radius="md" className="border-none">
                                    <Image alt="course image" className="object-cover" height={200} width={340} src={values.image.Location} />
                                </Card>
                            </Badge>
                        </div>
                    ) : null}

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

                </form>
            )}
        </div>
    )
}

export default CourseUpdateForm