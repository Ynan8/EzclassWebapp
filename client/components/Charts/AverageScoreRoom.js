import { useEffect, useState } from "react";
import { Chart, BarElement, BarController, CategoryScale, LinearScale } from "chart.js";

// Register the components
Chart.register(BarElement, BarController, CategoryScale, LinearScale);

function Example() {
  const [myChart, setMyChart] = useState(null);
  const dataList = {
    //room      1   2  3
      m4: {
        บทที่1: [2,8,2,9,7],
        บทที่2: [4,3,7,7,8],
        บทที่3: [3,6,2,5,4],
        บทที่4: [9,7,10,5,10],
        บทที่5: [8,6,1,4,10],
        บทที่6: [1,3,8,6,5],
        บทที่7: [9,2,9,4,8],
        บทที่8: [5,2,5,8,1],
        บทที่9: [3,4,2,4,1],
        บทที่10: [6,9,1,5,6],
      },
      m5: {
        บทที่1: [2,1,1,10,3],
        บทที่2: [3,10,6,2,3],
        บทที่3: [1,5,1,8,2],
        บทที่4: [7,7,10,6,3],
        บทที่5: [3,6,3,6,6],
        บทที่6: [7,6,9,6,4],
        บทที่7: [4,1,5,9,10],
        บทที่8: [4,6,7,4,10],
        บทที่9: [6,5,6,1,9],
        บทที่10: [3,7,2,3,4],
      },
      m6: {
        บทที่1: [9,3,4,8,10],
        บทที่2: [2,1,3,8,5],
        บทที่3: [4,3,6,1,3],
        บทที่4: [3,1,3,3,9],
        บทที่5: [7,8,9,4,4],
        บทที่6: [8,2,2,7,6],
        บทที่7: [8,7,1,7,8],
        บทที่8: [10,2,10,10,2],
        บทที่9: [3,4,10,6,4],
        บทที่10: [1,9,9,8,3],
    },
   
  };

  useEffect(() => {
    const ctx = document.getElementById("barChartTch2").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
         labels: ["ชั้นม.4/1"],
      //  labels: ["บทที่ที่ 1","บทที่ที่ 2","บทที่ที่ 3","บทที่ที่ 4","บทที่ที่ 5","บทที่ที่ 6","บทที่ที่ 7","บทที่ที่ 8","บทที่ที่ 9","บทที่ที่ 10","บทที่ที่ 11","บทที่ที่ 12","บทที่ที่ 13","บทที่ที่ 14"], "ชั้นม.5/1","ชั้นม.5/2","ชั้นม.5/3","ชั้นม.5/4","ชั้นม.5/5","ชั้นม.6/1","ชั้นม.6/2","ชั้นม.6/3","ชั้นม.6/4"
        datasets: [
            {
              label: "บทที่1",
              backgroundColor: "rgba(255, 26, 104, 0.2)",
              borderColor: "rgba(255, 26, 104, 1)",
              borderWidth: 2,
              data: [2,8,2,9,7],
            },
          {
            label: "บทที่2",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            data: [4,3,7,7,8],
          },
          {
            label: "บทที่3",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 2,
            data: [3,6,2,5,4],
          },
          {
            label: "บทที่4",
            backgroundColor: "rgba(118, 215, 196, 0.2)",
            borderColor: "rgba(118, 215, 196, 1)",
            borderWidth: 2,
            data: [9,7,10,5,10],
          },
          {
            label: "บทที่5",
            backgroundColor: "rgba(93, 109, 126 , 0.2)",
            borderColor: "rgba(93, 109, 126 , 1)",
            borderWidth: 2,
            data: [8,6,1,4,10],
          },
          {
            label: "บทที่6",
            backgroundColor: "rgba(175, 122, 197, 0.2)",
            borderColor: "rgba(175, 122, 197 , 1)",
            borderWidth: 2,
            data: [1,3,8,6,5],
          },
          {
            label: "บทที่7",
            backgroundColor: "rgba(19, 141, 117  , 0.2)",
            borderColor: "rgba(19, 141, 117  , 1)",
            borderWidth: 2,
            data: [9,2,9,4,8],
          },
          {
            label: "บทที่8",
            backgroundColor: "rgba(186, 74, 0, 0.2)",
            borderColor: "rgba(186, 74, 0 , 1)",
            borderWidth: 2,
            data: [5,2,5,8,1],
          },
          {
            label: "บทที่9",
            backgroundColor: "rgba(63, 81, 181 , 0.2)",
            borderColor: "rgba(63, 81, 181 , 1)",
            borderWidth: 2,
            data: [3,4,2,4,1],
          },
          {
            label: "บทที่10",
            backgroundColor: "rgba(205, 220, 57 , 0.2)",
            borderColor: "rgba(205, 220, 57 , 1)",
            borderWidth: 2,
            data: [6,9,3,5,6],
          },
        ],
      },
      options: {
        // responsive:false,
        
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });

    setMyChart(chart);
  }, []);

  function changeGradeClass() {
    const gradeClass = document.getElementById("gradeClass").value;
    // c
    // const subject = document.getElementById("subjects").value;

    if (myChart) {
      // map array a = [1,2,3].map((item) => {
      //              1,4,9
      //      item**2
      // })
      const newData = myChart.data.datasets.map((dataset) => {
        var updatedData = [];
        

        updatedData = dataList[gradeClass][dataset.label] ;
        // updatedData = dataList[subject][dataset.label] ;
 
        return {
          ...dataset,
          data: updatedData,
        };
      });

      myChart.data.datasets = newData;
      myChart.update();
    }
  }

  return (
    <>
      {/* Bar chart */}
      <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center justify-between">
            <div className="relative">
              <h2 className="text-back text-xl font-semibold">คะแนนเฉลี่ยแบบทดสอบ</h2>
            </div>
            {/* <div className="relative h-350-px flex items-center">
              <div className="ml-2">
              <select id="gradeClass" onChange={changeGradeClass}>
                  <option value="m4">มัธยมศึกษาชั้นปีที่ 4</option>
                  <option value="m5">มัธยมศึกษาชั้นปีที่ 5</option>
                  <option value="m6">มัธยมศึกษาชั้นปีที่ 6</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas width="" height="60vh" id="barChartTch2"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

export default Example;
