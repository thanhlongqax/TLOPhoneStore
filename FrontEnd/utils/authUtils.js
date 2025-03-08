import { jwtDecode } from "jwt-decode";

export const hasPassword = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        try {
            const decodedToken = jwtDecode(accessToken);
            return decodedToken.isHasPassword;
        } catch (error) {
            console.error("Lỗi khi giải mã token:", error);
            return false;
        }
    }
    return false;
};
