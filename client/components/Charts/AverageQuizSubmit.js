import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; 
function DoughnutChart({
    averageScore
}) {



    const centerText = {
        id: 'centerText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data } = chart;

           
        const text = averageScore.toFixed(2) + "%";

            ctx.save();
            const x = chart.getDatasetMeta(0).data[0].x;
            const y = chart.getDatasetMeta(0).data[0].y;

            //ctx.fillRect(x - 10, y - 10, 20, 20);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 40px sans-serif';
            ctx.fillText(text, x, y);
        }
    }

    const data = {
        datasets: [
            {
                label: 'คะแนนเฉลี่ย',
                data: [averageScore],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const config = {
        type: 'doughnut',
        data,
        options: {
            title: {
                display: true,
                text: "World Wide Wine Production 2018"
            },
            cutout: '80%'
        },
        plugins: [centerText]           
};

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, config);

        return () => chart.destroy(); // Cleanup chart on unmount
    }, []);

    return (
        <div className="chart-container">
            <div className="chart-box">
                <canvas id="myChart" />
            </div>
        </div>
    );
}

export default DoughnutChart;