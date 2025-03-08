import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

function ErrorPage({ title, message }) {
    const navigate = useNavigate();
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-indigo-600 sm:text-7xl">{title}</h1>
                <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Page
                    not found</h1>
                <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">{message}.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={navigate(-1)}
                       className="rounded-md bg-gradient-to-br from-purple-600 to-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Quay
                        về trang chủ
                    </button>
                    <button
                        onClick={navigate(-1)}
                        className="text-sm font-semibold text-gray-900">Liên hệ để hỗ trợ <span
                        aria-hidden="true">&rarr;</span></button>
                </div>
            </div>
        </main>

    );
}

ErrorPage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default ErrorPage;
