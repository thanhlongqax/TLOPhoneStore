import axiosApiConfig from '../../config/axiosConfigOutApi.jsx';

class AddressService {
    // Lấy danh sách tất cả các đơn vị hành chính với depth tùy chọn
    async getAllDivisions(depth = 1) {
        try {
            const response = await axiosApiConfig.get('/api/', { params: { depth } });
            return response.data; // Trả về dữ liệu đã xử lý
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy danh sách tỉnh/thành phố
    async getProvinces() {
        try {
            const response = await axiosApiConfig.get('/api/p/');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm kiếm tỉnh/thành phố
    async searchProvinces(query) {
        try {
            const response = await axiosApiConfig.get('/api/p/search/', { params: { q: query } });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy thông tin một tỉnh/thành phố cụ thể
    async getProvince(code, depth = 1) {
        try {
            const response = await axiosApiConfig.get(`/api/p/${code}`, { params: { depth } });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy danh sách huyện/quận
    async getDistricts() {
        try {
            const response = await axiosApiConfig.get('/api/d/');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm kiếm huyện/quận
    async searchDistricts(query, provinceCode) {
        try {
            const response = await axiosApiConfig.get('/api/d/search/', {
                params: {
                    q: query,
                    p: provinceCode || null,
                },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy thông tin một huyện/quận cụ thể
    async getDistrict(code, depth = 1) {
        try {
            const response = await axiosApiConfig.get(`/api/d/${code}`, { params: { depth } });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy danh sách phường/xã
    async getWards() {
        try {
            const response = await axiosApiConfig.get('/api/w/');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm kiếm phường/xã
    async searchWards(query, districtCode, provinceCode) {
        try {
            const response = await axiosApiConfig.get('/api/w/search/', {
                params: {
                    q: query,
                    d: districtCode || null,
                    p: provinceCode || null,
                },
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Lấy thông tin một phường/xã cụ thể
    async getWard(code) {
        try {
            const response = await axiosApiConfig.get(`/api/w/${code}`);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getVersion() {
        try {
            const response = await axiosApiConfig.get('/api/version');
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Xử lý lỗi chung
    handleError(error) {
        console.error('API call failed:', error);
        throw error;
    }
}

const addressService = new AddressService();
export default addressService;
