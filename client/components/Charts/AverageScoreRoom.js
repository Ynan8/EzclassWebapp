import { useEffect, useState } from "react";
import { Chart } from 'chart.js/auto';
import axios from 'axios';

function Example({ averageScoresRoom }) {

  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById('barChartTch').getContext('2d');
    if (myChart) {
      myChart.destroy();
    }

    // Map the fetched data to chart data
    const chartData = {
      labels: averageScoresRoom.map(item => item.section),
      datasets: [
        {
          label: 'คะแนนเฉลี่ย', // You can replace this with the actual room name if you have it
          data: averageScoresRoom.map(item => item.score),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false // This will hide the legend. Set it to true if you want it to be displayed
          }
        }
      }
    });

    setMyChart(newChart);

    // Cleanup function to destroy chart when the component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [averageScoresRoom]); // This effect should re-run when averageScoresRoom updates

  return (
    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="p-4 flex-auto">
        <p className="text-xl font-semibold" >คะแนนเฉลี่ยแบบทดสอบแต่ละบทเรียน</p>
        <div className="relative h-350-px">
          <canvas height="60vh" id="barChartTch"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Example;
