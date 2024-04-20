import React, { useState } from 'react'
import TeacherRoute from '../../../../../components/Routes/TeacherRoute';
import { Input, Listbox, ListboxItem, ListboxSection, Switch } from "@nextui-org/react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineMenu } from 'react-icons/ai';
import { BsBlockquoteRight, BsFileCodeFill, BsFileEarmarkTextFill, BsYoutube } from 'react-icons/bs';
import { useRouter } from 'next/router';
import ContentLesson from '../../../../../components/form/ContentLesson';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateContentLesson = () => {
  const router = useRouter();
  const { id, courseYear } = router.query;

  const [status, setStatus] = useState(true);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const [values, setValues] = useState({
    lessonName: '',
  })

  const [selectedType, setSelectedType] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [contentLessons, setContentLessons] = useState([]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    // Check if the selected type is different from the deleted section's type
    if (type !== activeType) {
      setActiveType(type); // Set the active content type
    }
    addContentLessons(type);
  };

  const addContentLessons = (type) => {
    let newLessons;
    if (type === "article") {
      newLessons = { type: "article", article: "" };
    } else {
      newLessons = { type: type, file: null };
    }
    setContentLessons([...contentLessons, newLessons]);
  };


  const handleArticleChange = (content, index) => {
    setContentLessons((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].article = content;
      updatedSections[index].fontSize = '20px'; // Set the desired font size here
      return updatedSections;
    });
  }

  const handleCodeChange = (code, index) => {
    setContentLessons((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].code = code;
      return updatedSections;
    });
  };

  const handleVideoChange = (video, index) => {
    setContentLessons((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].video = video;
      return updatedSections;
    });
  };

  const handleExerciseChange = (field, value, index) => {
    setContentLessons((prevLessons) => {
      return prevLessons.map((lesson, idx) => {
        if (idx === index && lesson.type === 'exercise') {
          return {
            ...lesson,
            [field]: value
          };
        }
        return lesson;
      });
    });
  };

  const handleAnswerChange = (value, lessonIndex, answerIndex) => {
    setContentLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      updatedLessons[lessonIndex].answers[answerIndex].text = value;
      return updatedLessons;
    });
  };


  const handleCorrectAnswerChange = (isChecked, lessonIndex, answerIndex) => {
    setContentLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      // Update the isCorrect property for the specified answer
      updatedLessons[lessonIndex].answers[answerIndex].isCorrect = isChecked;
      return updatedLessons;
    });
  };

  const addAnswer = (lessonIndex) => {
    setContentLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      if (!updatedLessons[lessonIndex].answers) {
        updatedLessons[lessonIndex].answers = [];
      }
      updatedLessons[lessonIndex].answers.push({ text: '' });
      return updatedLessons;
    });
  };

  const removeAnswer = (lessonIndex, answerIndex) => {
    setContentLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      updatedLessons[lessonIndex].answers.splice(answerIndex, 1);
      return updatedLessons;
    });
  };

  const handleChangeStatus = (e) => {
    const newStatus = e.target.checked;
    setStatus(newStatus);
    console.log(newStatus);
  };

  const moveContentUp = (index) => {
    if (index > 0) {
      setContentLessons((prevSections) => {
        const updatedSections = [...prevSections];
        [updatedSections[index], updatedSections[index - 1]] = [updatedSections[index - 1], updatedSections[index]];
        return updatedSections;
      });
    }
  };

  const moveContentDown = (index) => {
    setContentLessons((prevSections) => {
      if (index < prevSections.length - 1) {
        const updatedSections = [...prevSections];
        [updatedSections[index], updatedSections[index + 1]] = [updatedSections[index + 1], updatedSections[index]];
        return updatedSections;
      }
      return prevSections;
    });
  };

  const deleteContent = (index) => {
    setContentLessons((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections.splice(index, 1);
      return updatedSections;
    });
  };


  const handleAddContentLesson = async () => {
    // Validate lesson name
    if (!values.lessonName.trim()) {
      toast.error('กรุณากรอกชื่อเนื้อหาบทเรียน');
      return;
    }

    // Ensure there is at least one content lesson
    if (contentLessons.length < 1) {
      toast.error('กรุณาเพิ่มเนื้อหาบทเรียนอย่างน้อยหนึ่งรายการ');
      return;
    }

    // Validate content sections
    for (const lesson of contentLessons) {
      switch (lesson.type) {
        case 'article':
          if (!lesson.article.trim()) {
            toast.error('กรุณากรอกเนื้อหาบทความ');
            return;
          }
          break;
        case 'video':
          if (!lesson.video || !lesson.video.trim()) {
            toast.error('กรุณาใส่ URL วิดีโอ');
            return;
          }

          break;
        case 'code':
          if (!lesson.code || !lesson.code.trim()) {
            toast.error('กรุณาใส่โค้ดตัวอย่าง');
            return;
          }
          break;
        case 'exercise':
          if (!lesson.questionText || !lesson.questionText.trim()) {
            toast.error('กรุณากรอกคำถามแบบฝึกหัด');
            return;
          }
          if (!lesson.answers || lesson.answers.length === 0 || lesson.answers.some(answer => !answer.text.trim())) {
            toast.error('กรุณาใส่คำตอบสำหรับแบบฝึกหัด');
            return;
          }
          if (!lesson.answers.some(answer => answer.isCorrect)) {
            toast.error('กรุณาเลือกคำตอบที่ถูกต้องอย่างน้อยหนึ่งคำตอบ');
            return;
          }
          break;
        default:
          break;
      }
    }

    // Proceed with submission if validation passes
    try {
      const lessons = {
        lessonName: values.lessonName,
        contents: contentLessons.map((lesson) => {
          const { type, article, video, code, questionText, answers } = lesson;

          if (type === 'exercise') {
            return {
              type,
              exercise: {
                questionText: questionText || '',
                answers: answers.map(answer => ({
                  answerText: answer.text || '',
                  isCorrect: answer.isCorrect || false
                }))
              },
            };
          }

          return {
            type,
            article: type === 'article' ? article || '' : undefined,
            video: type === 'video' ? video : undefined,
            code: type === 'code' ? code || '' : undefined,
          };
        }),
        published: status
      };

      const formData = {
        sectionId: id,
        lessons: lessons,
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/section/addContentLesson`, formData);

      toast.success('เพิ่มเนื้อหาบทเรียนสำเร็จ');
      router.push(`/teacher/course/lesson/${courseYear}`)
    } catch (error) {
      console.error("Error adding content lesson:", error);
    }
  };


  return (
    <TeacherRoute>
      <div className="flex min-h-screen bg-white">
        <div class="fixed w-full flex items-center justify-between h-14 text-white z-10">
          <div class="flex-1 flex items-center h-16   bg-white w-full border-b border-gray-300">
            <div className="flex items-center ml-4">
              <span
                className="text-white text-4xl top-5 left-4 cursor-pointer"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  ""
                ) : (
                  <div className=" text-black p-2 hover:bg-gray-100 rounded">
                    <AiOutlineMenu size={23} />
                  </div>
                )}
              </span>
            </div>
            <div className="flex space-x-4 ml-auto mr-4">
              <button class="flex space-x-2 border-2 border-blue-500 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                แบบร่าง
                <div className="ml-2 form-check flex items-center justify-center form-switch">
                  <Switch onChange={(e) => handleChangeStatus(e)} size='sm' defaultSelected aria-label="Automatic updates" />
                </div>
              </button>
              {/* <button class="flex items-center space-x-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                ตัวอย่าง
              </button> */}
            </div>
          </div>

          {/* sidebar */}
          <div
            className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-96 overflow-y-auto bg-white border-r-2 ${isSidebarOpen ? '' : 'hidden 2xl:block'
              }`}
          >
            <div class="flex items-center text-black  w-96 md:w-96 h-16  border-none">
              <button
                onClick={() => router.push(`/teacher/course/lesson/${courseYear}`)}
                className=" text-lg"
              >
                <AiOutlineLeft size={25} className="inline-block align-text-bottom mx-2" />
                ย้อนกลับ
              </button>
            </div>
            <AiOutlineClose color='black' className="text-3xl mr-2 mt-2 cursor-pointer ml-auto 2xl:hidden" onClick={toggleSidebar} />

            <div className="flex flex-col">
              <div className="mt-4 px-4 text-black">
                <Listbox variant="faded" aria-label="Listbox menu with descriptions">
                  <ListboxSection
                    title={
                      <div className='flex flex-col  text-lg' >
                        <p className="text-xl text-black font-semibold" >ประเภทเนื้อหาบทเรียน</p>
                        <p className="text-gray-500 mb-3">เลือกเนื้อหาด้านล่างแล้วคลิกเพื่อเขียนบทเรียนตามที่คุณต้องการ</p>
                      </div>
                    }  >
                    <ListboxItem
                      onClick={() => handleTypeSelect("video")}
                      className='py-2 mb-1'
                      key="new"
                      description={
                        <p className="text-sm text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาวิดีโอจาก Youtube</p>
                      }
                      startContent={
                        <div className="bg-danger/10 text-danger p-2 rounded-md">
                          <BsYoutube
                            className="text-danger"
                            size={35}
                          />
                        </div>

                      }
                    >
                      <p className="font-medium text-black truncate">วิดีโอ</p>
                    </ListboxItem>
                    <ListboxItem
                      onClick={() => handleTypeSelect("article")}

                      className='py-2 mb-1'
                      key="copy"
                      description={
                        <p className="text-sm  text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาบทเรียนจากบทความ</p>
                      }
                      startContent={
                        <div className="bg-success/10 text-success p-2 rounded-md">
                          <BsFileEarmarkTextFill
                            className='text-success'
                            size={35}
                          />
                        </div>

                      }
                    >
                      <p className="font-medium text-black truncate">บทความ</p>
                    </ListboxItem>
                    <ListboxItem
                      onClick={() => handleTypeSelect("code")}
                      className='py-2 mb-1'
                      key="edit"
                      showDivider
                      description={
                        <p className="text-sm   text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาตัวอย่างโค้ด</p>
                      }
                      startContent={
                        <div className="bg-secondary/10 text-secondary p-2 rounded-md">
                          <BsFileCodeFill
                            className='text-secondary'
                            size={35}
                          />
                        </div>
                      }
                    >
                      <p className="font-medium text-black truncate">โค้ด</p>
                    </ListboxItem>
                  </ListboxSection>

                  <ListboxSection title={
                    <div className='flex flex-col  text-lg' >
                      <p className="text-xl text-black font-semibold" >แบบฝึกหัด</p>
                      <p className="text-gray-500 mb-3">เพิ่มแบบฝึกหัด เพื่อวัดความเข้าใจเนื้อหาบทเรียนของนักเรียน</p>
                    </div>
                  }  >
                    <ListboxItem
                      onClick={() => handleTypeSelect("exercise")}
                      className='py-2 mb-1'
                      key="delete"
                      color="danger"
                      description={
                        <p className="text-sm text-gray-500 leading truncate">คลิกเพื่อเพิ่มเนื้อหาตัวอย่างโค้ด</p>
                      }
                      startContent={
                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                          <BsBlockquoteRight
                            className='text-primary'
                            size={35}
                          />
                        </div>
                      }
                    >
                      <p className="font-medium text-black truncate">แบบฝึกหัด</p>
                    </ListboxItem>
                  </ListboxSection >
                </Listbox>

              </div>
            </div>
          </div>
        </div>
        <div className={`flex-grow ml-1/4`} style={{ paddingLeft: isSidebarOpen ? '20%' : 0 }}>
          <div class=" flex-grow h-full  mt-20 mb-10">
            {/* content */}
            <ContentLesson
              values={values}
              setValues={setValues}
              contentLessons={contentLessons}
              handleArticleChange={handleArticleChange}
              handleCodeChange={handleCodeChange}
              handleVideoChange={handleVideoChange}
              handleExerciseChange={handleExerciseChange}
              handleAddContentLesson={handleAddContentLesson}
              handleAnswerChange={handleAnswerChange}
              addAnswer={addAnswer}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              removeAnswer={removeAnswer}
              moveContentUp={moveContentUp}
              moveContentDown={moveContentDown}
              deleteContent={deleteContent}
            />
          </div>
        </div>
      </div>
    </TeacherRoute>
  )
}

export default CreateContentLesson
