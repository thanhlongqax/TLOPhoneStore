import axiosConfig from '../../config/axiosConfig.jsx';

class UserReportService {
    GetReportToday(page , limit) {
        return axiosConfig.get(`/api/reports/user/report/today?page=${page}&limit=${limit}`);
    }

    GetReportYesterday(page , limit) {
        return axiosConfig.get(`/api/reports/user/report/yesterday?page=${page}&limit=${limit}`);
    }
    GetReportLast7Days(page,limit) {
        return axiosConfig.get(`/api/reports/user/report/last-7-days?page=${page}&limit=${limit}`);
    }
    GetReportThisMonth(page,limit) {
        return axiosConfig.get(`/api/reports/user/report/this-month?page=${page}&limit=${limit}`);
    }
    GetReportDateRange(startDate , endDate , page , limit) {
        return axiosConfig.get(`/api/reports/user/report/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
    }
}

const userReportService = new UserReportService();
export default userReportService;
