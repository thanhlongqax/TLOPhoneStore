import {Search, EmployeeTable, TableSkeleton} from '../../components/index.jsx';
import { useEmployeeHook } from '../../hook';
import {useEffect, useState} from "react";
function EmployeePage() {

    const {employees , fetchEmployee, totalEmployees , loadingEmployee , errorEmployee} = useEmployeeHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const employeesPerPage = 5;
    const totalPages = Math.ceil(totalEmployees / employeesPerPage);
    useEffect(() => {
        fetchEmployee(currentPage, employeesPerPage , searchTerm);
    }, [currentPage, employeesPerPage,searchTerm]);
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    if (loadingEmployee) return <div><TableSkeleton/></div>;
    if (errorEmployee) return <div>Error: {errorEmployee}</div>;

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 ">
                    <div className="grid grid-cols-2 items-center gap-4 pt-6 px-6">
                        <div>
                            <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                                Quản lý nhân viên
                            </h1>
                        </div>
                        <div className="flex justify-end">
                            <Search onSearch={handleSearch}/>
                        </div>
                    </div>

                </div>

                <div className="col-span-4">
                    <EmployeeTable
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        searchTerm={searchTerm}
                        employees={employees}
                        fetchEmployee={fetchEmployee}
                        employeesPerPage={employeesPerPage}
                    />

                </div>
            </div>
        </>
    )
}

export default EmployeePage;
