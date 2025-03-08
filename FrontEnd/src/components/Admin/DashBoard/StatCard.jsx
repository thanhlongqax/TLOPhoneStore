import PropTypes from 'prop-types';
const StatCard = ({ title, value, icon}) => {
  return (
      <div className="flex flex-col gap-4 p-4 w-full border border-gray-200 shadow-xl rounded-lg hover:bg-gray-50 hover:scale-105 hover:shadow-2xl hover:shadow-gray-400  ">

        <div className="flex justify-between ">
          <h2 className="text-transform: uppercase self-start text-2xl break-normal ">
            {title}
          </h2>
          <img src={icon} alt="" className="object-cover h-16 w-16"/>
        </div>
        <p className=" text-4xl font-bold py-4 text-transform: uppercase self-start break-normal bg-gradient-to-r from-gray-600 to-blue-500 text-transparent bg-clip-text bg-blend-normal">
          {value}
        </p>
      </div>
  );
};
StatCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default StatCard;