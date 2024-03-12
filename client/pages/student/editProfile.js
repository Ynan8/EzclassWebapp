import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, User, Avatar } from "@nextui-org/react";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import Resizer from "react-image-file-resizer"
import { Input, Button, ButtonGroup } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { Context } from "../../context/";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { FaCloudUploadAlt, FaPen } from "react-icons/fa";
import { AiOutlineLeft } from "react-icons/ai";


function editprofile() {
  const [open, setOpen] = useState(true);

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loading: false,
  });


  // state
  const [hidden, setHidden] = useState(true);
  const { state: { user },
    dispatch,
  } = useContext(Context);





  useEffect(() => {
    getUser();
  }, [user])

  const getUser = async () => {
    try {
      if (user && user._id) {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/user/${user._id}`);
        setUserData(data);
        if (data && data.image) setImage(data.image)
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };



  // router
  const router = useRouter();

  useEffect(() => {
    if (user) {
    }
  }, [user]);





  const handleSidebarToggle = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    // Update the state when input fields change
    const { id, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // image preview
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image');

  const handleImage = (e) => {
    let file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name)
    setUserData({ ...userData, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/course/profile-image`, {
          image: uri,
        });
        console.log("Image uploaded", data);
        // set image in the state
        setImage(data)
        setUserData({ ...userData, loading: false });
        setImageSelected(true);

      } catch (err) {
        console.log(err)
        setUserData({ ...userData, loading: false })
        toast.error('Image upload failed. Try later.')
      }
    })
  }

  const handleUpdateProfile = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/updateProfile/${userData._id}`, {
        ...userData,
        image,
      });
      console.log("Updated Data:", data);
      setUserData(data);
      toast.success("แก้ไขข้อมูลสำเร็จ");
      router.push('/student/home');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("ไม่สามารถแก้ไขได้");
    }
  };

  //change password
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleUpdatePassword = async () => {
    try {
      const { oldPassword, newPassword, confirmPassword } = formData;

      // Add validation for new password and confirm password
      if (newPassword !== confirmPassword) {
        toast.error('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
        return;
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/update-password`,
        {
          oldPassword,
          newPassword,
        },
        config
      );

      toast.success(data.message);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error('รหัสผ่านเก่าไม่ถูกต้อง ลองอีกครั้ง!!');
    }
  };





  return (
  <>
    <div className="pl-20 flex items-center text-black  w-96 md:w-96 h-12  border-none pt-10">
      <button
        onClick={() => router.push("/student/home")}
        className=" text-lg"
      >
        <AiOutlineLeft
          size={25}
          className="inline-block align-text-bottom mx-2"
        />
        ย้อนกลับ
      </button>
    </div>
    <div className="mx-auto  max-w-screen-lg px-4 pt-2 pb-20 space-y-12">

      {/* <pre>{JSON.stringify(userData, null, 4)}</pre> */}
      <h1 className="text-2xl font-semibold my-10">แก้ไขข้อมูลส่วนตัว</h1>
      <div className="bg-gray-100 min-h-max rounded-xl p-5">
        <div>
          <div className="xl:flex gap-10 place-content-center md:block">
            <div className="">
              <label className="flex flex-col items-center cursor-pointer space-x-1 rounded-md px-2 py-1.5 max-w-max focus:outline-none transition ">
                {preview ? (
                  <Avatar
                    src={preview}
                    className="w-52 h-52 text-large"
                  />
                ) : (
                  <Avatar
                    src={userData.image ? userData.image.Location : '/profile.png'}
                    className="w-52 h-52 text-large"
                  />
                )}

                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImage}
                    hidden
                  />
                </div>
                <p className="mt-1 text-lg">อัพโหลดรูปโปรไฟล์</p>
              </label>

            </div>
            <div className="flex flex-col bg-white w-full p-10 rounded-lg shadow-md">
              <table className=" table table-borderless">
                <tbody>
                  <tr>
                    <td className="text-end"><p className="">ชื่อ :</p></td>
                    <td className="mt-5">
                      <Input
                        type="text"
                        id="firstName"
                        value={userData.firstName}
                        onChange={handleInputChange}
                        placeholder="กรุณากรอกชื่อ"
                        className="rounded-md max-w-xl border focus:border-transparent"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end mt-5">นามสกุล :</td>
                    <td className="mt-5">
                      <Input
                        type="text"
                        id="lastName"
                        value={userData.lastName}
                        onChange={handleInputChange}
                        placeholder="กรุณากรอกนามสกุล"
                        className="rounded-md max-w-xl border focus:border-transparent"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-end">รหัสนักเรียน :</td>
                    <td>
                      <Input
                        isDisabled
                        type="email"
                        value={userData.username}
                        defaultValue="junior@nextui.org"
                        className="bg-gray-200 rounded-md  max-w-xl"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleOpenModal}
                  className="  border-1 border-orange-400 bg-white  px-8 py-2 rounded"
                >
                  เปลี่ยนรหัสผ่าน
                </Button>
                <Button
                  isLoading={userData.loading}
                  onClick={handleUpdateProfile} className=" bg-blue-500 text-white px-12 py-2 rounded">
                  {userData.loading ? 'กำลังโหลด...' : 'บันทึกข้อมูล'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 gray-background">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <IoMdClose size={20} />
              </button>
            </div>
            <p>กรุณาเปลี่ยนรหัสผ่าน</p>

            {/* ฟอร์มเปลี่ยนรหัสผ่าน */}

            <div className="flex flex-col items-center mt-4 ">
              <label htmlFor="oldPassword" className="text-gray-600">
                รหัสผ่านเก่า:
              </label>
              <input
                type="password"
                id="oldPassword"
                placeholder="กรอกรหัสผ่านเก่า"
                className="w-96 max-w-xs p-2 mt-1 border border-gray-300 rounded"
                value={formData.oldPassword}
                onChange={(e) =>
                  setFormData({ ...formData, oldPassword: e.target.value })
                }
              />

              <label htmlFor="newPassword" className="text-gray-600">
                รหัสผ่านใหม่:
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="กรอกรหัสผ่านใหม่"
                className="w-96 max-w-xs p-2 mt-1 border border-gray-300 rounded"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
              />

              <label htmlFor="confirmPassword" className="text-gray-600 mt-3">
                ยืนยันรหัสผ่าน:
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="ยืนยันรหัสผ่าน"
                className="w-96 max-w-xs p-2 mt-1 border border-gray-300 rounded"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />

              <button
                onClick={handleUpdatePassword}
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
              >
                บันทึกรหัสผ่าน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
}

export default editprofile;