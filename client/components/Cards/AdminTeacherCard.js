import React from "react";
import Image from "next/image";
import teacher from "../../public/Teacher.png";
import student from "../../public/Student.png";
import { UserOutlined } from "@ant-design/icons/UserAddOutlined";
import { Avatar, User } from "@nextui-org/react";

const AdminTeacherCard = ({ name, subject, imageUrl, teacher }) => {
  return (
    <div className=" flex flex-col justify-center items-center bg-white rounded-lg shadow-md  pt-10 overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
      {/* <Avatar
        src={teacher.image ? teacher.image.Location : "/profile.png"}
        className="w-40 h-40 bg-gray-200 text-7xl md:m-auto xl:m-0 flex items-center justify-center"
      >
        {teacher.image ? null : <UserOutlined />}
      </Avatar> */}
      <Avatar
        size="lg"
        isBordered
        className="w-40 h-40"
        color="primary"
        src={teacher.image ? teacher.image.Location : "/profile.png"}
        name={teacher.firstName}
      />
      {/* <User
        as="button"
        avatarProps={{
          isBordered: true,
          src:teacher.image ? teacher.image.Location : "/profile.png"
        }}
        className="transition-transform"
        name={teacher && teacher.firstName + ' ' + teacher && teacher.lastName}
      /> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {teacher.firstName} {teacher.lastName}
        </h2>
        {/* <p className="text-gray-500">{subject}</p> */}
      </div>
    </div>
  );
};

export default AdminTeacherCard;