import axios from 'axios';
import StudentRoute from '../../../../../components/Routes/StudentRoute';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../../components/LessonStudentView/Sidebar';
import LessonContent from '../../../../../components/LessonStudentView/LessonContent';
import QuizContent from '../../../../../components/LessonStudentView/QuizContent';
import Headerbar from '../../../../../components/LessonStudentView/Headerbar';
import toast from 'react-hot-toast';
import SideBarStudent from '../../../../../components/Sidebar/SideBarStudent';
import HeaderBarStd from '../../../../../components/HeaderBar/HeaderBarStd';

const LessonView = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  const [currentLessonIndex, setCurrentLessonIndex] = useState(null);

  // Load course 
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);


  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadCourse();
      loadCourseYearId();
      loadCourseRoom();
    }
  }, [id]);

  const loadCourse = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
        setCourse(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }


  // Get course Year Id
  const [courseYearId, setCourseYearId] = useState()
  const loadCourseYearId = async () => {
    if (id) {

      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseYearId/${id}`);
        setCourseYearId(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  // Get course Room 
  const [courseRoom, setCourseRoom] = useState()
  const loadCourseRoom = async () => {
    if (id) {

      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseRoomId/${id}`);
        setCourseRoom(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }



  // Show section
  useEffect(() => {
    if (id) {
      loadSection();
    }
  }, [course, courseYearId]);

  const [section, setSection] = useState([])
  const loadSection = async () => {
    if (id) {
      try {
        const { data: sections } = await axios.get(`${process.env.NEXT_PUBLIC_API}/section`, {
          params: {
            courseYearId: courseYearId,
          },
        });

        // Fetch lesson and quiz data for each section
        const sectionsWithData = await Promise.all(
          sections.map(async (section) => {
            const lessonData = await Promise.all(
              section.lesson.map(async (lessonId) => {
                try {
                  const { data: lesson } = await axios.get(`${process.env.NEXT_PUBLIC_API}/lesson/${lessonId}`);
                  return lesson;
                } catch (error) {
                  console.error('Error loading lesson:', error);
                  return null;
                }
              })
            );

            const quizData = await Promise.all(
              section.quiz.map(async (quizId) => {
                try {
                  const { data: quiz } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quiz/${quizId}`);
                  return quiz;
                } catch (error) {
                  console.error('Error loading quiz:', error);
                  return null;
                }
              })
            );

            return { ...section, lessonData, quizData };
          })
        );

        setSection(sectionsWithData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading sections:', error);
        setLoading(false);
      }
    };
  }


  // toggle 
  const [openToggles, setOpenToggles] = useState([]);

  const toggle = (index) => {
    if (openToggles.includes(index)) {
      setOpenToggles(openToggles.filter(item => item !== index));
    } else {
      setOpenToggles([...openToggles, index]);
    }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [openSections, setOpenSections] = useState([]);
  const toggleLesson = (sectionIndex, lessonId) => {
    setOpenSections((prevOpenSections) => {
      const newOpenSections = [...prevOpenSections];
      const sectionOpenLessons = newOpenSections[sectionIndex] || [];
      const lessonIndex = sectionOpenLessons.indexOf(lessonId);

      if (lessonIndex === -1) {
        sectionOpenLessons.push(lessonId);
      } else {
        sectionOpenLessons.splice(lessonIndex, 1);
      }

      newOpenSections[sectionIndex] = sectionOpenLessons;


      return newOpenSections;
    });
  };

  const [selectedLessonContent, setSelectedLessonContent] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null); // Add this state

  const [activeLessonId, setActiveLessonId] = useState(null);

  const [isQuizContent, setIsQuizContent] = useState(false);


  useEffect(() => {
    // Check if there are sections and lessons available
    if (section && section.length > 0 && section[0].lessonData.length > 0) {
      const firstLessonId = section[0].lessonData[0]._id;
      showLessonContent(0, firstLessonId); // Assuming 0 is the index of the first section
    }
  }, [section]);

  const showLessonContent = async (sectionIndex, lessonId) => {
    try {
      // Reset the selected quiz content
      setSelectedQuizContent(null);
      setIsQuizContent(false);
      setActiveQuizId(null);
      setActiveLessonId(lessonId);

      const selectedSection = section[sectionIndex];
      const selectedLesson = selectedSection.lessonData.find((lesson) => lesson._id === lessonId);

      if (selectedLesson) {
        // Update the state with the selected lesson content, index, and section index
        setSelectedLessonContent(selectedLesson.contents);
        setCurrentLessonIndex(selectedSection.lessonData.findIndex((lesson) => lesson._id === lessonId));
        setSelectedSectionIndex(sectionIndex);
        setSelectedLesson(selectedLesson); // Set the selected lesson
      }

    } catch (error) {
      console.error('Error fetching lesson content:', error);
    }
  };

  const goToPreviousLesson = () => {
    if (selectedSectionIndex !== null) {
      const currentLessonIndex = section[selectedSectionIndex].lessonData.findIndex(
        (lesson) => lesson._id === activeLessonId
      );

      if (currentLessonIndex > 0) {
        // If there is a lesson before the current one, show it
        const previousLessonId = section[selectedSectionIndex].lessonData[currentLessonIndex - 1]._id;
        showLessonContent(selectedSectionIndex, previousLessonId);
      } else {
        // If there is no lesson before the current one, move to the previous section
        const previousSectionIndex = selectedSectionIndex - 1;
        if (previousSectionIndex >= 0) {
          const previousSection = section[previousSectionIndex];
          const lastLessonId =
            previousSection.lessonData.length > 0
              ? previousSection.lessonData[previousSection.lessonData.length - 1]._id
              : null;

          if (lastLessonId) {
            showLessonContent(previousSectionIndex, lastLessonId);
          }
        }
      }
    }
  };

  
// Check lessonId have in complete? else markCompleted working
  const goToNextLesson = (lessonId) => {
    markCompleted(lessonId);
    if (selectedSectionIndex !== null) {
      const currentLessonIndex = section[selectedSectionIndex].lessonData.findIndex(
        (lesson) => lesson._id === activeLessonId
      );
      const totalLessons = section[selectedSectionIndex].lessonData.length;
      if (currentLessonIndex < totalLessons - 1) {
        // If there is a lesson after the current one, show it
        const nextLessonId = section[selectedSectionIndex].lessonData[currentLessonIndex + 1]._id;
        showLessonContent(selectedSectionIndex, nextLessonId);
      } else {
        // If there is no lesson after the current one, move to the next section
        // goToNextLessonQuiz(lessonId);  // Modified to call goToNextLessonQuiz
        goToLessonQuiz()
      }
    }
  };

// Check lessonId have in complete? else markCompleted working
  const goToNextLessonCompleted = () => {
    if (selectedSectionIndex !== null) {
      const currentLessonIndex = section[selectedSectionIndex].lessonData.findIndex(
        (lesson) => lesson._id === activeLessonId
      );
      const totalLessons = section[selectedSectionIndex].lessonData.length;
      if (currentLessonIndex < totalLessons - 1) {
        // If there is a lesson after the current one, show it
        const nextLessonId = section[selectedSectionIndex].lessonData[currentLessonIndex + 1]._id;
        showLessonContent(selectedSectionIndex, nextLessonId);
      } else {
        // If there is no lesson after the current one, move to the next section
        // goToNextLessonQuiz(lessonId);  // Modified to call goToNextLessonQuiz
        goToLessonQuiz()
      }
    }
  };



  const [completedLessons, setCompletedLessons] = useState([]);

  const markCompleted = async (lessonId) => {
    // console.log("Send This is lesson Id", lessonId)
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['authtoken'] = token;
    }

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/mark-completed`, {
      courseId: id,
      lessonId, lessonId
    });
    setCompletedLessons([...completedLessons, lessonId]);
  }
  // complete lesson
  useEffect(() => {
    if (id) loadCompletedLessons();
  }, [id]);

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/list-completed`, {
      courseId: id
    })
    setCompletedLessons(data)
  }

  const [completedQuiz, setCompletedQuiz] = useState([]);

  const markCompletedQuiz = async (quizId) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['authtoken'] = token;
    }
     console.log("THIS IS QUIZ ID >>>", quizId)
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/mark-completedQuiz`, {
        courseId: id,
        quizId: quizId, // Pass the lessonId to the function
      });
      console.log(data);
      setCompletedQuiz([...completedQuiz, quizId]);
    } catch (error) {
      console.error('Error marking quiz as completed:', error);
    }
  };

  // complete quiz
  useEffect(() => {
    if (id) loadCompletedQuiz();
  }, [id]);


  const loadCompletedQuiz = async () => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/list-completedQuiz`, {
      courseId: id
    })
    setCompletedQuiz(data)
  }

  const [userAnswers, setUserAnswers] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState({});

  const [ExerciseAnswer, setExerciseAnswer] = useState([]);

  const handleAnswerChange = (e, contentIndex) => {
    const answerIndex = parseInt(e.target.value, 10);
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [contentIndex]: answerIndex,
    }));
  };


  const markExerciseAnswer = async (exerciseId, contentIndex) => {
    // Assuming the correct answer is stored in the `isCorrect` property of each answer
    const correctAnswerIndex = selectedLessonContent[contentIndex]?.exercise?.answers.findIndex(answer => answer.isCorrect);
    const userAnswerIndex = userAnswers[contentIndex]; // Assuming this is the index of the selected answer

    const isCorrect = correctAnswerIndex === userAnswerIndex;

    setIsAnswerCorrect((prevIsAnswerCorrect) => ({
      ...prevIsAnswerCorrect,
      [contentIndex]: isCorrect,
    }));

    if (isCorrect) {
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/mark-exercise`, {
          courseId: id,
          exerciseId: exerciseId,
        });
        console.log(data);
        setExerciseAnswer([...ExerciseAnswer, exerciseId]);
        toast.success('คำตอบถูกต้อง!');
      } catch (error) {
        console.error('Error marking exercise as completed:', error);
      }
    } else {
      // The answer is incorrect, you can handle it here
      toast.error('คำตอบไม่ถูกต้อง ลองอีกครั้ง!');
    }
  };


  // complete lesson
  useEffect(() => {
    if (id) loadExerciseAnswer();
  }, [id]);


  const loadExerciseAnswer = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['authtoken'] = token;
    }
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/list-exercise`, {
      courseId: id
    })
    setExerciseAnswer(data)
  }



  const [stdSubmit, setStdSubmit] = useState({})

  useEffect(() => {
    StdSubmitQuiz();
  }, [id]);

  const StdSubmitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/quizScore/`);
      setStdSubmit(data)
    } catch (error) {
      console.error('Error loading quiz score:', error);
    }
  };



  //Show Quiz
  const [selectedQuizContent, setSelectedQuizContent] = useState(null);
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null);

  const showQuizContent = async (sectionIndex, quizId, sectionId) => {
    try {
      // Reset the selected lesson content
      setSelectedLessonContent(null);
      setIsQuizContent(true);
      setActiveLessonId(null)
      setActiveQuizId(quizId)
      setActiveSectionId(sectionId)

      const selectedSection = section[sectionIndex];
      const selectedQuiz = selectedSection.quizData.find((quiz) => quiz._id === quizId);

      if (selectedQuiz) {
        // Update the state with the selected quiz content
        setSelectedQuizContent(selectedQuiz);
      }
    } catch (error) {
      console.error('Error fetching quiz content:', error);
    }
  };

  const goToLessonQuiz = (lessonId) => {
    if (selectedSectionIndex !== null && section[selectedSectionIndex].quizData.length > 0) {
      const currentQuizId = section[selectedSectionIndex].quizData[0]._id; // Assuming you want the first quiz

      // Call your showQuizContent function with the appropriate parameters
      showQuizContent(selectedSectionIndex, currentQuizId, section[selectedSectionIndex]._id);
    }
  };


  const goToNextLessonQuiz = (lessonId) => {
    // If there is no lesson after the current one, move to the next section
    const nextSectionIndex = selectedSectionIndex + 1;
    if (nextSectionIndex < section.length) {
      const nextSection = section[nextSectionIndex];
      const firstLessonId = nextSection.lessonData.length > 0 ? nextSection.lessonData[0]._id : null;
      if (firstLessonId) {
        showLessonContent(nextSectionIndex, firstLessonId);
      }
    }
  };

  const isLastLesson = () => {
    const totalSections = section.length;
    const totalLessonsInLastSection = section[totalSections - 1].lessonData.length;
    const lastLessonId = section[totalSections - 1].lessonData[totalLessonsInLastSection - 1]._id;

    return selectedLesson?._id === lastLessonId;
  };


  return (
    <StudentRoute>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <Sidebar
          loading={loading}
          sidebarCollapsed={sidebarCollapsed}
          id={id}
          section={section}
          openSections={openSections}
          toggleLesson={toggleLesson}
          showLessonContent={showLessonContent}
          showQuizContent={showQuizContent}
          activeLessonId={activeLessonId}
          activeQuizId={activeQuizId}
          completedLessons={completedLessons}
          completedQuiz={completedQuiz}
          course={course}
          stdSubmit={stdSubmit}
          mobileSidebarOpen={mobileSidebarOpen}

        />
        <Headerbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          handleSidebarToggle={toggleSidebar}
          id={id}
        />
        {/* <HeaderBarStd handleSidebarToggle={toggleSidebar} /> */}
        <div className="h-full mt-28 mb-10 md:ml-64">
          {/* Lesson Content */}
          <LessonContent
            selectedLessonContent={selectedLessonContent}
            selectedLesson={selectedLesson}
            toggleLesson={toggleLesson}
            goToNextLesson={goToNextLesson}
            goToNextLessonCompleted={goToNextLessonCompleted}
            goToPreviousLesson={goToPreviousLesson}
            goToLessonQuiz={goToLessonQuiz}
            ExerciseAnswer={ExerciseAnswer}
            markExerciseAnswer={markExerciseAnswer}
            handleAnswerChange={handleAnswerChange}
            isLastLesson={isLastLesson}
            markCompleted={markCompleted}
            completedLessons={completedLessons }
          />
          {/* Content Quiz */}
          {selectedQuizContent !== null && (
            <QuizContent
              selectedQuizContent={selectedQuizContent}
              setSelectedQuizContent={setSelectedQuizContent}
              courseId={id}
              sectionId={activeSectionId}
              quizId={activeQuizId}
              goToNextLessonQuiz={goToNextLessonQuiz}
              markCompletedQuiz={markCompletedQuiz}
              courseRoom={courseRoom}
            />
          )}
        </div>
      </div>
    </StudentRoute>
  )
}

export default LessonView