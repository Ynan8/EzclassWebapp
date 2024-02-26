import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { Select, SelectItem, Textarea, Input, Button } from "@nextui-org/react";

const CourseCreateForm = () => {
    const animals = [
        { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", value: "dog", description: "The most popular pet in the world" },
        { label: "Elephant", value: "elephant", description: "The largest land animal" },
        { label: "Lion", value: "lion", description: "The king of the jungle" },
        { label: "Tiger", value: "tiger", description: "The largest cat species" },
        { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
        {
            label: "Dolphin",
            value: "dolphin",
            description: "A widely distributed and diverse group of aquatic mammals",
        },
        { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
        { label: "Zebra", value: "zebra", description: "A several species of African equids" },
        {
            label: "Shark",
            value: "shark",
            description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        {
            label: "Whale",
            value: "whale",
            description: "Diverse group of fully aquatic placental marine mammals",
        },
        { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
        { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
    ];

    return (
        <div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input isRequired type="email" variant={"bordered"} label="รหัสวิชา" />
                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/20</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Input isRequired type="test" variant={"bordered"} label="ชื่อรายวิชา" />
                            </div>
                        </div>
                        <p className="ml-auto text-gray-500 text-xs">/100</p>
                    </div>
                </div>

                <div className="flex flex-col space-y-1 mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <Textarea
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
                            items={animals}
                            label="ระดับการศึกษา"
                            placeholder="เลือกระดับการศึกษา"
                            className="max-w-xs"
                        >
                            {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
                        </Select>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex items-center">
                        <Button color="default" variant="bordered" startContent={<FaCloudUploadAlt size={25} />}>
                            เพิ่มรูปรายวิชา
                        </Button>
                    </div>
                </div>





                <div>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        className={`hover:shadow-form w-full rounded-md  text-center text-base font-semibold outline-non`}
                        color="primary"
                    >
                        บันทึก
                    </Button>


                </div>
            </form >
        </div>
    )
}

export default CourseCreateForm