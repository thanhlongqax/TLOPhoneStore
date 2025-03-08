import { useState, useEffect, useCallback } from 'react';
import {customerService} from '../service';

const useCustomerHook = () => {
    const [customers, setCustomers] = useState([]);
    const [loadingCustomer, setLoadingCustomer] = useState(false);
    const [errorCustomer, setErrorCustomer] = useState(null);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [customer , setCustomer] = useState(null);
    const [customerHistoryOrder , setCustomerHistoryOrder] = useState(null);
    const [totalHistoryOrder, setTotalHistoryOrder] = useState(0);
    const getAllCustomers = useCallback(async () => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            const response = await customerService.GetAllCustomer();
            setCustomers(response.data);
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tải danh sách khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    }, []);

    const fetchCustomers = useCallback(async (page = 1, limit = 10, searchTerm = '') => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            const response = await customerService.GetCustomerByPage(page, limit, searchTerm);
            setCustomers(response.data);
            setTotalCustomers(response.total);
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tải dữ liệu khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    }, []);
    useEffect(() => {
        fetchCustomers()
    }, []);
    const getCustomerById = useCallback(async (id) => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            const response = await customerService.GetCustomerById(id);
            setCustomer(response.data)
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tải thông tin khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    }, []);
    const getCustomerByPhoneNumber = useCallback(async (phone) => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            const response = await customerService.GetCustomerByPhoneNumber(phone);
            return response;
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tải thông tin khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    }, []);
    const updateCustomerById = useCallback(async (id, payload) => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            await customerService.UpdateCustomerById(id, payload);
            getAllCustomers();
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi cập nhật thông tin khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    });


    const createCustomer = useCallback(async (payload) => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            await customerService.CreateCustomer(payload);
            getAllCustomers();
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tạo khách hàng');
        } finally {
            setLoadingCustomer(false);
        }
    });


    const getHistoryOrderCustomerById = useCallback(async (id,page = 1, limit = 10, searchTerm = '') => {
        setLoadingCustomer(true);
        setErrorCustomer(null);
        try {
            const response = await customerService.GetHistoryOrderCustomerById(id , page , limit , searchTerm);
            setCustomerHistoryOrder(response.data);
            setTotalHistoryOrder(response.total)
        } catch (err) {
            setErrorCustomer(err.message || 'Lỗi khi tải lịch sử đơn hàng');
        } finally {
            setLoadingCustomer(false);
        }
    });
    return {
        customers,
        customer,
        totalCustomers,
        loadingCustomer,
        errorCustomer,
        getAllCustomers,
        fetchCustomers,
        getCustomerById,
        updateCustomerById,
        createCustomer,
        getHistoryOrderCustomerById,
        customerHistoryOrder,
        totalHistoryOrder,
        getCustomerByPhoneNumber
    };
};

export default useCustomerHook;
