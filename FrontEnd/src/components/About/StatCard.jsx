import PropTypes from 'prop-types';
function StatCard({ icon, number, description, isHighlighted = false }) {
  const baseClasses = "flex overflow-hidden flex-col justify-center px-12 py-8 rounded min-w-[240px] w-[270px] max-md:px-5";
  const highlightedClasses = "text-white bg-red-500 shadow-sm";
  const normalClasses = "text-black border border-solid border-black border-opacity-30";

  return (
    <div className={`${baseClasses} ${isHighlighted ? highlightedClasses : normalClasses}`}>
      <div className="flex flex-col items-center">
        <img loading="lazy" src={icon} alt="" className="object-contain w-20 aspect-square" />
        <div className="flex flex-col items-center mt-6">
          <div className="text-3xl font-bold tracking-widest leading-none">{number}</div>
          <div className="mt-3 text-base text-center">{description}</div>
        </div>
      </div>
    </div>
  );
}
StatCard.propTypes = {
  icon: PropTypes.string.isRequired,         
  number: PropTypes.oneOfType([              
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  description: PropTypes.string.isRequired,   
  isHighlighted: PropTypes.bool,             
};
export default StatCard;