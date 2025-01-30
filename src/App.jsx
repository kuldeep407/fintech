import React from "react";
import "./App.css";
import PortfolioAllocationChart from "./Pages/Portfolio";
import PortfolioGrowthChart from "./Pages/PortfolioTransaction";
import PortfolioMetrics from "./Pages/portfolioMatrics";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Report from "./Pages/Report"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allocation" element={<PortfolioAllocationChart />} />
        <Route path="/growth" element={<PortfolioGrowthChart />} />
        <Route path="/metrics" element={<PortfolioMetrics />} />
        <Route path="/report" element={<Report />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
