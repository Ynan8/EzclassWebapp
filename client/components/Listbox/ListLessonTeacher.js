import { Chip, ListboxItem } from '@nextui-org/react'
import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { GoTrash } from 'react-icons/go'
import { MdLibraryBooks } from 'react-icons/md'

const ListLessonTeacher = ({
    item,
}) => {
  return (
    <div>
        {item.lessonData?.map((lesson, lessonIndex) => (
                                <ListboxItem
                                className='mb-2'
                                    key={lessonIndex}
                                    title={
                                        <div className='flex items-center text-lg' >
                                            <p>
                                                <span className='font-semibold' >บทเรียนย่อยที่ {index + 1}.{lessonIndex + 1}</span> {lesson.lessonName}
                                            </p>
                                            <div className="flex items-center space-x-4 mr-4 ml-auto">
                       
                                                <Chip
                                                    className="capitalize"
                                                    color={lesson.published === "true" ? "success" : "default"}
                                                    size="md"
                                                    variant="flat"
                                                >
                                                    {lesson.published === "true" ? "เผยแพร่" : "แบบร่าง"}
                                                </Chip>

                                                <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                                                    <CiEdit size={23} className="ml-auto" />
                                                </span>
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <GoTrash size={20} className="" />
                                                </span>
                                            </div>
                                        </div>
                                    }
                                    startContent={
                                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                                            <MdLibraryBooks size={25} className="text-primary" />
                                        </div>
                                    }
                                >
                                </ListboxItem>
                            ))}
    </div>
  )
}

export default ListLessonTeacher