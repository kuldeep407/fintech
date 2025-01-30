import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PortfolioAllocationChart() {
  const [portfolioData, setPortfolioData] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/get-portfolio`;
      const response = await axios.get(url, { withCredentials: true });
      // console.log(response.data); 
      setPortfolioData(response.data.portfolios);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData =
    portfolioData && portfolioData.length > 0
      ? portfolioData.map((portfolio) => ({
          name: portfolio.strategy,
          value:
            portfolio.allocation.stocks +
            portfolio.allocation.bonds +
            portfolio.allocation.others,
        }))
      : [];

  const COLORS = [
    "#FF6F61",
    "#6A9FB5",
    "#FFDD44",
    "#91E49D",
    "#BA68C8",
    "#F06292",
    "#4DB6AC",
    "#FFA726",
  ];

  return (
    <div className="bg-[#f1f5fa] pb-[60px]">
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-extrabold text-[#374151] my-6 tracking-wide mt-[120px]">
          Portfolio Allocation by Strategy
        </h3>
        {Array.isArray(portfolioData) && portfolioData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={70}
                paddingAngle={5}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ transition: "fill 0.3s ease" }}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" style={{ marginBottom: '100px', marginTop: "30px" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}
