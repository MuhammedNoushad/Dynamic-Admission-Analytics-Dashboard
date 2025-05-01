export const fetchAdmissionAnalytics = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalApplicants: 1200,
        verifiedApplicants: 800,
        rejectedApplicants: 300,
        applicationPerProgram: [
          { program: "BCA", count: 400 },
          { program: "BBA", count: 300 },
          { program: "MBA", count: 500 },
          { program: "MCA", count: 200 },
          { program: "M.Tech", count: 100 },
          { program: "PhD", count: 50 },
          { program: "M.Sc", count: 150 },
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
      });
    }, 1000);
  });
};
