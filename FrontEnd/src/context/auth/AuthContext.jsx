import  { createContext, useContext } from 'react';
import PropTypes from "prop-types";
const AuthContext = createContext();
import {useAuthHook} from '../../hook/index.jsx';
export const AuthProvider = ({ children }) => {
    const { login,loginWithToken, register, refreshToken, loading, error } = useAuthHook();
    return (
        <AuthContext.Provider value={{ login,loginWithToken, register, refreshToken, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);