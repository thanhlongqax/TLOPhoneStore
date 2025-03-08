import {Header} from '../../components/index.jsx';
import PropTypes from 'prop-types';

function AdminPageLayout({children}) {
    return (
        <>
            <Header />
            <main className="p-4 sm:ml-64">
                <div className="p-6 py-12 border-2 rounded-lg dark:border-gray-700">
                        {children}
                </div>
            </main>
        </>
    )
}

AdminPageLayout.propTypes = {
    children: PropTypes.node,
};
export default AdminPageLayout;
