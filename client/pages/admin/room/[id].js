import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Avatar, AvatarGroup, AvatarIcon, BreadcrumbItem, Breadcrumbs, Pagination } from "@nextui-org/react";
// import CardBarChartRoom from "../../components/Card/CardbarChartRoom";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import HeaderBarAdmin from "../../../components/HeaderBar/HeaderBarAdmin";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import AverageScoreRoom from '../../../components/Charts/AverageScoreRoom';



const RoomDetail = () => {

  // Show Course Year
  const router = useRouter();
  const { id } = router.query;

  // Load CourseRoom
  const [courseRoomSingle, setCourseRoomSingle] = useState({});


  useEffect(() => {
    if (id) {
      loadCourseRoom();
    }
  }, [id]);


  const loadCourseRoom = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomSingle/${id}`);
        setCourseRoomSingle(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  const courseYearId = courseRoomSingle.courseYearId;


  // Show Course Year
  const [courseYear, setCourseYear] = useState({});

  useEffect(() => {
    if (courseYearId) {
      loadCourseYear();
      loadAverageScores();
    }
  }, [courseYearId]);

  const loadCourseYear = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${courseYearId}`);
      const firstElement = data && data.length > 0 ? data[0] : {};
      setCourseYear(firstElement);
      if (firstElement.courseId) {
        loadAverageScores(); // Load average scores
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };


  const courseId = courseYear.courseId;

  const [course, setCourse] = useState({});


  useEffect(() => {
    if (id) {
      loadCourse();
    }
  }, [courseId]);


  const loadCourse = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
        setCourse(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  const [quizScoreRoom, setQuizScoreRoom] = useState([]);

  useEffect(() => {
    loadQuizScoreRoom();
  }, [id]);

  const loadQuizScoreRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }

      const { data: quizScores } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quizScoreRoom/${id}`);

      // Fetch additional information for each quiz score
      const quizScoresWithData = await Promise.all(quizScores.map(async (quizScore) => {
        const [userResponse, sectionResponse, quizResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API}/user/${quizScore.studentId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/section/${quizScore.sectionId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/${quizScore.quizId}`) // Add this line to fetch the quiz data
        ]);
        const maxScore = quizResponse.data.questions.reduce((total, currentQuestion) => {
          return total + currentQuestion.score;
        }, 0);
        return {
          ...quizScore,
          studentName: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
          sectionName: sectionResponse.data.sectionName,
          quizName: quizResponse.data.quizName,
          maxScore: maxScore,
        };
      }));

      setQuizScoreRoom(quizScoresWithData);
    } catch (error) {
      console.error('Error loading quiz score:', error);
    }
  };

  const [averageScoresRoom, setAverageScoresRoom] = useState([]);

  const loadAverageScores = async () => {
    try {
      // Use the proper variable names for courseYearId and id (courseRoomId) as they are in your component's state
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/average-scores-room/${courseYearId}/${id}`);
      setAverageScoresRoom(data);
    } catch (error) {
      console.error('Error loading average scores:', error);
    }
  };

  const quizzes = quizScoreRoom.reduce((acc, item) => {
    if (!acc.some(quiz => quiz.quizId === item.quizId)) {
      acc.push({ quizName: item.quizName, maxScore: item.maxScore, quizId: item.quizId });
    }
    return acc;
  }, []);





  const highestScoresByStudent = quizScoreRoom.reduce((acc, current) => {
    const existing = acc.find(item => item.studentId === current.studentId);
    if (existing) {
      if (current.score > existing.score) {
        existing.score = current.score;
      }
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);

  const scoresByStudent = quizScoreRoom.reduce((acc, current) => {
    acc[current.studentId] = acc[current.studentId] || [];
    acc[current.studentId].push(current.score);
    return acc;
  }, {});

  const highestAndAverageScoresByStudent = Object.entries(scoresByStudent).map(([studentId, scores]) => {
    const highestScore = Math.max(...scores);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const student = quizScoreRoom.find(score => score.studentId === studentId);
    return {
      studentId,
      studentName: student.studentName,
      highestScore,
      averageScore,
    };
  });



  const [student, setStudent] = useState([]);
  const loadStudentCourse = async () => {
    if (id) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/studentRoom/${id}`);
        setStudent(data)
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadStudentCourse();
    }
  }, [id]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(student.length / itemsPerPage);

  const highestScoresByStudentAndQuiz = quizScoreRoom.reduce((acc, current) => {
    const key = `${current.studentId}-${current.quizId}`;
    if (!acc[key] || current.score > acc[key].score) {
      acc[key] = { ...current };
    }
    return acc;
  }, {});

  const highestAverageScore = highestAndAverageScoresByStudent.reduce((max, score) => Math.max(max, score.averageScore), 0);
  const studentWithHighestAverageScore = highestAndAverageScoresByStudent.find(score => score.averageScore === highestAverageScore);






  return (
    <>
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-black dark:text-white">
        <HeaderBarAdmin />
        <div class="h-full mt-20">
          {/* Breadcrumb */}
          <div className="px-6 sm:px-20 md:px-16 lg:px-24 mb-4">
            {/* Breadcrumbs */}
            <Breadcrumbs size="lg">
              <BreadcrumbItem
                href="/admin/home"
                style={{ cursor: "pointer", color: "black" }}
              >
                หน้าหลัก
              </BreadcrumbItem>
              <BreadcrumbItem style={{ color: "blue" }}>
                {course.courseName}
              </BreadcrumbItem>
              <BreadcrumbItem style={{ color: "blue" }}>
                {courseRoomSingle.roomName}
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="pl-20 flex items-center text-black  w-96 md:w-96 h-12  border-none pt-4">
            <button
              onClick={() => router.push("/admin/home")}
              className=" text-lg"
            >
              <AiOutlineLeft
                size={25}
                className="inline-block align-text-bottom mx-2"
              />
              ย้อนกลับ
            </button>
          </div>
          <div className=" flex flex-col flex-grow mx-auto container">
            <div className="flex flex-wrap justify-center ">
              <div className="flex w-full flex-col ">
                {/* chart */}
                <div className="px-12 w-full ">
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                      <div className="flex items-center p-4 bg-white shadow-md shadow-purple-500/50 rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-4">
                          <HiOutlineUserGroup size={30} />
                        </div>
                        <div className='flex flex-col space-y-1'>
                          <span className="block text-2xl font-semibold">{student.length}</span>
                          <span className="block text-gray-500">นักเรียนทั้งหมด</span>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white shadow-md shadow-yellow-500/50 rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-500 bg-yellow-100 rounded-full mr-4">
                          <FaTrophy size={30} />
                        </div>

                        <div className='flex flex-col space-y-1'>
                          <span className="block text-2xl font-semibold">
                            {studentWithHighestAverageScore ? `${studentWithHighestAverageScore.studentName}` : 'ยังไม่มีนักเรียนทำแบบทดสอบ'}
                          </span>
                          <span className="block text-gray-500">นักเรียนที่ได้คะแนนสูงสุด</span>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center flex-wrap ">
                    <AverageScoreRoom
                      averageScoresRoom={averageScoresRoom}
                    />
                  </div>
                  <div>
                  </div>
                  <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="table-container max-w-800 overflow-x-auto">
                      <table className="w-full border-b border-gray-200">
                        <thead>
                          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                            <td className="py-4 px-4 text-center font-bold">ลำดับ</td>
                            <td className="py-4 px-4 text-center font-bold">ชื่อ - สกุล</td>
                            <td className="py-4 px-4 text-center font-bold">คะแนนเฉลี่ยรวม</td>
                            {quizzes.map((quiz, index) => (
                              <td key={index} className="py-4 px-4 text-center">
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <span className="text-center font-bold">{quiz.quizName}</span>
                                  <button className="text-center">คะแนนเต็ม {quiz.maxScore}</button>
                                </div>
                              </td>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {student
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((student, index) => {
                              const matchingAverageScore = highestAndAverageScoresByStudent.find(
                                (score) => score.studentId === student._id
                              );
                              return (
                                <tr key={student._id} className="hover:bg-gray-100 transition-colors group">
                                  <td className="text-center py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                  <td className="text-center">{student.firstName} {student.lastName}</td>
                                  <td className="text-center">
                                    {matchingAverageScore ? (
                                      <>
                                        <span className="font-bold">{matchingAverageScore.averageScore.toFixed(2)} คะแนน</span>
                                      </>
                                    ) : (
                                      "ยังไม่ทำแบบทดสอบ"
                                    )}
                                  </td>
                                  {/* Render score cells */}
                                  {quizzes.map(quiz => {
                                    const scoreKey = `${student._id}-${quiz.quizId}`;
                                    const scoreData = highestScoresByStudentAndQuiz[scoreKey];
                                    return (
                                      <td key={quiz.quizId} className="text-center">
                                        {scoreData ? (
                                          <span className="font-bold">{scoreData.score} คะแนน(ทำได้มากที่สุด)</span>
                                        ) : (
                                          "ยังไม่ทำแบบทดสอบ"
                                        )}
                                      </td>
                                    );
                                  })}

                                </tr>
                              );
                            })}
                        </tbody>
                      </table>

                      <div className="flex justify-center mt-2">
                        <Pagination
                          size='lg'
                          total={totalPages}
                          initialPage={1}
                          page={currentPage}
                          onChange={(page) => setCurrentPage(page)}
                        />

                      </div>

                      <div className="flex flex-col text-center mt-4">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;