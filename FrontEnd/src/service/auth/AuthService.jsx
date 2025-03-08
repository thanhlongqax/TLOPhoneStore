import axiosConfig from '../../config/axiosConfig.jsx'

class AuthService {
    Login (payload) {
        return axiosConfig.post("/api/auth/signin" , payload );
    }
    LoginWithToken (token) {
        return axiosConfig.get(`/api/auth/login?token=${token}` );
    }
    Register (payload) {
        return axiosConfig.post("/api/auth/signup" , payload);
    }
    RegisterWithMail (payload) {
        return axiosConfig.post("/api/auth/registerMail" , payload);
    }
    Logout(){
        return axiosConfig.get("/api/auth/logout");
    }
    ChangePassword (payload , token) {
        return axiosConfig.post(`/api/auth/confirm?token=${token}`, payload );
    }
    RefreshToken(){
        return axiosConfig.get("/api/auth/refresh");
    }
}

const authService = new AuthService();
export default authService;