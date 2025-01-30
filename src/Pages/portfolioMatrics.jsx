import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

export default function PortfolioMetrics() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateMetrics = (data) => {
    return data.map((portfolio) => {
      const transactions = Array.isArray(portfolio.transactions) ? portfolio.transactions : [];
      const totalValue = transactions.reduce((acc, transaction) => acc + (transaction.amount || 0), 0);
      const profitableTransactions = transactions.filter((transaction) => transaction.amount > 0).length;
      const winRate = transactions.length > 0 ? (profitableTransactions / transactions.length) * 100 : 0;

      return {
        strategy: portfolio.strategy || "N/A",
        totalValue: totalValue.toFixed(2),
        winRate: winRate.toFixed(2),
        transactions: transactions.length,
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

  const fetchFilteredData = async () => {
    if (!startDate || !endDate) {
      setError("Please select both Start Date and End Date.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      setError("Invalid date format.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/filter-portfolio-data?startDate=${start.toISOString()}&endDate=${end.toISOString()}`;
      const response = await axios.get(url, { withCredentials: true });

      if (response.data.portfolios && response.data.portfolios.length === 0) {
        setError("No data found for the selected date range.");
        setMetrics([]); 
      } else {
        setMetrics(response.data.portfolios); 
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f1f5fa] pt-[90px] pb-[60px]">
      <div className="w-[90%] mx-auto">
        <h3 className="text-3xl font-extrabold text-[#374151] my-6 tracking-wide text-center mb-10">
          Portfolio Metrics
        </h3>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <TextField
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ minWidth: 180 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ minWidth: 180 }}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="performance">Performance</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" sx={{ padding: 2 }} onClick={fetchFilteredData}>
            Apply Filters
          </Button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {loading && <div className="flex justify-center"><CircularProgress /></div>}

        <div className="overflow-x-auto">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="portfolio table">
              <TableHead>
                <TableRow className="hover:bg-gray-200">
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Strategy</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Total Portfolio Value ($)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Win Rate (%)</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Transactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.map((row, index) => (
                  <TableRow className="hover:bg-gray-100" key={index}>
                    <TableCell>{row.strategy}</TableCell> 
                    <TableCell>{row.totalValue}</TableCell> 
                    <TableCell>{row.winRate}</TableCell> 
                    <TableCell>{row.transactions}</TableCell> 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
