import axiosConfig from '../../config/axiosConfig.jsx';

class AdminReportService {

    GetReportToday(page , limit) {
        return axiosConfig.get(`/api/reports/admin/report/today?page=${page}&limit=${limit}`);
    }

    GetReportYesterday(page , limit) {
        return axiosConfig.get(`/api/reports/admin/report/yesterday?page=${page}&limit=${limit}`);
    }
    GetReportLast7Days(page,limit) {
        return axiosConfig.get(`/api/reports/admin/report/last-7-days?page=${page}&limit=${limit}`);
    }
    GetReportThisMonth(page,limit) {
        return axiosConfig.get(`/api/reports/admin/report/this-month?page=${page}&limit=${limit}`);
    }
    GetReportDateRange(startDate , endDate , page , limit) {
        return axiosConfig.get(`/api/reports/admin/report/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
    }
}

const adminReportService = new AdminReportService();
export default adminReportService;
