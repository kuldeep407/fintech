import React from "react";
import PortfolioAllocationChart from "./Portfolio";
import PortfolioGrowthChart from "./PortfolioTransaction";
import PortfolioMetrics from "./portfolioMatrics";
import Navbar from "../components/Navbar";
import Report from "./Report";

export default function Home() {
  return (
    <div className="bg-[#f1f5fa] min-h-screen text-white">
      <Navbar />
      <div className="w-[90%] mx-auto mt-16">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          <div className="w-full lg:w-[48%]">
            <PortfolioAllocationChart />
          </div>
          <div className="w-full lg:w-[48%]">
            <PortfolioGrowthChart />
          </div>
        </div>

        <div className="w-full mb-8">
          <PortfolioMetrics />
        </div>

        <div className="w-full">
          <Report />
        </div>
      </div>
    </div>
  );
}
