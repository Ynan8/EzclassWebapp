import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineArrowLeft, AiOutlineLeft } from 'react-icons/ai'
import { FaCloudUploadAlt, FaCloudUploadAltUploadAlt, FaPlus } from 'react-icons/fa'
import { Button, Input, Select, SelectItem, } from "@nextui-org/react";
import dynamic from 'next/dynamic'


const createAssignment = () => {
  const [values, setValues] = useState({
    assignmentName: '',
    assignmentDetail: '',
    assignmentDue: '',
    weight: '',
    loading: false,
  })


  const router = useRouter();

  const { id, courseYear } = router.query;


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const [assignmentFile, setAssignmentFile] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const [progressFile, setProgressFile] = useState(0);
  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('เพิ่มไฟล์งาน');

  const handleAssignmentFile = async (e) => {
    try {
      const assignmentFile = e.target.files[0];

      if (assignmentFile) {
        setUploadButtonText(assignmentFile.name); // Update the button text
        setOriginalFileName(assignmentFile.name)
        setValues({ ...values, loading: true });

        const FileData = new FormData();
        FileData.append("assignmentFile", assignmentFile);

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/assignmentFile-upload`, FileData, {
          onUploadProgress: (e) => {
            setProgressFile(Math.round((100 * e.loaded) / e.total));
          },
        });

        setAssignmentFile(data);
        setValues({ ...values, loading: false });
      }
    } catch (err) {
      setValues({ ...values, loading: false });
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setValues({ ...values, loading: true });

      let assignmentData = {
        ...values,
        assignmentFile: assignmentFile ? {
          originalName: originalFileName,
          location: assignmentFile.Location,
          bucket: assignmentFile.Bucket,
          key: assignmentFile.Key,
        } : null,
      };

      const formData = {
        sectionId: id,
        assignments: assignmentData,
        selectedCourseRooms: selectedCourseRooms,
      };

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/assignment`, formData);
      toast.success('มอบหมายงานสำเร็จ');
      router.push(`/teacher/course/lesson/${courseYear}`);
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถมอบหมายงานได้');
    } finally {
      setValues({ ...values, loading: false });
    }
  };


  // select corse room
  const [selectedCourseRooms, setSelectedCourseRooms] = useState([]);


  const handleCourseRoomSelect = (value) => {
    // Check if the value is already selected, if so, remove it from the array
    if (selectedCourseRooms.includes(value)) {
      setSelectedCourseRooms(selectedCourseRooms.filter((selectedValue) => selectedValue !== value));
    } else {
      // If the value is not selected, add it to the array
      setSelectedCourseRooms([...selectedCourseRooms, value]);
    }
  };

  const handleSelectRoomChange = (value) => {
    console.log(`selected ${value}`);
  }

  //button upload
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Handle additional logic if needed
  };

  const handleUploadButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };

  // Show Course Room
  const [courseRoom, setCourseRoom] = useState([])
  useEffect(() => {
    loadCourseRoom()
  }, [courseYear])

  const loadCourseRoom = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoom/${courseYear}`);
      setCourseRoom(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const options = courseRoom.map(room => ({
    value: room._id,
    label: room.roomName,
  }));

  return (
    <div>

      <div className="flex-1 flex items-center h-16   bg-white w-full border-b border-gray-300">
        <button
          onClick={() => router.push(`/teacher/course/lesson/${courseYear}`)}
          className=" text-lg"
        >
          <AiOutlineLeft size={25} className="inline-block align-text-bottom mx-2" />
          ย้อนกลับ
        </button>
      </div>
      <div className="mx-auto max-w-screen-lg px-4 pt-6 pb-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold">มอบหมายงาน</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <label className=" block text-base font-medium text-[#07074D]">
            ชื่องาน
            <span className="text-red-400 ml-[2px]">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                isRequired
                variant='bordered'
                type="text"
                name="assignmentName"
                value={values.assignmentName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 ">
          <label className=" block text-base font-medium text-[#07074D]">
            รายละเอียดงาน
            <span className="text-red-400 ml-[2px]">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                type="text"
                name="assignmentDetail"
                value={values.assignmentDetail}
                onChange={handleChange}
                cols="7"
                rows="7"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />

            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          <div className="flex flex-col space-y-1">
            <label className="block text-base font-medium text-[#07074D]">
              กำหนดส่ง
              <span className="text-red-400 ml-[2px]">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  isRequired
                  variant='bordered'
                  name="assignmentDue"
                  value={values.assignmentDue}
                  onChange={handleChange}
                  type="datetime-local"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="block text-base font-medium text-[#07074D]">
              ห้องเรียน
              <span className="text-red-400 ml-[2px]">*</span>
            </label>
            <div className="flex flex-col mt-1 w-full md:w-auto">
              <Select
                placeholder="เลือกห้องเรียน"
                selectionMode='multiple'
                variant="bordered"
              >
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    selected={selectedCourseRooms.includes(option.value)} // Mark the item as selected if it's in the selectedCourseRooms array
                    onClick={() => handleCourseRoomSelect(option.value)} // Handle selection and deselection
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="block text-base font-medium text-[#07074D]">
              สัดส่วนคะแนน(เปอร์เซ็น)
              <span className="text-red-400 ml-[2px]">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  isRequired
                  variant='bordered'
                  type="number"
                  name='weight'
                  value={values.weight}
                  onChange={(e) => {
                    const newValue = Math.max(1, parseInt(e.target.value, 10));
                    handleChange({ target: { name: 'weight', value: newValue } });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="block text-base font-medium text-[#07074D]">
              คะแนนเต็ม
              <span className="text-red-400 ml-[2px]">*</span>
            </label>
            <Input
              isRequired
              variant='bordered'
              type="number"
              name='scoreLimit'
              value={values.scoreLimit}
              onChange={(e) => {
                const newValue = Math.max(1, parseInt(e.target.value, 10));
                handleChange({ target: { name: 'scoreLimit', value: newValue } });
              }}

            />
          </div>
        </div>
        <div className="flex flex-col justify-center  space-y-1">
          <div className="flex items-center">
            <Button
              color="default"
              variant="bordered"
              startContent={<FaCloudUploadAlt size={25} />}
              onClick={handleUploadButtonClick}
            >
              {uploadButtonText}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAssignmentFile}
            />
          </div>

        </div>
        <div className=" flex items-center justify-end w-full  mt-6">
          <Button
            size="lg"
            onClick={handleSubmit}
            color="primary"
            isLoading={values.loading}
          >
            {values.loading ? "กำลังโหลด..." : "บันทึก"}
          </Button>

        </div>
      </div >
    </div >
  )
}

export default createAssignment