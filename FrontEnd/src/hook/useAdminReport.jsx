import { useState, useCallback } from "react";
import { adminReportService } from "../service";

const useAdminReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = useCallback(async (apiMethod, ...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiMethod(...args);
            setData(response);
            return response;
        } catch (err) {
            setError(err?.response?.data?.message || "Đã xảy ra lỗi!");
        } finally {
            setLoading(false);
        }
    }, []);


    const getReportToday = useCallback((page = 1, limit = 10) =>
        fetchReport(adminReportService.GetReportToday, page, limit), [fetchReport]);

    const getReportYesterday = useCallback((page = 1, limit = 10) =>
        fetchReport(adminReportService.GetReportYesterday, page, limit), [fetchReport]);


    const getReportLast7Days = useCallback((page = 1, limit = 10) =>
        fetchReport(adminReportService.GetReportLast7Days, page, limit), [fetchReport]);


    const getReportThisMonth = useCallback((page = 1, limit = 10) =>
        fetchReport(adminReportService.GetReportThisMonth, page, limit), [fetchReport]);


    const getReportDateRange = useCallback(
        (startDate, endDate, page = 1, limit = 10) =>
            fetchReport(adminReportService.GetReportDateRange, startDate, endDate, page, limit),
        [fetchReport]
    );

    return {
        data,
        loading,
        error,
        getReportToday,
        getReportYesterday,
        getReportLast7Days,
        getReportThisMonth,
        getReportDateRange,
    };
};

export default useAdminReport;
