import React, { useContext } from "react";
import StudentRoute from '../../components/Routes/StudentRoute'
import { useState, useEffect } from "react";
import { Link, User, Avatar } from "@nextui-org/react";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import Resizer from "react-image-file-resizer"
import { Input, Button, ButtonGroup } from "@nextui-org/react";
import { IoIosEyeOff, IoMdClose, IoMdEye } from "react-icons/io";
import { Context } from "../../context/";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { FaCloudUploadAlt, FaPen } from "react-icons/fa";
import { AiOutlineLeft } from "react-icons/ai";


function editprofile() {
  const [open, setOpen] = useState(true);

  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibilityOld = () => setIsVisibleOld(!isVisibleOld);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);


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
      // Trim the input values to remove any leading/trailing whitespace
      const trimmedFirstName = userData.firstName.trim();
      const trimmedLastName = userData.lastName.trim();

      // Check if the trimmed values are empty
      if (!trimmedFirstName || !trimmedLastName) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/updateProfile/${userData._id}`, {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        image,
      });
      console.log("Updated Data:", data);
      setUserData(data);
      toast.success("แก้ไขข้อมูลสำเร็จ");
      router.push('/teacher/home');
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
    <StudentRoute>
      <div className="pl-5 flex items-center text-black  w-96 md:w-96 h-12  border-none pt-10">
        <button
          onClick={() => router.push("/teacher/home")}
          className=" text-lg"
        >
          <AiOutlineLeft
            size={25}
            className="inline-block align-text-bottom mx-2"
          />
          ย้อนกลับ
        </button>
      </div>
      <div className="mx-auto  max-w-screen-lg w-full px-4 pt-2 pb-20 space-y-12">

        {/* <pre>{JSON.stringify(userData, null, 4)}</pre> */}
        <h1 className="text-2xl font-semibold mt-5">แก้ไขข้อมูลส่วนตัว</h1>
        <div className="bg-gray-100 min-h-max rounded-xl p-5">
          <div className="xl:flex gap-10 place-content-center md:block">
            <div class="flex justify-center">
              <label class="flex flex-col items-center cursor-pointer rounded-md p-2 focus:outline-none transition">
                {preview ? (
                  <Avatar src={preview} className="w-32 h-32 md:w-52 md:h-52 text-lg" />
                ) : (
                  <Avatar src={userData.image ? userData.image.Location : '/profile.png'} className="w-32 h-32 md:w-52 md:h-52 text-lg" />
                )}

                <div class="flex flex-col items-center mt-2">
                  <input type="file" name="image" accept="image/*" onChange={handleImage} hidden />
                  <p class="text-sm md:text-lg">อัพโหลดรูปโปรไฟล์</p>
                </div>
              </label>
            </div>


            <div className="flex flex-col  space-y-3 bg-white w-full p-10 rounded-lg shadow-md">

              <Input
                type="text"
                id="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="กรุณากรอกชื่อ"
                label="ชื่อ"
                variant="bordered"
                size="lg"
              />

              <Input
                type="text"
                id="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="กรุณากรอกนามสกุล"
                label="นามสกุล"
                variant="bordered"
                size="lg"
              />


              <Input
                isDisabled
                type="username"
                value={userData.username}
                label="รหัสผู่สอน"
                variant="bordered"
                size="lg"
              />

              <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <Button
                  onClick={handleOpenModal}
                  color="warning"
                  variant="bordered"
                  size="md"
                  className="px-4"
                >
                  เปลี่ยนรหัสผ่าน
                </Button>
                <Button
                  color="primary"
                  size="md"
                  className="px-6"
                  variant="shadow"
                  isLoading={userData.loading}
                  onClick={handleUpdateProfile}
                >
                  {userData.loading ? 'กำลังโหลด...' : 'บันทึกข้อมูล'}
                </Button>
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
              <p className="text-lg" >กรุณาเปลี่ยนรหัสผ่าน</p>

              {/* ฟอร์มเปลี่ยนรหัสผ่าน */}

              <div className="flex flex-col space-y-4 items-center mt-4 ">

                <Input
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  label="รหัสผ่านเก่า"
                  variant="bordered"
                  placeholder="กรอกรหัสผ่านเก่า"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityOld}>
                      {isVisibleOld ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleOld ? "text" : "password"}
                  className="max-w-xs"
                />

                <Input
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  label="รหัสผ่านใหม่"
                  variant="bordered"
                  placeholder="กรอกรหัสผ่านใหม่"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityNew}>
                      {isVisibleNew ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleNew ? "text" : "password"}
                  className="max-w-xs"
                />

                <Input
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  label="รหัสผ่านยืนยัน"
                  variant="bordered"
                  placeholder="กรอกรหัสผ่านยืนยัน"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                      {isVisibleConfirm ? (
                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleConfirm ? "text" : "password"}
                  className="max-w-xs"
                />

                <Button
                  color="primary"
                  size="md"
                  className="px-6"
                  variant="shadow"
                  onClick={handleUpdatePassword}
                >
                  บันทึกรหัสผ่าน
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentRoute>
  );
}

export default editprofile;