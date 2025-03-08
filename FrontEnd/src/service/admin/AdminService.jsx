import axiosConfig from '../../config/axiosConfig.jsx'

class AdminService {
    UpdateAdmin (username , payload) {
        return axiosConfig.put(`/api/admin/${username}`, payload);
    }
}

const adminService = new AdminService();
export default adminService;