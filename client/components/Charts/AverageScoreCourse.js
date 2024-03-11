import { useEffect, useState } from "react";
import { Chart } from 'chart.js/auto';
import { LinearScale } from 'chart.js';

Chart.register(LinearScale);

function Example({
  QuizScoreCourse,
  courseRoom,
  section,
  averageScores,

}) {

  const sectionToRoomMap = {};
  courseRoom.forEach((room) => {
    // Here, we're assuming the room ID is the same as the section ID
    const sectionId = room._id;
    sectionToRoomMap[sectionId] = room.roomName.trim();
  });

  const quizToLessonMap = {};
  section.forEach((lesson) => {
    // Here, we're assuming the room ID is the same as the section ID
    const lessonId = lesson._id;
    quizToLessonMap[lessonId] = lesson.sectionName.trim();
  });

  console.log(quizToLessonMap)

  const processData = (quizScoreData) => {
    const lessonData = {};

    // Check if quizScoreData is an array before iterating
    if (Array.isArray(quizScoreData)) {
      quizScoreData.forEach((scoreEntry) => {
        const roomName = sectionToRoomMap[scoreEntry.sectionId];
        const lessonName = quizToLessonMap[scoreEntry.lessonId] || "Unknown Lesson";


        if (!lessonData[lessonName]) {
          lessonData[lessonName] = {};
        }

        if (!lessonData[lessonName][roomName]) {
          lessonData[lessonName][roomName] = [];
        }

        lessonData[lessonName][roomName].push(scoreEntry.score);
      });
    }

    return lessonData;
  };

  const lessonData = processData(QuizScoreCourse);



  const roomNames = Object.values(sectionToRoomMap);

  const lessons = [
    {
      name: "SectionName 1",
      scores: [3.5, 5, 5,] // Average scores for each room in Lesson 1
    },
    {
      name: "SectionName 2",
      scores: [4, 5, 5,] // Average scores for each room in Lesson 2
    },
    {
      name: "SectionName 3",
      scores: [4.5, 5, 3] // Average scores for each room in Lesson 3
    }
  ];

  const [myChart, setMyChart] = useState(null);

  const destroyChart = () => {
    if (myChart) {
      myChart.destroy();
      setMyChart(null);
    }
  };

  useEffect(() => {
    const ctx = document.getElementById('barChartTch').getContext('2d');
    destroyChart();

    const datasets = averageScores.map(section => ({
      label: section.section,
      data: section.scores,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 2,
    }));

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: courseRoom.map(room => room.roomName), // labels should be the names of the rooms
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    setMyChart(chart);

    return () => {
      destroyChart();
    };
  }, [averageScores, courseRoom]);


  // Function to calculate average scores for an array of scores
  function calculateAverageScores(scores) {
    if (!scores || scores.length === 0) {
      return 0; // Return 0 if there are no scores
    }
    const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
    return average;
  }


  return (
    <>
      <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas width="" height="60vh" id="barChartTch"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Example;
