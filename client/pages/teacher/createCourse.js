import React, { useRef, useState } from 'react'
import CourseCreateForm from '../../components/Form/CourseCreateForm'
import Link from 'next/link'
import { AiOutlineArrowLeft } from "react-icons/ai";


const createCourse = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [values, setValues] = useState({
        courseNo: '',
        courseName: '',
        detail: '',
        level: '',
        uploading: false,
        loading: false,
    });

    const [characterCounts, setCharacterCounts] = useState({
        courseName: 0,
        detail: 0,
    });

    
    
    const handleLevelChange = (event) => {
        const level = event.target.value;
        setSelectedLevel(level);
        
        // Update the values state with the selected level
        setValues({
            ...values,
            level: level,
        });
    };
    

    // select level
    const levels = [
        { label: "มัธยมศึกษาปีที่ 1", value: "1" },
        { label: "มัธยมศึกษาปีที่ 2", value: "2" },
        { label: "มัธยมศึกษาปีที่ 3", value: "3" },
        { label: "มัธยมศึกษาปีที่ 4", value: "4" },
        { label: "มัธยมศึกษาปีที่ 5", value: "5" },
        { label: "มัธยมศึกษาปีที่ 6", value: "6" },
    ];

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



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'courseName' && value.length > 100) {
            return;
        }

        if (name === 'detail' && value.length > 200) {
            return;
        }

        if (name === 'courseNo' && value.length > 20) {
            return;
        }

        else {
            setValues({
                ...values,
                [name]: value,
            });

            setCharacterCounts({
                ...characterCounts,
                [name]: value.length,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("VALUES >>>", values)
        // try {
        //     const { data } = await axios.post('/api/course', {
        //         ...values,
        //         image,
        //     });
        //     toast.success('สร้างรายวิชาสำเร็จ');
        //     router.push("/teacher/home");
        // } catch (err) {
        //     toast.error(err.response.data);
        // }
    };


    return (
        <div>
            <Link href={"/teacher/home"} >
                <div className="p-2 m-2 w-20">
                    <AiOutlineArrowLeft size={30} />
                </div>
            </Link>
            <div className="mx-auto max-w-screen-lg px-4 pt-2 pb-20 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-medium">สร้างรายวิชา </h1>
                </div>
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    levels={levels}
                    handleUploadButtonClick={handleUploadButtonClick}
                    fileInputRef={fileInputRef}
                    handleFileInputChange={handleFileInputChange}
                    handleLevelChange={handleLevelChange}
                />
            </div>
        </div>
    )
}

export default createCourse