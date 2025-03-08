import {SideBar} from '../components';
import PropTypes from "prop-types";

function UserPageLayout({children}) {
    return (
        <div className="h-screen flex text-gray-900">
            <SideBar/>
            <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
UserPageLayout.propTypes = {
    children: PropTypes.node,
};
export default UserPageLayout;
