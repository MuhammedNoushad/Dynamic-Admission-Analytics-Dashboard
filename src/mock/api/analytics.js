export const fetchAdmissionAnalytics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applicationPerProgram: [
          { program: "BCA", count: 100, date: "2024-01-01" },
          { program: "BBA", count: 80, date: "2024-01-02" },
          { program: "MBA", count: 120, date: "2024-01-03" },
          { program: "MCA", count: 90, date: "2024-01-04" },
          { program: "M.Tech", count: 70, date: "2024-01-05" },
          { program: "PhD", count: 40, date: "2024-01-06" },
          { program: "M.Sc", count: 60, date: "2024-01-07" },
        ],
        applicationTrends: [
          { date: "2024-01-01", count: 100 },
          { date: "2024-01-02", count: 200 },
          { date: "2024-01-03", count: 300 },
          { date: "2024-01-04", count: 400 },
          { date: "2024-01-05", count: 500 },
          { date: "2024-01-06", count: 600 },
          { date: "2024-01-07", count: 700 },
        ],
        verifiedApplicants: [
          { date: "2024-01-01", count: 40 },
          { date: "2024-01-02", count: 70 },
          { date: "2024-01-03", count: 100 },
          { date: "2024-01-04", count: 120 },
          { date: "2024-01-05", count: 160 },
          { date: "2024-01-06", count: 180 },
          { date: "2024-01-07", count: 130 },
        ],
        rejectedApplicants: [
          { date: "2024-01-01", count: 20 },
          { date: "2024-01-02", count: 40 },
          { date: "2024-01-03", count: 60 },
          { date: "2024-01-04", count: 80 },
          { date: "2024-01-05", count: 50 },
          { date: "2024-01-06", count: 30 },
          { date: "2024-01-07", count: 20 },
        ],
      });
    }, 1000);
  });
};
