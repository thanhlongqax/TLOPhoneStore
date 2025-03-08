import {Header , Footer} from '../components';
import PropTypes from 'prop-types';
const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="flex overflow-hidden flex-col bg-white">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};
DefaultLayout.propTypes = {
  children: PropTypes.node,
};
export default DefaultLayout;
