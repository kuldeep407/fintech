import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function PortfolioGrowthChart() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [chartWidth, setChartWidth] = useState(550); 
  const fetchData = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/get-portfolio`;
      const response = await axios.get(url, { withCredentials: true });
      setPortfolioData(response.data.portfolios);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();

    const handleResize = () => {
      const newWidth = Math.min(window.innerWidth * 0.85, 650); 
      setChartWidth(newWidth);
    };

    window.addEventListener("resize", handleResize); 
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  const chartData = portfolioData.flatMap((portfolio) =>
    portfolio.transactions.map((transaction) => ({
      strategy: portfolio.strategy,
      date: new Date(transaction.date).toLocaleDateString(),
      amount: transaction.amount,
    }))
  );

  return (
    <div className="bg-[#f1f5fa] pt-[100px] pb-[60px] text-center rounded-xl mx-auto">
      <h3 className="text-3xl font-extrabold text-[#374151] my-6 tracking-wide">
        Portfolio Growth Over Time
      </h3>
      <div className="bg-white rounded-xl p-6 shadow-md mx-auto w-full max-w-[700px]">
        <LineChart
          width={chartWidth}  
          height={320}
          data={chartData}
          style={{ margin: "auto" }}
        >
          <defs>
            <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#374151" }} />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} />
          <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", fontSize: "14px" }} />
          <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }} />
          <Line type="monotone" dataKey="amount" stroke="url(#lineColor)" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, stroke: "#4F46E5" }} />
        </LineChart>
      </div>
    </div>
  );
}
