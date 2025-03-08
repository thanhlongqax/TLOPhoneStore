import axiosConfig from '../../config/axiosConfig.jsx'

class UserService {
    GetAllEmployee (payload) {
        return axiosConfig.get("/api/auth/signin" , payload );
    }
    GetEmployeeById (token) {
        return axiosConfig.get(`/api/auth/login?token=${token}` );
    }
    UpdateEmployeeById (payload) {
        return axiosConfig.post(`/api/auth/confirm?token=`, payload );
    }
    CreateEmployee (payload) {
        return axiosConfig.post(`/api/auth/confirm?token=$`, payload );
    }
    RegisterMailEmployee (payload) {
        return axiosConfig.post("/api/auth/signup" , payload);
    }
    LockedEmployee (payload) {
        return axiosConfig.post("/api/user/locked" , payload );
    }
}

const userService = new UserService();
export default userService;