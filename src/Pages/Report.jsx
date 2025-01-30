import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const marketUpdates = [
  {
    title: "Stock market rallies as tech shares surge 5% this week.",
    description:
      "This week, the tech sector has experienced a significant surge with top companies seeing up to a 5% increase.",
  },
  {
    title: "Bond yields drop to their lowest point in the past month.",
    description:
      "In the last month, bond yields have dropped to the lowest level seen this year, raising concerns about future growth prospects.",
  },
  {
    title:
      "Gold prices rise after the latest economic forecast from the Federal Reserve.",
    description:
      "Gold prices are on the rise, driven by the latest economic forecast, which suggests inflation will remain a concern in the coming months.",
  },
];

const PortfolioReportPage = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateMetrics = (data) => {
    return data.map((portfolio) => {
      const transactions = Array.isArray(portfolio.transactions)
        ? portfolio.transactions
        : [];
      const initialValue = transactions[0]?.amount || 0;
      const finalValue = transactions.reduce(
        (acc, transaction) => acc + (transaction.amount || 0),
        0
      );

      const ROI = ((finalValue - initialValue) / initialValue) * 100;

      const years = 1;
      const CAGR = ((finalValue / initialValue) ** (1 / years) - 1) * 100;

      const peakValue = Math.max(...transactions.map((t) => t.amount));
      const troughValue = Math.min(...transactions.map((t) => t.amount));
      const drawdown = ((peakValue - troughValue) / peakValue) * 100;

      return {
        strategy: portfolio.strategy || "N/A",
        ROI: ROI.toFixed(2),
        CAGR: CAGR.toFixed(2),
        drawdown: drawdown.toFixed(2),
        allocation: portfolio.allocation || {},
        transactions: transactions,
      };
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/get-portfolio`;
      const response = await axios.get(url, { withCredentials: true });
      if (!response.data || !response.data.portfolios) {
        setError("No data available.");
        setPortfolioData([]);
        setMetrics([]);
      } else {
        setPortfolioData(response.data.portfolios);
        setMetrics(calculateMetrics(response.data.portfolios));
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#f1f5fa] pt-[90px] pb-[60px]">
      <div className="w-full md:w-[90%] mx-auto px-4">
        <h3 className="text-3xl font-extrabold text-[#374151] my-6 tracking-wide text-center mb-10">
          Portfolio Strategy Performance Report
        </h3>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {loading && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}

        <TableContainer component={Paper} className="overflow-x-auto">
          <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
            <TableHead>
              <TableRow className="hover:bg-gray-200">
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Strategy
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  ROI (%)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  CAGR (%)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Drawdown (%)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Transactions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((row, index) => (
                <TableRow className="hover:bg-gray-100" key={index}>
                  <TableCell>{row.strategy}</TableCell>
                  <TableCell>{row.ROI}</TableCell>
                  <TableCell>{row.CAGR}</TableCell>
                  <TableCell>{row.drawdown}</TableCell>
                  <TableCell>
                    {Array.isArray(row.transactions) &&
                    row.transactions.length > 0 ? (
                      row.transactions.map((transaction, idx) => (
                        <div key={idx}>
                          <p>{`Description: ${transaction.description}`}</p>
                          <p>{`Amount: $${transaction.amount.toFixed(2)}`}</p>
                        </div>
                      ))
                    ) : (
                      <p>No transactions available</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-10">
          <h3
            variant="h4"
            className="text-3xl font-extrabold text-[#374151] my-6 tracking-wide mb-8"
          >
            Recent Market Updates
          </h3>
          {marketUpdates.map((update, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-700"
                >
                  {update.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-sm text-gray-500">
                  {update.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioReportPage;
