
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js/auto';
import {Pie} from "react-chartjs-2";
import PropTypes from "prop-types";
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend , ChartDataLabels);

function PieChart({revenue , profit}){

    const data = {
        labels: ['Doanh thu', 'Lợi nhuận'],
        datasets: [
            {
                data: [revenue, profit],
                borderColor: '#36A2EB',
                backgroundColor:
                    ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                borderWidth: 2,
                hoverOffset: 6,
                tension: 0.4,
            },
        ],
    };

    const options = {
        animations: {
            tension: {
                duration: 1000,
                easing: 'pie',
                from: 1,
                to: 0,
                loop: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        datalabels: {
            color: '#fff',
            font: {
                weight: 'bold',
                size: 24,
            },
            formatter: (value) => value.toLocaleString(),
            anchor: 'center',
            align: 'center',
        },
    };

    return <Pie data={data} options={options} />;
};
PieChart.propTypes = {
    revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    profit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
export default PieChart;
