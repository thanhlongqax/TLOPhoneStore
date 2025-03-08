import axiosConfig from '../../config/axiosConfig.jsx'

class CustomerService {
    GetAllCustomer () {
        return axiosConfig.get("/api/customers");
    }
    GetCustomerById (id) {
        return axiosConfig.get(`/api/customers/${id}` );
    }
    GetCustomerByPhoneNumber (phoneNumber) {
        return axiosConfig.get(`/api/customers/phone?sdt=${phoneNumber}` );
    }
    GetCustomerByPage(page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/customers?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
    UpdateCustomerById (id , payload) {
        return axiosConfig.post(`/api/customers/${id}`, payload );
    }
    CreateCustomer (payload) {
        return axiosConfig.post(`/api/customers`, payload );
    }
    GetHistoryOrderCustomerById (id ,page , limit ,searchTerm ) {
        return axiosConfig.get(`/api/customers/historyOrder/${id}?page=${page}&limit=${limit}&search=${searchTerm}`);
    }
}

const customerService = new CustomerService();
export default customerService;