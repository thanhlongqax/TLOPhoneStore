import axiosConfig from '../../config/axiosConfig.jsx';

class EmployeeService {

    GetEmployeeByPage(page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/users?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
    GetEmployeeById(id) {
        return axiosConfig.get(`/api/users/${id}`);
    }
    GetEmployeeByUserName(username) {
        return axiosConfig.get(`/api/users/username/${username}`);
    }
    UpdateEmployeeById(productId ,payload) {
        return axiosConfig.put(`/api/users/${productId}`, payload);
    }

    CreateEmployee(payload) {
        return axiosConfig.post(`/api/users`, payload);
    }

    DeleteEmployeeById(id) {
        return axiosConfig.delete(`/api/users/${id}`);
    }
    LockedEmployeeById(id) {
        return axiosConfig.get(`/api/users/locked/${id}`);
    }
    UnlockEmployeeById(id) {
        return axiosConfig.get(`/api/users/unlocked/${id}`);
    }
    SendMailEmployee(id){
        return axiosConfig.get(`/api/users/sendEmail/${id}`, )
    }

}

const employeeService = new EmployeeService();
export default employeeService;
