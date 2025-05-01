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
        ],
        applicationTrends: [
          { date: "2024-01-01", count: 100 },
          { date: "2024-01-02", count: 200 },
          { date: "2024-01-03", count: 300 },
        ],
      });
    }, 1000);
  });
};
