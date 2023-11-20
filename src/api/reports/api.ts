import { useGetReport, useBrowseReports } from "./requests";

export const useReportsApi = () => {
  const {
    getReport,
    isLoading: getReportLoading,
    data: getReportData,
  } = useGetReport();

  const {
    browseReports,
    isLoading: browseReportsLoading,
    data: browseReportData,
  } = useBrowseReports();

  return {
    getReport: {
      query: getReport,
      isLoading: getReportLoading,
      data: getReportData,
    },
    browseReports: {
      query: browseReports,
      isLoading: browseReportsLoading,
      data: browseReportData,
    },
  };
};