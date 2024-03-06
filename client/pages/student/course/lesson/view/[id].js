import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../../../components/LessonStudentView/Sidebar';

const LessonView = () => {
  // Load course 
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);


  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadCourse();
      loadCourseYearId();
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


  // Show section
  useEffect(() => {
    if (id) {
      loadSection();
    }
  }, [course, courseYearId]);

  const [section, setSection] = useState([])
  const loadSection = async () => {
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

          const AssignmentData = await Promise.all(
            section.assignment.map(async (assignmentId) => {
              try {
                const { data: assignment } = await axios.get(`${process.env.NEXT_PUBLIC_API}/assignment/${assignmentId}`);
                return assignment;
              } catch (error) {
                console.error('Error loading assignment:', error);
                return null;
              }
            })
          );

          return { ...section, lessonData, quizData, AssignmentData };
        })
      );

      setSection(sectionsWithData);
    } catch (error) {
      console.error('Error loading sections:', error);
    }
  };

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


  return (
    <div>
      <div className="flex min-h-screen bg-white">
        {/* Collapsible Sidebar */}
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
        />

      </div>
    </div>
  )
}

export default LessonView