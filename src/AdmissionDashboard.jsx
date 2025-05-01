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

const getColor = (count) => {
  if (count > 1000) return "text-red-600";
  if (count > 500) return "text-orange-500";
  return "text-gray-700";
};

const AdmissionDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
      const date = new Date(item.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || date >= from) && (!to || date <= to);
    });
  }, [data, fromDate, toDate]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data) return <p className="text-center">No data available</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <Card title="Total Applicants" count={data.totalApplicants} />
        <Card title="Verified Applicants" count={data.verifiedApplicants} />
        <Card title="Rejected Applicants" count={data.rejectedApplicants} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
          onClick={loadData}
        >
          Refresh
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <label>
          From:{" "}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To:{" "}
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartWrapper title="Applications per Program">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.applicationPerProgram}>
              <XAxis dataKey="program" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper title="Application Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredTrends}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div className={`p-4 rounded shadow w-60 ${getColor(count)}`}>
    <h3 className="font-bold">{title}</h3>
    <p className="text-2xl">{count}</p>
  </div>
);

const ChartWrapper = ({ title, children }) => (
  <div className="p-4 border rounded shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export default AdmissionDashboard;
