import { useState, useEffect, useCallback } from 'react';
import {employeeService} from '../service';

const useEmployeeHook = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [loadingEmployee, setLoadingEmployee] = useState(false);
    const [errorEmployee, setError] = useState(null);
    const [totalEmployees, setTotalEmployees] = useState(1);
    const fetchEmployee = useCallback(async (page = 1, limit = 10, searchTerm = '') => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const response = await employeeService.GetEmployeeByPage(page, limit, searchTerm);
            setEmployees(response.data);
            setTotalEmployees(response.total);
        } catch (err) {
            setError('Có lỗi khi tải danh sách nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployee();
    }, []);

    const getEmployeeById = useCallback(async (id) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const response = await employeeService.GetEmployeeById(id);
            setEmployee(response.data);
        } catch (err) {
            setError('Có lỗi khi tải thông tin nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    const getEmployeeByUserName = useCallback(async (username) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const response = await employeeService.GetEmployeeByUserName(username);
            setEmployee(response.data);
            return response.data;
        } catch (err) {
            setError('Có lỗi khi tải thông tin nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);
    const createEmployee = useCallback(async (payload) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const response = await employeeService.CreateEmployee(payload);
            return response.data;
        } catch (err) {
            setError('Có lỗi khi tạo nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    const updateEmployeeById = useCallback(async (id, payload) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const response = await employeeService.UpdateEmployeeById(id, payload);
            return response.data;
        } catch (err) {
            setError('Có lỗi khi cập nhật thông tin nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    const deleteEmployeeById = useCallback(async (id) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            await employeeService.DeleteEmployeeById(id);
            setEmployees(prev => prev.filter(employee => employee.id !== id));
        } catch (err) {
            setError('Có lỗi khi xóa nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);
    const LockedEmployeeById = useCallback(async (id) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const respone = await employeeService.LockedEmployeeById(id);
            return respone;
        } catch (err) {
            setError('Có lỗi khi khóa nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);
    const UnLockEmployeeById = useCallback(async (id) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const respone = await employeeService.UnlockEmployeeById(id);
            return respone;
        } catch (err) {
            setError('Có lỗi mở khóa xóa nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);
    const ResetPasswordEmployeeById = useCallback(async (id) => {
        setLoadingEmployee(true);
        setError(null);
        try {
            const respone = await employeeService.SendMailEmployee(id);
            return respone;
        } catch (err) {
            setError('Có lỗi reset mật khẩu nhân viên');
            console.error(err);
        } finally {
            setLoadingEmployee(false);
        }
    }, []);
    return {
        employees,
        employee,
        loadingEmployee,
        errorEmployee,
        totalEmployees,
        LockedEmployeeById,
        UnLockEmployeeById,
        getEmployeeByUserName,
        fetchEmployee,
        getEmployeeById,
        createEmployee,
        updateEmployeeById,
        deleteEmployeeById,
        ResetPasswordEmployeeById,
    };
};

export default useEmployeeHook;
