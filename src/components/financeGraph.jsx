import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinanceGraph = ({ transactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Kontostand in Euro",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
    ],
  });

  // Update chart data whenever transactions change
  useEffect(() => {
    // Sort transactions by date to ensure oldest is first and newest is last
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const labels = [];
    const data = [];

    // Iterate through sorted transactions to populate the chart data
    sortedTransactions.forEach((transaction) => {
      const dateLabel = transaction.date.toLocaleDateString(); // Use transaction date as label
      labels.push(dateLabel);
      data.push(transaction.balanceAtTransaction); // Use balance at the time of the transaction
    });

    // Update chart data with sorted transactions
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data,
        },
      ],
    });
  }, [transactions]); // Re-run effect whenever the transactions array changes

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Kontostand Verlauf", // Title of the graph
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: €${context.raw.toFixed(2)}`; // Show balance value with 2 decimal places
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Transaktionen",
        },
        ticks: {
          maxRotation: 0, // Prevent labels from rotating too much
          autoSkip: true, // Avoid overlapping of x-axis labels
        },
      },
      y: {
        title: {
          display: true,
          text: "Kontostand (€)",
        },
        min: -10000, // Set the minimum value to -10,000
        max: 10000, // Set the maximum value to +10,000
        beginAtZero: false, // Prevent the axis from starting at zero
        ticks: {
          stepSize: 1000, // Step size for ticks on the y-axis
          callback: function (value) {
            return `€${value}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default FinanceGraph;
