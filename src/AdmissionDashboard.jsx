import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAdmissionAnalytics } from "./mock/api/analytics";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const getColor = (count) => {
  if (count > 1000) return "text-red-600";
  if (count > 500) return "text-orange-500";
  return "text-gray-700";
};

const AdmissionDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAdmissionAnalytics();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTrends = useMemo(() => {
    if (!data) return [];
    return data.applicationTrends.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
  }, [data, startDate, endDate]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data) return <p className="text-center">No data available</p>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-wrap justify-around gap-2">
        <Card title="Total Applicants" count={data.totalApplicants} />
        <Card title="Verified Applicants" count={data.verifiedApplicants} />
        <Card title="Rejected Applicants" count={data.rejectedApplicants} />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select start date"
            className="p-2 rounded border"
          />
          <span className="text-gray-500">to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select end date"
            className="p-2 rounded border"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-auto cursor-pointer hover:bg-blue-600 transition duration-200"
          onClick={loadData}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartWrapper title="Applications per Program">
          {data.applicationPerProgram.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No data found
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.applicationPerProgram}>
                <XAxis dataKey="program" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff0054" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>

        <ChartWrapper title="Application Trends">
          {filteredTrends.length === 0 ? (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No data found
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredTrends}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#9e0059" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartWrapper>
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div
    style={{
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    }}
    className={`p-5 rounded-lg shadow-md w-80 border transition-all duration-300 hover:shadow-lg ${getColor(
      count
    )}`}
  >
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-3xl font-semibold">{count}</p>
  </div>
);

const ChartWrapper = ({ title, children }) => (
  <div
    style={{
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    }}
    className="p-4 border rounded shadow"
  >
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default AdmissionDashboard;
